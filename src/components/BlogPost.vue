<template>
  <div class="blog-post">
    <container v-if="post !== ''">
      <row>
        <div class="col-12">
          <h2>{{ post.title }}</h2>
          <p class="author">Edward Ganuelas</p>
          <p v-if="post.publish_date" class="publishedDate">
            Published on {{ publishedDate(post.publish_date) }}
          </p>
          <div v-html="post.post"></div>
        </div>
      </row>
      <row>
        <div class="col-6"><router-link to="/">Back</router-link></div>
      </row>
    </container>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify';
import client from '@/directus';
import moment from 'moment';
import _ from 'lodash';

export default {
    name: "BlogPost",
    props: ["id"],
    data() {
        return {
            post: "",
            title: "",
            keywords: "",
            description: ""
        };
    },
    methods: {
        async getPost() {
            let response = await client.getItem('blog', this.id);
            this.post = response.data;
            this.updateMetaData();
            // window.setTimeout(() => {
            //     this.updateMetaData();
            //     this.$emit("updateHead");
            // }, 2000);
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
        publishedDate(published_date) {
            return moment(published_date).format('MMM D YYYY');
        },
        updateMetaData() {
            this.title = this.post.title;
            this.keywords = this.getKeyWords();
            this.description = this.post.excerpt;
        },
        getKeyWords() {
            if (!this.savedBlogTags) {
                return [];
            }
            const blogTags = _.cloneDeep(this.savedBlogTags);
            const savedTags = _.cloneDeep(this.savedTags);
            const tagIds = blogTags.filter(blogTag => blogTag.blog_id === parseInt(this.id)).map(blogTag => blogTag.tags_id);
            return savedTags.filter(tag=> _.includes(tagIds, tag.id)).map(tag=> tag.tag).join(',');
        }
    },
    computed: {
        savedBlogTags: sync('BlogTags'),
        savedTags: sync('Tags'), 
    },
    beforeMount() {
        this.getPost();
        this.getBlogTags();
        this.getTags();
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
                { name: "keywords", content: this.keywords }
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
.author {
    text-align: center;
}
</style>
