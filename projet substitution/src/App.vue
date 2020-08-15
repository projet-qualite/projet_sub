<template>
  <div id="app">
  <div>
<ul>
  <li><router-link to="/"><a>Accueil</a></router-link></li>
  <li><router-link to="/afficher"><a>Afficher</a></router-link></li>
  <li><router-link to="/editer"><a>Editer</a></router-link></li>
  <li><router-link to ="/Placement"><a>Gestion des placements</a></router-link></li>
</ul>
  </div>
 <router-view>
 </router-view>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
//import router from "./Route"
//import Amphi_places from "./components/Amphi_places.vue";
Vue.use(VueRouter);
export default {
  name: "App",
 
};
</script>

<style lang="scss">
body {
margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid ;
  background-color:midnightblue;
  height: 45px;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 6px 6px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color:#53c2f5;
}

li a.active {
  color: white;
  background-color: #4CAF50;
}
</style>
