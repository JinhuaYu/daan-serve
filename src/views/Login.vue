<template>
<div id="login">
  <mu-container>
    <mu-form ref="form" :model="validateForm" class="mu-demo-form">
      <mu-form-item label="用户名" prop="username" :rules="usernameRules">
        <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
      </mu-form-item>
      <mu-form-item>
        <mu-button color="primary" @click="submit">提交</mu-button>
        <mu-button @click="clear">重置</mu-button>
      </mu-form-item>
    </mu-form>
  </mu-container>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
import API_CONFIG from "@/utils/api";
import axios from 'axios'; // axios
import qs from 'qs';
export default {
  name: "Login",
  data () {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      validateForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations(['updateLoginInfo']),

    submit () {
      let _this = this;
      this.$refs.form.validate().then((result) => {
        // console.log('form valid: ', result)
        if (result) {                
          let params = qs.stringify({
            mobile: this.validateForm.username,
            password: this.validateForm.password
          })
          axios.post(API_CONFIG.login, params).then( res => {
            if (res.data.returnCode === '0000') {
              this.updateLoginInfo(_this.validateForm.username);
              this.$router.push("/list");
            } else {
              this.$toast.error(res.data.returnMsg);
            }
          })
        }
      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: ''
      };
    }
  }
};
</script>

<style lang="stylus">
body
  background #fef6e1
#login {
  width 400px
  margin 100px auto 0
}
</style>
