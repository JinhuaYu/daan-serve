import Vue from "vue";
import Vuex from "vuex";
// import { request } from "@/utils/request";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false, // 是否登录
    username: window.localStorage.user_name || ""
  },
  mutations: {
    updateLoginInfo(state, data) {
      state.username = data;
      window.localStorage.user_name = state.username = data;
      state.isLogin = true;
    },
    loginOut(state) {
      state.username = "";
      window.localStorage.removeItem("user_name");
      state.isLogin = false;
    }
  },
  actions: {}
});
