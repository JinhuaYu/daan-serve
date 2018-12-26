<template>
  <div id="userBar">
    欢迎 {{ username }}
    <mu-button flat color="primary" @click="logOut">退出</mu-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: "userBar",
  computed: {
    ...mapState(['isLogin', 'username'])
  },
  methods: {
    ...mapMutations(['loginOut']),
    logOut () {
      this.loginOut();
      this.$router.push("/login");
    }
  }
}
</script>

<style lang="stylus">
#userBar{
  border-bottom 1px solid #ddd
}
</style>

