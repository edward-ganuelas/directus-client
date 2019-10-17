<template>
    <div class="col-12">
        <transition-group name="fade" leave-active-class="fadeOutRight">
            <div class="col-12" v-for="post in orderedPosts" v-bind:key="post.id">
                <div class="card shadow">
                    <div class="card-body">
                        <h2 class="headline card-title">{{ post.title }}</h2>
                        <author v-bind:author="post.author" v-if="post.author" />
                        <p v-if="post.publish_date">
                            Published on {{ publishedDate(post.publish_date) }}
                        </p>
                        <ul v-if="getPostTags(post.id)" class="tags">
                            <li>Tags:</li>
                            <li v-for="tag in getPostTags(post.id)" :key="tag.id">
                                {{ convertTagIdToTag(tag.tags_id) }}
                            </li>
                        </ul>
                        <blockquote class="card-text">{{ post.excerpt }}</blockquote>
                        <router-link
                            :to="{
                                name: 'Post',
                                params: { title: kebabTitle(post.title) },
                                query: { id: post.id }
                            }">
                            Read More
                        </router-link>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
import Author from "@/components/Author";
import _ from "lodash";
import moment from 'moment';
import { get, sync } from "vuex-pathify";
import client from "@/directus";

export default {
    name: "BlogPosts",
    components: {
        Author
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
        getPostTags(postId) {
            if (!this.savedBlogTags) {
                return [];
            }
            const blogTags = _.cloneDeep(this.savedBlogTags);
            
            return blogTags.filter(blogTag => blogTag.blog_id === postId);
        },
        convertTagIdToTag(tagId) {
            const tags = _.cloneDeep(this.savedTags);
            return tags.find(tag => tag.id === tagId)['tag'];
        },
        publishedDate(published_date) {
            return moment(published_date).format('MMM D YYYY');
        },
        kebabTitle(title) {
            return _.kebabCase(title);
        }
    },
    computed: {
        savedPost: sync('BlogPosts'),
        savedBlogTags: sync('BlogTags'),
        savedTags: sync('Tags'), 
        filter: get('Filter'),
        orderedPosts() {
            return _.sortBy(this.filteredPosts, x => {
                return new Date(x.published_date);
            }).reverse();
        },
        filteredPosts() {
            if (this.filter === "") {
                return this.savedPost;
            }
            const savedBlogTags = _.cloneDeep(this.savedBlogTags);
            const filteredBlogTags = savedBlogTags.filter(blogTag => blogTag.tags_id === this.filter)
                .map(blogTag => blogTag.blog_id);
            return _.cloneDeep(this.savedPost).filter(post => _.includes(filteredBlogTags, post.id));
            
        }
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
  &.tags {
    width: 50%;
    margin: 0 auto 1rem auto;
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
</style>
