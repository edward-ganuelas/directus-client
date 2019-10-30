<template>
    <div class="col-12">
        <carousel-3d :loop="false" height="400" width="400" :controlsVisible="true" v-if="orderedPosts.length > 0" :count="orderedPosts.length">
            <slide class="col-12" v-for="(post, index) in orderedPosts" v-bind:key="post.id" :index="index">
                <div class="card shadow">
                    <div class="card-body">
                        <h2 class="headline card-title">{{ post.title }}</h2>
                        <p class="author">Edward Ganuelas</p>
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
            </slide>
        </carousel-3d>
    </div>
</template>

<script>
import _ from "lodash";
import { Carousel3d, Slide } from 'vue-carousel-3d';
import moment from 'moment';
import { get } from "vuex-pathify";

export default {
    name: 'BlogPosts',
    components: {
        Carousel3d,
        Slide
    },
    props: ['savedPost', 'savedTags', 'savedBlogTags'],
    methods: {
        getPostTags(postId) {
            if (!this.savedBlogTags) {
                return;
            }
            const blogTags = _.cloneDeep(this.savedBlogTags);
            
            return blogTags.filter(blogTag => blogTag.blog_id === postId);
        },
        convertTagIdToTag(tagId) {
            const tags = _.cloneDeep(this.savedTags);
            if (!tags) {
                return;
            }
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
        filter: get('Filter'),
        orderedPosts() {
            return _.sortBy(this.filteredPosts, x => {
                return new Date(x.published_date);
            }).reverse();
        },
        filteredPosts() {
            if (this.filter === '') {
                return this.savedPost;
            }
            const savedBlogTags = _.cloneDeep(this.savedBlogTags);
            const filteredBlogTags = savedBlogTags.filter(blogTag => blogTag.tags_id === this.filter)
                .map(blogTag => blogTag.blog_id);
            return _.cloneDeep(this.savedPost).filter(post => _.includes(filteredBlogTags, post.id));
            
        }
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
  width: 100%;
  li {
    display: inline-block;
    margin-right: 10px;
    &:first-child {
    }
  }
  &.tags {
    padding: 0;
    font-size: 0.75rem;
  }
}
.card__actions {
  .btn {
    margin-left: 18px;
  }
}
</style>
