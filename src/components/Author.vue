<template>
    <p class="author">{{name}}</p>
</template>

<script>
import axios from "axios";
import { API } from "../constants";
export default {
  name: "Author",
  props: ["author"],
  data() {
    return {
      name: ""
    };
  },
  methods: {
    getAuthor: async function() {
      let response = await axios.get(API.user + this.author);
      this.name = response.data.data.first_name + " " + response.data.data.last_name;
      sessionStorage.setItem(API.user + this.author, this.name);
    }
  },
  beforeMount: function() {
    if (sessionStorage.getItem(API.user + this.author) === null) {
      this.getAuthor();
    }else{
      this.name = sessionStorage.getItem(API.user + this.author);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
