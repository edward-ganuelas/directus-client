<template>
  <div class="posts">
    <v-progress-circular indeterminate v-bind:size="100" v-bind:width="7" color="blue" v-if="posts === ''"></v-progress-circular>
    <v-container grid-list-md text-xs-center v-if="posts !== ''">
      <v-layout row wrap>
      <v-flex xs12 md8 offset-md2 v-for="post in orderedPosts" v-bind:key="post.id">
        <v-card hover>
          <v-card-title primary-title>
            <v-flex xs12>
              <h2 class="headline">{{post.title}}</h2>
              <author v-bind:author="post.author" v-if="post.author" />
              <p v-if="post.published_date">Published on {{publishedDate(post.published_date)}}</p>
              <ul v-if="post.tags.data" class="tags">
                <li v-for="tag in post.tags.data" :key="tag.id"><v-chip>{{tag.tag}}</v-chip></li>
              </ul>
            </v-flex>
          </v-card-title>
          <v-card-text>
            <blockquote>{{post.excerpt}}</blockquote>
          </v-card-text>
          <v-card-actions>
            <v-btn flat :to="{name: 'Post', params: {id: post.id}}">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>      
      </v-layout>

        <v-card-text class="fab-wrapper">
            <v-btn
            absolute
            dark
            fab
            bottom=true
            right
            color="red"
            :to="{name: 'EightRay'}" >
        <v-icon>home</v-icon>
          </v-btn>
        </v-card-text>
         
    </v-container>
  </div>
</template>

<script>
import { API } from "../constants";
import axios from "axios";
import Author from "./Author";
import _ from "lodash";
export default {
  name: "blog-posts",
  data() {
    return {
      posts: ""
    };
  },
  components: {
    Author
  },
  methods: {
    getPosts: function() {
      if (sessionStorage.getItem(API.post) === null) {
        axios.get(API.post).then(x => {
          this.posts = x.data.data;
          sessionStorage.setItem(API.post, JSON.stringify(x.data.data));
        });
      } else {
        this.posts = JSON.parse(sessionStorage.getItem(API.post));
      }
    },
    publishedDate: function(published_date) {
      let date = new Date(published_date);
      const months = ["January", "February", "March", "April", "May", "June", "July",
         "August", "September", "October", "November", "December"];
      return date.getDate() + "/" +months[date.getMonth()] + "/" + date.getFullYear();
    }
  },
  computed: {
    orderedPosts: function(){
      return _.sortBy(this.posts, x => {return new Date(x.published_date)}).reverse();
    }
  },
  beforeMount: function() {
    this.getPosts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.posts {
  width: 100%;
}
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 8px;
  li {
    display: inline-block;
    margin-right: 10px;
  }
}
.progress-circular {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
