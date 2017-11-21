<template>
  <div class="posts">
    <div v-for="post in posts" v-bind:key="post.id">
      <ul>
        <li v-for="tag in post.tags.data" :key="tag.id">{{tag.tag}}</li>
      </ul>
      <h2>{{post.postheader}}</h2>
      <div v-html="post.postbody"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog-posts",
  props: ["posts"],
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul{
    display: flex;
    flex-wrap: nowrap;
  }
  li{
    display: inline-block;
    margin-right: 10px;
  }
</style>
