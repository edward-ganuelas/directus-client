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
import mixin from '@/mixins/mixin';
import moment from 'moment';
import client from "@/directus";
import _ from 'lodash';

export default {
    name: 'BlogPost',
    props: ['id'],
    mixins: [mixin],
    data() {
        return {
            post: '',
            title: '',
            keywords: '',
            description: ''
        };
    },
    methods: {
        async getPost() {
            const response = await client.getItem('blog', this.id);
            this.post = response.data;
            this.updateMetaData();
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
    beforeMount() {
        this.getPost();
        this.getBlogTags();
        this.getTags();
        this.$ga.page({
            page: '/post',
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
                { name: 'description', content: this.description },
                { name: 'keywords', content: this.keywords }
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
