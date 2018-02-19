<template>
  <div class="blog-post">
    <v-progress-circular indeterminate v-bind:size="100" v-bind:width="7" color="blue" v-if="post === ''"></v-progress-circular>
      <v-container grid-list-md text-xs-center v-if="post !== ''">
      <v-layout row wrap>
          <v-flex xs12 md8 offset-md2>
            <h2>{{post.title}}</h2>
            <author v-bind:author="post.author" v-if="post.author" />
            <p v-if="post.published_date">Published on {{publishedDate(post.published_date)}}</p>
            <div v-html="post.content"></div>
          </v-flex>
      </v-layout>
       <v-card-text class="fab-wrapper">
        <v-speed-dial

                absolute
                right
                direction="top"
                :hover=false
                transition="slide-y-reverse-transition"
              >
              <v-btn
                slot="activator"
                color="blue darken-2"
                dark
                fab
                hover

              >
              <v-icon>toc</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
              <v-btn dark fab small color="orange" :to="{name: 'Home'}"><v-icon>keyboard_backspace</v-icon></v-btn>
              <v-btn dark fab small color="red" :to="{name: 'EightRay'}"><v-icon>home</v-icon></v-btn>
            </v-speed-dial>
        </v-card-text>
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
      post: "",
      keywords: "",
      title: "",
      keywords: "",
      description: ""
    };
  },
  methods: {
    getPost: function() {
      if (sessionStorage.getItem(API.post + this.id) === null) {
        axios.get(API.post + this.id).then(x => {
          this.post = x.data.data;
          sessionStorage.setItem(API.post + this.id, JSON.stringify(this.post));
          this.updateMetaData();
        });
      } else {
        this.post = JSON.parse(sessionStorage.getItem(API.post + this.id));
        this.updateMetaData();
      }
    },
    publishedDate: function(published_date) {
      let date = new Date(published_date);
      return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    },
    updateMetaData: function(){
      this.title = this.post.title;
      this.keywords = this.getKeyWords();
      this.description = this.post.excerpt;
    },
    getKeyWords: function(){
      let keywords = [];
      this.post.tags.data.forEach(x => {
        keywords.push(x.tag);
      })
      return keywords.join();
    }
  },
  beforeMount: function() {
    this.getPost();
    window.setTimeout(()=>{
      this.$emit('updateHead');
    }, 2000);
  },
  head:{
    title: function(){
      return {
        inner: this.title
      }
    },
    meta: function(){
      return [
        {name: 'description', content: this.description },
        {name: 'keywords', content: this.description },
      ]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.blog-post{
  width: 100%;
}
.progress-circular {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.fab-wrapper{
  height: 100px;
}
.bottom-nav-wrap{
  height: 200px;
   position: absolute;
   bottom: 80px;
   .bottom-nav{
    bottom: 70px;
  }
}

</style>
