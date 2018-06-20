<template>
  <div class="filters">
    <h3>Filters</h3>
    <ul>
      <li><v-btn @click="onFilterClick('clear')">Clear</v-btn></li>
      <li v-for="tag in filters" v-bind:id="tag.id" :key="tag.id"><v-btn @click="onFilterClick(tag.tag)" :disabled="tag.tag === filter">{{tag.tag}}</v-btn></li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { API } from "../constants";

export default {
  name: "BlogFilters",
  data() {
    return {
      // data: ""
    };
  },
  methods: {
    getFilters: async function() {
      let response = await axios.get(API.tags);
      // this.data = response.data.data;
      this.filters = response.data.data;
      localStorage.setItem(
        "blog-eightray-filters",
        JSON.stringify(response.data.data)
      );
      // sessionStorage.setItem(API.tags, JSON.stringify(response.data.data));
    },
    onFilterClick: function(filter) {
      // this.$emit('clicked', filter);
      if (filter === "clear") {
        this.filter = "";
      } else {
        this.filter = filter;
      }
    }
  },
  computed: {
    filters: {
      get() {
        return this.$store.getters.getFilters;
      },
      set(value) {
        this.$store.commit("updateFilters", value);
      }
    },
    filter: {
      get() {
        return this.$store.getters.getFilter;
      },
      set(value) {
        this.$store.commit("updateFilter", value);
      }
    }
  },

  beforeMount: function() {
    const filter = localStorage.getItem("blog-eightray-filters");
    const today = Date.now();
    const lastFetch = localStorage.getItem("blog-eightray-last-update");
    const milisecondsToDay = 86400000;
    const daysSinceLastUpdate = today - lastFetch;
    if (!filter) {
      this.getFilters();
    } else {
      if (daysSinceLastUpdate > milisecondsToDay) {
        this.getFilters();
      } else {
        this.filters = JSON.parse(filter);
      }
    }
    // if (sessionStorage.getItem(API.tags) === null) {
    //   this.getFilters();
    // }else{
    //   this.data = JSON.parse(sessionStorage.getItem(API.tags));
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filters {
  padding: 18px;
}
ul {
  list-style-type: none;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
</style>
