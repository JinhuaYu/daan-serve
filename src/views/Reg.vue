<template>
  <div class="container">
    <div class="bg H5-1">
      <img :src="bgs[0]" alt=""/>
    </div>
    <div class="bg H5-2 pr">
      <img :src="bgs[1]" alt=""/>        
      <div class="loanForm">
        <div class="form-group">
          <span class="icon"><font-awesome-icon icon="user" /></span>                                      
          <input class="form-control" type="text" v-model="form.name" placeholder="姓氏" />                        
        </div>
        <div class="form-group">
          <span class="icon"><font-awesome-icon icon="mobile-alt" /></span>
          <input class="form-control" type="tel" v-model="form.phone" placeholder="手机号码" />
        </div>
        <div v-if="form.phone" class="form-group">
          <span class="icon"><font-awesome-icon icon="envelope"/></span>
          <input class="form-control" type="number" v-model="form.code" placeholder="手机验证码" />
          <div class="input-active">            
            <mu-button color="info" :disabled="this.disabled" @click="getCode()">{{ btnTxt }}</mu-button>
          </div>
        </div>
        <div style="margin-bottom:.425rem">
          <mu-checkbox label="点击即表示同意" v-model="form.isAgree"></mu-checkbox>
          <span class="contract"><router-link :to="{ path: '/protocol' }">《用户服务协议》</router-link></span>
        </div>
        <mu-button large full-width color="primary" class="btn-primary" @click="submit()">测测我的借款额度</mu-button>  
      </div>
    </div>
    <div class="bg H5-3">
      <img :src="bgs[2]" alt="" />
    </div>
    <div class="footer">
      <p>中山大学达安基因（股票代码：002030）控股子公司，值得信赖</p>
      <div class="contant">
        联系方式：<a href="tel:020-83521014">020-83521014</a> <a href="tel:18620852802">18620852802</a> 
      </div>
    </div>    
  </div>
</template>

<script>
import "@/assets/css/main.stylus";
import axios from 'axios';
import qs from 'qs';
import API_CONFIG from '@/utils/api';
// import { request } from '@/utils/request';
import { commonShare } from '@/utils/wxShare';

export default {
  name: "Reg",
  data () {
    return {
      bgs: [
        require("../assets/images/H5_01.jpg"),
        require("../assets/images/H5_02.jpg"),
        require("../assets/images/H5_03n.jpg")
      ],
      form: {
        name: "",
        phone: "",
        code: "",
        isAgree: false
      },
      btnTxt: '获取验证码',
      time: 0, //
      disabled: false,
      reqUrl: window.location.href.split('#')[0],
      share: {
        title: document.title,
        desc: '达安金服',
        link: window.location.href.split('#')[0], // encodeURIComponent()
        imgUrl: require("../assets/images/H5_01.jpg")
      }
    }
  },

  mounted () {
    this.getWxConfig().then(res => {
      commonShare(this, res, this.reqUrl, this.share.title, this.share.desc, this.share.link, this.share.imgUrl);
    })    
  },

  methods: {
    // 提交
    submit() {
      if (this.form.name === "") {
        this.$toast.error("请输入您的姓氏");
      } else if (this.form.phone === "") {
        this.$toast.error("请输入您的手机号码");
      } else if (this.form.code === "") {
        this.$toast.error("请输入手机验证码");
      } else if (!this.form.isAgree) {
        this.$toast.error("请点击同意《用户服务协议》");
      } else {
        let params = qs.stringify({
          userName: this.form.name,
          mobile: this.form.phone,
          validateCode: this.form.code
        });
        axios.post(API_CONFIG.doApply, params).then(res => {
          if (res.data.returnCode === "0000") {
            // 跳转到成功
            this.$router.push("/success");
          } else {
            this.$toast.error(res.data.returnMsg);
          }
        })
      }
    },

    // 获取短信验证码
    getCode () {
      var self = this;
      if(!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.form.phone)){         
        this.$toast.error("手机号格式不正确！");
        return;
      } else {
        this.checkPhone().then(res => {
          console.log('res:', res);
          if (res === '0000') {
            // debugger              
            // 手机号码验证通过
            let params = qs.stringify({
              mobile: self.form.phone
            });
            axios.post(API_CONFIG.getCode, params).then(res => {
              if (res.data.returnCode === "0000") { // 上线改为： 0000
                console.log('getmsg ', res.data)
                self.$toast.success("手机验证码发送成功");
                self.time = 60;
                self.disabled = true;
                self.timer();
              } else {
                self.$toast.error(res.data.returnMsg);
              }          
            }).catch(err => err);
          }
        });        
      }
    },    

    // 验证手机号
    async checkPhone() {
      let result;
      let params = qs.stringify({
        mobile: this.form.phone
      });
      await axios.post(API_CONFIG.checkMobile, params).then(res => {
        console.log('checkphone ', res.data);
        if (res.data.returnCode === "0000") {
          result = res.data.returnCode;
        } else {
          result = res.data.returnCode;
          this.$toast.error(res.data.returnMsg);
        }
      });
      return result;
    },

    // 计时
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btnTxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btnTxt = "获取验证码";
        this.disabled = false;
      }
    },

    // 获取微信接口配置
    async getWxConfig() {
      let result;
      let params = qs.stringify({
        url: this.reqUrl
      });
      await axios.post(API_CONFIG.getWxCongif, params).then(res => {
        if (res.data.returnCode === "0000") {
          result = res.data;
          console.log(result);
        }
      });
      return result;
    }

  }  
};
</script>

<style lang="stylus">
.container
  padding 0
  .mu-info-color,.mu-primary-color
    box-shadow none
  .mu-info-color
    background-color #7cc5f3
    &.disabled
      color rgba(0,0,0,.3)
      cursor not-allowed
      background-color #e6e6e6
  .mu-checkbox-label
    color #bdbdbd

</style>
