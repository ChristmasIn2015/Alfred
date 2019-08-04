<template>
  <div id='main'>
    <router-view :DBfromApp='this.DB'></router-view>
  </div>
</template>

<script>
  import DB from './api/DB.js'
  export default {
    data:function(){
      return {
        //ifUser用于保存已经登录的用户名,这样全局都能根据这个数据来确定是否加载获取到的数据
        ifUser:'none',
        DB:DB,//注册暴露的数据库
      }
    },
    methods:{
    },
    created(){
      //默认页面开启时候不保存登录数据
      localStorage.club1023User="";
      window.alert('由于图片质量过高/服务器速度慢/请耐心等待加载 (=^･ω･^=)')
    },
  }
</script>

<style scoped>
  @import './assets/css/App/app.css';
</style>
