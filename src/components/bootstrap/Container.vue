<template>
  <div :class="[container, classes]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    fluid: Boolean,
    classes: String
  },
  data () {
    return {
    }
  },
  computed: {
    container(){
      return this.fluid ? 'container-fluid': 'container'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
