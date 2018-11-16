import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Reg",
      component: () => import("./views/Reg.vue")
    },
    {
      path: "/success",
      name: "Success",
      component: () => import("./views/Success.vue")
    },
    {
      path: "/protocol",
      name: "Protocol",
      component: () => import("./views/Protocol.vue")
    }
  ]
});
