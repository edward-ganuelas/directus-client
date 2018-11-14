<template>
  <div id="app">
    <container :fluid="true">
      <row>
        <div class="col-12">
          <div class="header">
            <h1><router-link :to="{name: 'Home'}">Blog</router-link></h1>
            <p>By EightRayedSun</p>
          </div>
        </div>
      </row>
    </container>
    <container>
      <row>
        <transition name="slideLeft" leave-active-class="dissapear">
          <router-view></router-view>
        </transition>
      </row>
      <row>
        <div class="col-12 footer">
          <p class=""><a href="https://eightrayedsun.com">EightRayedSun</a></p>
        </div>
      </row>
    </container>
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
@import "./node_modules/bootstrap/scss/bootstrap-reboot.scss";
@import "./node_modules/bootstrap/scss/bootstrap-grid.scss";
@import "./node_modules/bootstrap/scss/_buttons.scss";
@import "./node_modules/bootstrap/scss/_card.scss";
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
.dissapear{
  display: none;
}
.card{
  padding: 25px 0;
}
.footer{
  p{
    text-align: center;
  }
}
</style>
