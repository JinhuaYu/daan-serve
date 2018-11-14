import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MuseUI from "muse-ui"; // Material Design UI 组件库
import "muse-ui/dist/muse-ui.css"; // MuseUI css
import Toast from "muse-ui-toast";

// iconfont
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faMobileAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUser, faEnvelope, faMobileAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import "./assets/css/base.css";

Vue.config.productionTip = false;


Vue.use(MuseUI);
const ToastOption = {
  position: "top", // 弹出的位置
  time: 1000, // 显示的时长
  closeIcon: "close", // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: "check_circle", // 成功信息图标
  infoIcon: "info", // 信息信息图标
  warningIcon: "priority_high", // 提醒信息图标
  errorIcon: "warning" // 错误信息图标
}
Vue.use(Toast, ToastOption);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
