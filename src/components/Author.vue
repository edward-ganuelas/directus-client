<template>
    <p class="author">{{name}}</p>
</template>

<script>
// import axios from "axios";
import { client } from "../constants";
import RemoteInstance from "directus-sdk-javascript/remote";
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
      let response = await client.getUsers(this.author);
      this.name =
        response.data[0].first_name + " " + response.data[0].last_name;
      localStorage.setItem(`eightray_author_${this.author}`, this.name);
    }
  },
  beforeMount: function() {
    if (localStorage.getItem(`eightray_author_${this.author}`) === null) {
      this.getAuthor();
    } else {
      this.name = localStorage.getItem(`eightray_author_${this.author}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
