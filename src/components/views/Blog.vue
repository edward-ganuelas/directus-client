<template>
  <div class="posts">
    <container>
      <row>
        <div class="col-12">
          <blog-filters />
        </div>
      </row>
      <row>
        <blog-posts />
      </row>
    </container>
  </div>
</template>

<script>
import BlogFilters from "@/components/BlogFilters";
import BlogPosts from "@/components/BlogPosts";
export default {
    name: "blog",
    components: {
        "blog-filters": BlogFilters,
        "blog-posts": BlogPosts
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
