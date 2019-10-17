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
            <div class="col" v-for="tag in savedTags" v-bind:id="tag.id" :key="tag.id">
                <button
                    type="button"
                    class="btn btn-secondary"
                    @click="onFilterClick(tag.tag, tag.id)"
                    :disabled="tag.id === filter">
                    {{ tag.tag }}
                </button>
            </div>
        </row>
  </container>
</template>

<script>
import { sync } from 'vuex-pathify';

export default {
    name: 'BlogFilters',
    props: ['savedTags'],
    methods: {
        onFilterClick(filter, tagId) {
            if (filter === "clear") {
                this.filter = "";
            } else {
                this.filter = tagId;
            }
            this.$ga.event({
                eventCategory: `Filter ${filter}`,
                eventAction: "click"
            });
        }
    },
    computed: {
        filter: sync("Filter")
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
