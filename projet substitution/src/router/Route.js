/* eslint-disable */
import Vue from "vue"
import VueRouter from "vue-router"
import Placement from "../components/Amphi_places"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Edition from "../components/EditionAmphi.vue"
import Afficher from "../components/AfficherAmphi.vue"


Vue.use(VueRouter);
export const router =new VueRouter({
    mode:'history',
    routes : 
    [
        {
            path : "/Placement",
            component : Placement
        },{
            path: '/',
            name: 'Home',
            component: Home
          },
          {
            path: '/about',
            name: 'About',
            component: About
          },
        
          {
            path: '/editer',
            name: 'EditionAmphi',
            component: Edition
          },
        
          {
            path: '/afficher',
            name: 'AfficherAmphi',
            component: Afficher
          }
    ]
})