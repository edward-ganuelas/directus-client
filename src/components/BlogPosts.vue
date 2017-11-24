<template>
  <div class="posts">
    <div v-for="post in posts" v-bind:key="post.id">
      <ul>
        <li v-for="tag in post.tags.data" :key="tag.id">{{tag.tag}}</li>
      </ul>
      <h2><router-link to="/post">{{post.title}}</router-link></h2>
      <div v-html="post.postbody"></div>
    </div>
  </div>
</template>

<script>
import { API } from "../constants";
import axios from 'axios';
export default {
  name: "blog-posts",
  data() {
    return {
      posts: ''
    };
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  display: flex;
  flex-wrap: nowrap;
}
li {
  display: inline-block;
  margin-right: 10px;
}
</style>
