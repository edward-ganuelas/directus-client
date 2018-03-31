<template>
  <div id="app">
    <v-app>
      <v-content>
      <v-container grid-list-xs>
        <v-layout row>
          <v-flex xs12>
            <div class="header">
              <h1><router-link :to="{name: 'Home'}">Blog</router-link></h1>
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
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
@import url('https://fonts.googleapis.com/css?family=Lora|Open+Sans');
:root:root:root html, :root:root:root body, :root:root:root body .application{
  font-family: 'Open Sans', sans-serif;
}
h1, h2, h3, h4, h5, h6{
  font-family: 'Lora', serif;
}
:root:root:root h1{
  a{
    color: #000;
    text-decoration: none;
  }
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
