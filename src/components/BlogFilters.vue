<template>
  <div class="filters">
    <h3>Filters</h3>
    <ul>
      <li><v-btn @click="onFilterClick('clear')">Clear</v-btn></li>
      <li v-for="tag in data" v-bind:id="tag.id" :key="tag.id"><v-btn @click="onFilterClick(tag.tag)">{{tag.tag}}</v-btn></li>
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
    getFilters : async function(){
      let response = await axios.get(API.tags);
      this.data = response.data.data;
      sessionStorage.setItem(API.tags, JSON.stringify(response.data.data));
    },
    onFilterClick: function(filter){
      this.$emit('clicked', filter);
    }
  },
  beforeMount: function(){
    if (sessionStorage.getItem(API.tags) === null) {
      this.getFilters();
    }else{
      this.data = JSON.parse(sessionStorage.getItem(API.tags));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filters{
  padding: 18px;
}
  ul{
    list-style-type: none;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
  }
</style>
