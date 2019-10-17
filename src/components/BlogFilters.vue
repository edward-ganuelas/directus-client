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
                    @click="onFilterClick(tag.tag, tag.is)"
                    :disabled="tag.tag === filter">
                    {{ tag.tag }}
                </button>
            </div>
        </row>
  </container>
</template>

<script>
import _ from 'lodash';
import { sync } from 'vuex-pathify';
import client from '@/directus';

export default {
    name: 'BlogFilters',
    methods: {
        async getTags() {
            if (_.isObject(this.savedTags)) {
                return;
            }
            const response = await client.getItems('tags');
            this.savedTags = response.data;
        },
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
        savedTags: sync("Tags"),
        filter: sync("Filter")
    },

    beforeMount() {
        this.getTags();
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
