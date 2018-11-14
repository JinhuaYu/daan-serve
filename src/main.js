import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MuseUI from 'muse-ui' // Material Design UI 组件库
import 'muse-ui/dist/muse-ui.css' // MuseUI css
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faMobileAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./assets/css/base.css";

Vue.config.productionTip = false;

library.add(faUser, faEnvelope, faMobileAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(MuseUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
