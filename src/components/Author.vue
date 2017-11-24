<template>
  <div class="author">
    <p>{{name}}</p>
  </div>
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
      axios.get(API.user + this.author).then(x => {
        this.name = x.data.data.first_name + " " + x.data.data.last_name;
      });
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
