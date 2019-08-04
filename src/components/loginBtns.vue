<template>
    <!-- 按钮组 -->
    <div class="loginBtns">
        <!-- 未登录 -->
        <div class="loginBtns_05" v-show='view0'>
            <router-link to='login' class='btn'>登录</router-link>
            <a href='#main' class='btn'>▲</a>
        </div>
        <!-- 已登录 -->
        <div class="loginBtns_05" v-show='view1'>
            <router-link 
                :to="{name:'orders',params:{name:this.userName}}"
                class="btn" 
                @click="sendOrder()">我的订单
              </router-link>
            <a class='btn' @click='showCar()'>购物车</a>
            <a to='login' class='btn' @click="logout()">注销</a>
            <a href='#main' class='btn'>▲</a>
        </div>

        <!-- 购物车 -->
        <myCar v-if="carView" :DBfromApp='DBfromApp'></myCar>
    </div>
</template>

<script>
    import myCar from './myCar.vue';

    export default {
        data:function(){
            return{
                userName:'',
                view0:true,//控制视图
                view1:false,
                carView:false,
            }
        },
        props:['DBfromApp'],//使用父组件App的DB数据
        watch:{
            userName:function(){
                if(localStorage.club1023User=="") this.viewsOn();
            }
        },
        methods:{
            viewsOn:function(){// 切换视图
                this.view0 = !this.view0;
                this.view1 = !this.view1;
            },
            logout:function(){//注销登录
                localStorage.club1023User="";
                this.userName = localStorage.club1023User;
                window.console.log('用户注销:此时的用户是:  '+localStorage.club1023User);
            },
            showCar:function(){//展示购物车
                this.carView = !this.carView
                // window.console.log(this.carView)
            },
        },
        components:{
            myCar,
        },
        created(){
            this.userName = localStorage.club1023User;//登录后会获得用户名
            if(this.userName != ""){ this.viewsOn() }
            window.console.log('btns - 此时的用户是:  '+localStorage.club1023User);
        }
    }
</script>

<style scoped>
    @import '../assets/css/index/btns_5.css';
</style>
