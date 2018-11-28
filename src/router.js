import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: "/list",
      name: "List",
      component: () => import("./views/List.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!window.initUrl) {
    window.initUrl = location.href.split("#")[0];
  }
  next();
});

// router.beforeEach((to, from, next) => {
//   // ...
//   console.log(to);
//   next();
// });

export default router;
