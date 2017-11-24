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
    getAuthor: function() {
      if (sessionStorage.getItem(API.user + this.author) === null) {
        axios.get(API.user + this.author).then(x => {
          this.name = x.data.data.first_name + " " + x.data.data.last_name;
          sessionStorage.setItem(API.user + this.author, this.name);
        });
      }else{
        this.name = sessionStorage.getItem(API.user + this.author);
      }
    }
  },
  beforeMount: function() {
    this.getAuthor();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
