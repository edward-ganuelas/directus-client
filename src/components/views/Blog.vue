<template>
  <div class="posts">
    <container>
      <row>
        <div class="col-12">
          <blog-filters :savedTags=savedTags />
        </div>
      </row>
      <row>
        <blog-posts :savedPost=savedPost :savedTags=savedTags :savedBlogTags=savedBlogTags />
      </row>
    </container>
  </div>
</template>

<script>
import _ from "lodash";
import { sync } from "vuex-pathify";
import client from "@/directus";
import BlogFilters from "@/components/BlogFilters";
import BlogPosts from "@/components/BlogPosts";
export default {
    name: "blog",
    components: {
        "blog-filters": BlogFilters,
        "blog-posts": BlogPosts
    },
    methods: {
        async getPosts() {
            if (_.isObject(this.savedPost)) {
                return;
            }
            const response = await client.getItems('blog');
            this.savedPost = response.data;
        },
        async getBlogTags() {
            if (_.isObject(this.savedBlogTags)) {
                return;
            }
            const response = await client.getItems('blog_tags');
            this.savedBlogTags = response.data;
        },
        async getTags() {
            if (_.isObject(this.savedTags)) {
                return;
            }
            const response = await client.getItems('tags');
            this.savedTags = response.data;
        },
    },
    computed: {
        savedPost: sync('BlogPosts'),
        savedBlogTags: sync('BlogTags'),
        savedTags: sync('Tags'), 
    },
    async beforeMount() {
        await this.getPosts();
        await this.getBlogTags();
        await this.getTags();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.posts {
    width: 100%;
    text-align: center;
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
