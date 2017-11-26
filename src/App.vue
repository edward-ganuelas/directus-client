<template>
  <div id="app">
    <v-app>
      <main>
        <router-view></router-view>
      </main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss">
:root:root:root html, :root:root:root body, .application{
  font-family: 'Montserrat', sans-serif;
}

</style>
