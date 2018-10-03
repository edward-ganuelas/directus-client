<template>
  <div :class="['row', classes]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Row',
  props: {
    classes: String
  },
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
