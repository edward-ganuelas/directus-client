<template>
  <div class="posts">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
      <v-flex xs12 v-for="post in posts" v-bind:key="post.id">
        <ul>
          <li v-for="tag in post.tags.data" :key="tag.id">{{tag.tag}}</li>
        </ul>
        <h2>{{post.title}}</h2>
        <p>{{post.excerpt}}</p>
        <p><router-link :to="{name: 'Post', params: {id: post.id}}">Read More</router-link>
        <div v-html="post.postbody"></div>
      </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { API } from "../constants";
import axios from "axios";
export default {
  name: "blog-posts",
  data() {
    return {
      posts: ""
    };
  },
  methods: {
    getPosts: function() {
      if (sessionStorage.getItem(API.post) === null) {
        axios.get(API.post).then(x => {
          this.posts = x.data.data;
          sessionStorage.setItem(API.post, JSON.stringify(x.data.data));
        });
      }else{
        this.posts = JSON.parse(sessionStorage.getItem(API.post));
      }
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
  flex-wrap: nowrap;
  li {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
