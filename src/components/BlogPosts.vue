<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-7 col-md-12">
            <blog-filters />
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-7">
      <transition-group name="fade" leave-active-class="fadeOutRight">
        <div class="col-12" v-for="post in orderedPosts" v-bind:key="post.id">
           <div class="card shadow">
             <div class="card-body">
             <h2 class="headline card-title">{{post.title}}</h2>
             <author v-bind:author="post.author" v-if="post.author" />
               <p v-if="post.published_date">Published on {{publishedDate(post.published_date)}}</p>
               <ul v-if="post.tags.data" class="tags">
                  <li>Tags:</li>
                  <li v-for="tag in post['tags'].data" :key="tag.id">{{tag.tag}}</li>
                </ul>
                <blockquote class="card-text">{{post.excerpt}}</blockquote>
                <router-link :to="{name: 'Post', params: {title: kebabTitle(post.title)}, query: {id: post.id}}">Read More</router-link>
                </div>
           </div>
        </div>
      </transition-group>

    </div>
    
  </div>
</template>

<script>
import { API } from "../constants";
import BlogFilters from "./BlogFilters";
import Author from "./Author";
import _ from "lodash";
import { get, sync } from "vuex-pathify";
import axios from 'axios';
export default {
  name: "blog-posts",
  data() {
    return {};
  },
  components: {
    Author,
    BlogFilters
  },
  methods: {
    getPosts: async function() {
      const response = await axios.get(API.post);
      this.savedPost = response.data.data;
      localStorage.setItem("blog-eightray", JSON.stringify(response.data.data));
      localStorage.setItem("blog-eightray-last-update", Date.now());
    },
    publishedDate: function(published_date) {
      let date = new Date(published_date);
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return (
        date.getDate() +
        "/" +
        months[date.getMonth()] +
        "/" +
        date.getFullYear()
      );
    },
    filterClicked: function(data) {
      this.filter = data;
    },
    resetPosts: function() {
      this.posts = this.originalPosts.slice();
    },
    kebabTitle(title) {
      return _.kebabCase(title);
    }
  },
  computed: {
    orderedPosts: function() {
      return _.sortBy(this.filteredPosts, x => {
        return new Date(x.published_date);
      }).reverse();
    },
    savedPost: sync("BlogPosts"),
    filter: get("Filter"),
    filteredPosts() {
      if (this.filter === "") {
        return this.savedPost;
      }
      let filteredPosts = this.savedPost;
      // filteredPosts = 'test';
      filteredPosts = filteredPosts.filter(x => {
        let filterCheck = false;
        x.tags.data.forEach(element => {
          if (element.tag === this.filter) {
            filterCheck = true;
          }
        });
        return filterCheck;
      });

      return filteredPosts;
    }
  },
  watch: {
    filtereas: function(value) {
      this.resetPosts();
      let filteredPosts = this.savedPost;
      if (value !== "clear") {
        filteredPosts = filteredPosts.filter(x => {
          let filterCheck = false;
          x.tags.data.forEach(element => {
            if (element.tag === value) {
              filterCheck = true;
            }
          });
          return filterCheck;
        });
      }
      this.posts = filteredPosts;
    }
  },
  beforeMount: function() {
    const posts = localStorage.getItem("blog-eightray");
    const today = Date.now();
    const lastFetch = localStorage.getItem("blog-eightray-last-update");
    const milisecondsToDay = 86400000;
    const daysSinceLastUpdate = today - lastFetch;
    if (!posts) {
      this.getPosts();
    } else {
      if (daysSinceLastUpdate > milisecondsToDay) {
        this.getPosts();
      } else {
        this.savedPost = JSON.parse(posts);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.posts {
  width: 100%;
}
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 8px;
  width: 100%;
  li {
    display: inline-block;
    margin-right: 10px;
    &:first-child {
      margin-left: 18px;
    }
  }
}
.card__actions {
  .btn {
    margin-left: 18px;
  }
}
.card {
  margin-bottom: 18px;
}
.progress-circular {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
