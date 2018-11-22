import Vue from "vue";
import axios from "axios";
import qs from "qs";

Vue.prototype.$http = axios;

process.env.NODE_ENV === "development"
  ? axios.defaults.baseURL = "http://192.168.211.226:5324"
  : axios.defaults.baseURL = "http://192.168.211.236:5324/daan-service";

const ajaxURL = {
  getCode: "/getValidateCode",
  checkMobile: "/validateMobile",
  doApply: "/osUserReg"
};

export var request = async (type = "POST", url = "", data = {}) => {
  let result;
  type = type.toUpperCase();
  url = ajaxURL[url];
  if (type === "GET") {
    await axios.get(url, { params: data })
      .then(res => {
        result = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  } else if (type === "POST") {
    await axios.post(url, qs.stringify(data))
      .then(res => {
        result = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
  return result;
};
