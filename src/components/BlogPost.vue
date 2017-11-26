<template>
  <div class="blog-post">
    <v-progress-circular indeterminate v-bind:size="100" v-bind:width="7" color="blue" v-if="post === ''"></v-progress-circular>
      <v-container grid-list-md text-xs-center v-if="post !== ''">
       <v-layout>
          <v-flex>
              <v-card-text style="height: 300px;" class="grey lighten-5"></v-card-text>
              <v-card-text style="height: 100px; position: relative">
                <v-btn absolute dark fab top right color="red" :to="{name: 'Home'}"><v-icon>home</v-icon></v-btn>
              </v-card-text>
          </v-flex>
      </v-layout>
      <v-layout row wrap>
          <v-flex xs12>
            <h2>{{post.title}}</h2>
            <author v-bind:author="post.author" v-if="post.author" />
            <p v-if="post.published_date">Published on {{publishedDate(post.published_date)}}</p>
            <div v-html="post.content"></div>
          </v-flex>
      </v-layout>
      </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { API } from "../constants";
import Author from "./Author";
export default {
  name: "BlogPost",
  props: ["id"],
  components: {
    Author
  },
  data() {
    return {
      post: ""
    };
  },
  methods: {
    getPost: function() {
      if (sessionStorage.getItem(API.post + this.id) === null) {
        axios.get(API.post + this.id).then(x => {
          this.post = x.data.data;
          sessionStorage.setItem(API.post + this.id, JSON.stringify(this.post));
        });
      } else {
        this.post = JSON.parse(sessionStorage.getItem(API.post + this.id));
      }
    },
    publishedDate: function(published_date) {
      let date = new Date(published_date);
      return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }
  },
  beforeMount: function() {
    this.getPost();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progress-circular {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
