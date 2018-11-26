import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MuseUI from "muse-ui"; // Material Design UI 组件库
import "muse-ui/dist/muse-ui.css"; // MuseUI css
import Toast from "muse-ui-toast";
import moment from "moment"; // moment.js 时间格式
// iconfont
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faMobileAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUser, faEnvelope, faMobileAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);
import "./assets/css/base.css";

Vue.config.productionTip = false;
const ToastOption = {
  position: "top", // 弹出的位置
  time: 2000, // 显示的时长
  closeIcon: "close", // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: "check_circle", // 成功信息图标
  infoIcon: "info", // 信息信息图标
  warningIcon: "priority_high", // 提醒信息图标
  errorIcon: "warning" // 错误信息图标
}
Vue.use(MuseUI);
Vue.use(Toast, ToastOption);
moment.locale("zh_cn"); // 设置moment为中文
Vue.filter("fromNow", date => {
  // 添加过滤器 - 时间格式
  // return moment(date).fromNow(); // 这是时间戳转时间
  return moment(date).format("YYYY-MM-DD hh:mm:ss");
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
