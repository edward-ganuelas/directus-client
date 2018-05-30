<template>
  <div class="posts">
    <v-progress-circular indeterminate v-bind:size="100" v-bind:width="7" color="blue" v-if="this.savedPost === ''"></v-progress-circular>
    <v-container grid-list-md text-xs-center v-if="this.savedPost !== ''">
      <v-layout row wrap>
      <v-flex xs-12 sm4 lg2 offset-lg1>
        <v-card hover>
          <blog-filters @clicked="filterClicked" />
        </v-card>
      </v-flex>
      <v-flex xs12 sm8 lg8>
      <transition-group name="fade" leave-active-class="fadeOutRight">
        <v-flex xs12 v-for="post in orderedPosts" v-bind:key="post.id">
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
      </transition-group>   
      </v-flex>
      </v-layout>

        <v-card-text class="fab-wrapper">
            <v-btn
            absolute
            dark
            fab
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
import BlogFilters from "./BlogFilters";
import Author from "./Author";
import _ from "lodash";
export default {
  name: "blog-posts",
  data() {
    return {
      posts: "",
      originalPosts: "",
      filter: ""
    };
  },
  components: {
    Author,
    BlogFilters
  },
  methods: {
    getPosts: async function() {
      let response = await axios.get(API.post);
      // console.log(response)
      // let posts = response.data.data;
      // this.originalPosts = this.posts.slice();
      // sessionStorage.setItem(API.post, JSON.stringify(response.data.data));
      // this.$store.commit('updateBlogPosts', JSON.stringify(response.data.data));
      this.savedPost = response.data.data
    },
    publishedDate: function(published_date) {
      let date = new Date(published_date);
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return (
        date.getDate() +
        "/" +
        months[date.getMonth()] +
        "/" +
        date.getFullYear()
      );
    },
    filterClicked: function(data) {
      this.filter = data;
    },
    resetPosts: function() {
      this.posts = this.originalPosts.slice();
    }
  },
  computed: {
    orderedPosts: function() {
      return _.sortBy(this.savedPost, x => {
        return new Date(x.published_date);
      }).reverse();
    },
    savedPost: {
      get: function(){
        return this.$store.getters.getBlogPosts
      },
      set: function(value){
        this.$store.commit('updateBlogPosts', value)
      }
    }
  },
  watch: {
    filter: function(value) {
      this.resetPosts();
      let filteredPosts = this.savedPost;
      if (value !== "clear") {
        filteredPosts = filteredPosts.filter(x => {
          let filterCheck = false;
          x.tags.data.forEach(element => {
            if (element.tag === value) {
              filterCheck = true;
            }
          });
          return filterCheck;
        });
      }
      this.posts = filteredPosts;
    }
  },
  beforeMount: function() {
    // if (sessionStorage.getItem(API.post) === null) {
    //   this.getPosts();
    // } else {
    //   // this.posts = JSON.parse(sessionStorage.getItem(API.post));
    //   this.originalPosts = this.posts.slice();
    //   this.savedPost = this.posts.slice();
    // }

    // this.getPosts();
    if(this.savedPost === ''){
      this.getPosts();
    }else{

    }
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
  width: 100%;
  li {
    display: inline-block;
    margin-right: 10px;
    &:first-child {
      margin-left: 18px;
    }
  }
}
.card__actions {
  .btn {
    margin-left: 18px;
  }
}
.card {
  margin-bottom: 18px;
}
.progress-circular {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
