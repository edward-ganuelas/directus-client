<template>
    <container classes="filters">
        <row>
            <div class="col-12">
                <p>Filters</p>
            </div>
        </row>
        <row>
            <div class="col">
                <button
                    type="button"
                    class="btn btn-secondary"
                    @click="onFilterClick('clear')">
                        Clear
                </button>
            </div>
            <div class="col" v-for="tag in filters" v-bind:id="tag.id" :key="tag.id">
                <button
                    type="button"
                    class="btn btn-secondary"
                    @click="onFilterClick(tag.tag)"
                    :disabled="tag.tag === filter">
                    {{ tag.tag }}
                </button>
            </div>
        </row>
  </container>
</template>

<script>
import { API } from "../constants";
import { sync } from "vuex-pathify";
import axios from "axios";

export default {
    name: "BlogFilters",
    methods: {
        async getFilters() {
            const response = await axios.get(API.tags);
            this.filters = response.data.data;
            localStorage.setItem(
                "blog-eightray-filters",
                JSON.stringify(response.data.data)
            );
        },
        onFilterClick(filter) {
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

    beforeMount() {
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
  background-color: #0066ff;
  p {
    text-align: left;
    font-weight: bold;
  }
}
// ul {
//   list-style-type: none;
//   text-align: left;
//   display: flex;
//   flex-wrap: wrap;
// }
.btn {
  border-radius: 0;
  margin-bottom: 1rem;
  width: 100%;
}
</style>
