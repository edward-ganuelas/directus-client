<template>
  <div id="app">
    <blog-posts v-bind:posts="posts"></blog-posts>
  </div>
</template>

<script>
import axios from "axios";
import BlogPosts from "./components/BlogPosts";
import { API } from "./constants";
export default {
  name: "app",
  data() {
    return {
      posts: ""
    }
  },
  components: {
    BlogPosts
  },
  methods: {
    getPosts: function() {
      axios.get(API.post).then(x => {
        this.posts = x.data.data;
      });
    }
  },
  beforeMount: function() {
    this.getPosts();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
