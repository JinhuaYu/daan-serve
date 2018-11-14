<template>
  <div class="container">
    <div class="bg H5-1">
      <img :src="H5_part_1" alt="">
    </div>
    <div class="bg H5-2 pr">
      <img :src="H5_part_2" alt="">        
      <div class="loanForm">
        <div class="form-group">
          <span class="icon"><font-awesome-icon icon="user" /></span>                                      
          <input class="form-control" type="text" id="name" placeholder="姓名" />                        
        </div>
        <div class="form-group">
          <span class="icon"><font-awesome-icon icon="mobile-alt" /></span>
          <input class="form-control" type="tel" id="phone" placeholder="手机号码" />
        </div>
        <div class="form-group">
          <span class="icon"><font-awesome-icon icon="envelope"/></span>
          <input class="form-control" type="number" id="code" placeholder="手机验证码" />
          <div class="input-active">
            <button class="btn btn-info" type="button">获取验证码</button>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" @click="submit()">测测我的借款额度</button>
        </div>
        <div class="contract">点击即表示同意 <a href="javascript:;">《用户服务协议》</a></div>
      </div>    
    </div>
    <div class="bg H5-3">
      <img :src="H5_part_3" alt="">
    </div>
    <div class="footer">
      <p>中山大学达安基因（股票代码：002030）<br/>控股子公司，值得信赖</p>
      <div class="contant">
        联系方式：<a href="tel:020-83224967">020-83224967</a> <a href="tel:13312872661">13312872661</a> 
      </div>
    </div>    
  </div>
</template>

<script>
import "../assets/css/main.stylus";
import H5_part_1 from "../assets/images/H5_01.jpg";
import H5_part_2 from "../assets/images/H5_02.jpg";
import H5_part_3 from "../assets/images/H5_03.jpg";

export default {
  name: 'Reg',
  data () {
    return {
      H5_part_1: H5_part_1,
      H5_part_2: H5_part_2,
      H5_part_3: H5_part_3
    }
  },
  methods: {
    getPhoneCode () {
      
    },

    submit () {
      var name = document.getElementById('name');
      var phone = document.getElementById('phone');
      var code = document.getElementById('code');      
      if(name.value === ''){
        //Toast.warning('hello world');
        this.$toast({
        message: '提示语句',
        position: 'middle',
        duration: 5000
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.container
  padding 0
</style>



