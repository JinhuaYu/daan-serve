import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Reg",
      component: () => import("./views/Reg.vue"),
      beforeRouteEnter(to, from, next) {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS && to.path !== location.pathname) {
          location.assign(to.fullPath); // 此处不可使用location.replace
        } else {
          next();
        }
      }
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
      meta: {
        requireAuth: true // 用于判断该路由的访问是否需要登录
      },
      component: () => import("./views/List.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/Login.vue")
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   // ...
//   alert(to.fullPath);
//   next();
// });

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.username) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

// router.afterEach((to, from, next) => {
//   // ...
//   alert(to.fullPath);
//   next();
// });

export default router;
