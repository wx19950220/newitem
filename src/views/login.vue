<template>
  <div class="login">
   <form id="login" >
        <div class="title">后台管理系统</div>
        <img src="../../src/assets/loginuser.png" class="form-pic1">
        <input placeholder="用户名" name="name" type="text" class="inp1" v-model:value="value[1]"><br>
        <img src="../../src/assets/loginpsd.png" class="form-pic2">
        <input placeholder="密码" name="pwd" type="password" class="inp2" v-model:value="value[0]">
        <div id="msg"  ref="box"></div>
        <button type="button" class="btn btn-primary" @click="getHomeInfo" >登录</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import {setToKen} from '@/untils/app'
export default {
  name: 'login',
  data(){
    return{
       value:['',''],
       timer:null
    }
    },
    methods:{
      getHomeInfo:function(event){
         event.preventDefault()
         var x=this.text
         var op="name="+this.value[1]+"&pwd="+this.value[0]
         let box=this.$refs.box
         console.log(box)
         console.log(op)
         axios({
           url:'/api/a/login',
           method:"post",
           data:op
         })
         .then((response)=> {
         console.log(response)
         console.log(response.data.message)
         console.log(this)
         if(response.status==200){
           if(response.data.code===0){
            setToKen(1)
            this.$router.push('/Zhu/home')
           }
            else{
                clearInterval(timer);
                box.innerHTML = response.data.message;
                var timer = setTimeout(function() {
                     box.innerHTML = '';
                 }, 3000)
         }
         }
        })
      }
    }
}
 
</script>
<style lang="scss" scoped>
.title{
  padding-top: 10px;
  color: #03a9f4;
  font-size:16px;
}
.login{
    background:#232A3A;
    background-repeat: no-repeat;
    background-size: 100vw 100vh;
    height: 100vh;
}
#login{
    width: 350px;
    height: 230px;
    text-align: center;
    margin:0 auto;
    border-radius: 10px;
    background-color: rgba(255,250,250,0.7);
    position: relative;
    top: 300px
}
.form-pic1{
  position: absolute;
  top:64px;
  left: 60px;
}
.form-pic2{
  position: absolute;
  top:114px;
  left: 60px;
}
.inp1 {
  
    margin-top: 30px;
    width: 250px;
    height: 30px;
    border-radius: 4px;
    border:0px;
    padding-left: 60px;
}
.inp2 {
    margin-top: 20px;
    width: 250px;
    height: 30px;
    border-radius: 4px;
    border:0px;
    padding-left: 60px;
}
#msg {
    line-height: 35px;
    height: 35px;
    color: #E6941A;
}
button{
    width: 250px;
    height: 30px;
    line-height: 10px;
    font-size: 17px;
}
@media (max-width:400px) {
 #login {
   width: 250px;
  }
  .inp1,.inp2{
    width: 180px;
    padding-left: 45px;
  }
  button{
    width: 180px;
  }
  .form-pic1,.form-pic2{
    left: 40px;
  }
}
</style>