<template>
  <div id="app">
    <v-app>
      <v-content>
      <v-container grid-list-xs>
        <v-layout row>
          <v-flex xs12>
            <div class="header">
              <h1>Blog</h1>
              <p>By EightRayedSun</p>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
      <main>
        <router-view></router-view>
      </main>
      </v-content>
      <v-footer>
          <v-container>
            <v-spacer></v-spacer>
            <div><p class="text-xs-center"><a href="https://eightrayedsun.com">EightRayedSun</a></p></div>
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
.header{
  padding: 16px;
  text-align: center;
  @media(min-width: 768px){
    text-align: left;
  }
}
.fab-wrapper{
  position: relative;
  @media(min-width: 768px){
      height: 100px; 
  }
}

</style>
