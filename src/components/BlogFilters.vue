<template>
  <div class="filters">
    <h3>Filters</h3>
    <ul>
      <li v-for="tag in data" v-bind:id="tag.id">{{tag.tag}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { API } from "../constants";

export default {
  name: 'BlogFilters',
  data () {
    return {
      data: ""
    }
  },
  methods: {
    getPosts : async function(){
      let response = await axios.get(API.tags);
      this.data = response.data.data;
      sessionStorage.setItem(API.tags, JSON.stringify(response.data.data));
    }
  },
  beforeMount: function(){
    if (sessionStorage.getItem(API.tags) === null) {
      this.getPosts();
    }else{
      this.data = JSON.parse(sessionStorage.getItem(API.tags));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul{
    list-style-type: none;
  }
</style>
