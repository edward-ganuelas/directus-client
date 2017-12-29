<template>
  <div id="app">
    <v-app>
      <main>
        <router-view></router-view>
      </main>
      <v-footer>
          <v-container>
            <v-spacer></v-spacer>
            <div><p class="text-xs-center"><a href="https://eightrayesun.com">EightRayedSun</a></p></div>
          </v-container>
        </v-footer>
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
  font-family: 'Lora', serif;
}

</style>
