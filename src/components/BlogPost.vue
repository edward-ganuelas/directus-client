<template>
  <div class="blog-post">
      <h2>{{post.title}}</h2>
      <div v-html="post.content"></div>
  </div>
</template>

<script>
import axios from "axios";
import { API } from "../constants";
export default {
  name: "BlogPost",
  props: ["id"],
  data() {
    return {
      post: ""
    };
  },
  methods: {
    getPost: function() {
        axios.get(API.post + this.id).then(x=>{
            this.post = x.data.data;
        })
    }
  },
  beforeMount: function(){
      this.getPost();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
