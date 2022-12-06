
import routes from "./router";
import Vue from 'vue'
import VueRouter from 'vue-router'
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.use(VueRouter)
export default router;
