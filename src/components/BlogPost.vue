<template>
  <div class="blog-post">
    <container v-if="post !== ''">
      <row>
        <div class="col-12">
          <h2>{{ post.title }}</h2>
          <author v-bind:author="post.author" v-if="post.author" />
          <p v-if="post.published_date" class="publishedDate">
            Published on {{ publishedDate(post.published_date) }}
          </p>
          <div v-html="post.content"></div>
        </div>
      </row>
      <row>
        <div class="col-6"><router-link to="/">Back</router-link></div>
      </row>
    </container>
  </div>
</template>

<script>
// import axios from "axios";
import { API } from "@/constants";
import Author from "@/components/Author";
import axios from "axios";

export default {
    name: "BlogPost",
    props: ["id"],
    components: {
        Author
    },
    data() {
        return {
            post: "",
            keywords: "",
            title: "",
            description: ""
        };
    },
    methods: {
        async getPost() {
            let response = await axios.get(`${API.post}${this.id}`);
            this.post = response.data.data;
            localStorage.setItem(API.post + this.id, JSON.stringify(this.post));
            window.setTimeout(() => {
                this.updateMetaData();
                this.$emit("updateHead");
            }, 2000);
        },
        publishedDate(published_date) {
            let date = new Date(published_date);
            return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        },
        updateMetaData() {
            this.title = this.post.title;
            this.keywords = this.getKeyWords();
            this.description = this.post.excerpt;
        },
        getKeyWords() {
            let keywords = [];
            this.post.tags.data.forEach(x => {
                keywords.push(x.tag);
            });
            return keywords.join();
        }
    },
    beforeMount() {
        if (localStorage.getItem(API.post + this.id) === null) {
            this.getPost();
        } else {
            this.post = JSON.parse(localStorage.getItem(API.post + this.id));
            this.updateMetaData();
        }
        this.$ga.page({
            page: "/post",
            title: this.post.title,
            location: window.location.href
        });
    },
    head: {
        title() {
            return {
                inner: this.title
            };
        },
        meta() {
            return [
                { name: "description", content: this.description },
                { name: "keywords", content: this.description }
            ];
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.blog-post {
  width: 100%;
  h2 {
    text-align: center;
  }
  .publishedDate {
    text-align: center;
  }
}
</style>
