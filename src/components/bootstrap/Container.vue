<template functional>
  <div :class="[{'container-fluid': props.fluid, 'container': !props.fluid}, props.classes]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    fluid: Boolean,
    classes: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
