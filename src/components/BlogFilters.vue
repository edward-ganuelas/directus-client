<template>
  <div class="filters container">
    <div class="row">
      <div class="col-12">
        <p>Filters</p>
      </div>
      <button type="button" class="btn btn-secondary col" @click="onFilterClick('clear')">Clear</button>
      <button type="button" class="btn btn-secondary col" v-for="tag in filters" v-bind:id="tag.id" :key="tag.id" @click="onFilterClick(tag.tag)" :disabled="tag.tag === filter">{{tag.tag}}</button>
    </div>
  </div>
</template>

<script>
import { API } from "../constants";
import { get, sync } from "vuex-pathify";
import axios from 'axios';

export default {
  name: "BlogFilters",
  data() {
    return {
      // data: ""
    };
  },
  methods: {
    getFilters: async function() {

      const response = await axios.get(API.tags);
      this.filters = response.data.data;
      localStorage.setItem(
        "blog-eightray-filters",
        JSON.stringify(response.data.data)
      );
    },
    onFilterClick: function(filter) {
      if (filter === "clear") {
        this.filter = "";
      } else {
        this.filter = filter;
      }
      this.$ga.event({
        eventCategory: `Filter ${filter}`,
        eventAction: "click"
      });
    }
  },
  computed: {
    filters: sync("Filters"),
    filter: sync("Filter")
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
