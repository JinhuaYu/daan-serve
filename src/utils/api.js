let baseURL = "";

process.env.NODE_ENV === "development"
  ? baseURL = "http://192.168.211.226:5324"
  : baseURL = "http://ygjffax.cn:5324/daan-service";

const API_CONFIG = {
  getCode: baseURL + "/getValidateCode",
  doApply: baseURL + "/osUserReg",
  checkMobile: baseURL + "/validateMobile",
  getUsetList: baseURL + "/queryOSUserInfo",
  downloadFile: baseURL + "/downloadUserInfo",
  getWxCongif: baseURL + "/getWXInfo"
};

export default API_CONFIG;
