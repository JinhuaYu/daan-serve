import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "reg",
      component: () => import("./views/Reg.vue")
    },
    {
      path: "/success",
      name: "success",
      component: () => import("./views/Success.vue")
    }
  ]
});
