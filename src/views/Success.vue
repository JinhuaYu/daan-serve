<template>
  <div class="container">
    <div class="success">
      <mu-icon value="check_circle"></mu-icon>
      <!-- <font-awesome-icon :icon="['far', 'check-circle']"></font-awesome-icon> -->
      <h1>提交成功</h1>
      <h4>感谢您的注册，我们会有专人与您联系！</h4>
    </div>
  </div>  
</template>

<script>
export default {
  name: "Success"
}
</script>

<style lang="stylus">
body
  background #fef6e1
  .success
    padding 3rem 0 0
    color #73b746
    text-align center
    .mu-icon,.fa-check-circle
      font-size 5rem
    h1
      font-size 2rem
      font-weight normal
      margin-bottom 2rem
    h4
      font-size 1rem
      font-weight normal
      color #aaa
</style>


