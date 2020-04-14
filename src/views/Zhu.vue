<template>
     <div class="wrapper">
       <nav class="navbar navbar-static-top" style="margin-bottom: 0px;position: fixed;width: 100%;">

          <div class="navbar-header">
            <button type="button" class="navbar-toggle navbar-toggle-button" data-toggle="collapse" data-target=".navbar-collapse" >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <div class="navbar-brand header-font" href="#">萝卜多后台管理系统</div>
          </div>
          <div class="topbar-content" >
              <ul class="nav navbar-top-links navbar-right"> 
                  <li class="pull-right dropdown">
                <a class="dropdown-character"><span>管理员</span></a><span class="vertical">|</span>
                <a class="dropdown-name"><span>admin</span></a><span class="vertical">|</span>
                <a class="dropdown-toggle dropdown-close" @click="logout()"><span class="glyphicon glyphicon-off"></span></a>
                </li>
              </ul>
          </div> 
       </nav>
          <div class="sidebar" role="navigation" style="position: fixed;left: 0px;top: 50px; padding-bottom: 100%; background: #232A3A;">
              <div class="sidebar-nav navbar-collapse collapse ">
            <ul class=" list nav" >
              <li class="active" role="presentation" v-for="item,i in dataList" ref='secmeun'>
              <div href="#" @click="dianji(i)" :style="{background:index==i||indexcontent==i?'grey':'#232A3A'}" v-text="item.title" class="secmeumstyle"></div>       
                <ul :style="{display:index==i||indexcontent==i?'block':'none'}"  class="secmeun" v-for="opt,p in item.list1" >
                    <router-link :to="'/Zhu/'+opt.url" >
                    <div v-text="opt.content"  style="position:relative;left:20px" @click="sectap(p)"></div>
                    </router-link>
                </ul>
              </li>
            </ul>
              </div>
          </div>
            <router-view v-if="isRouterAlive"></router-view>
        </div>
</template>
<script>
import axios from "axios"
import cookie from 'cookie_js'
import bus from '../../bus'
import {remToKen} from '@/untils/app'
var dataList = [{
            title: '后台管理',
            list1: [{
                    content: "模块管理",
                    url:"home"
                },
                {
                    content: '角色管理',
                    url:"home"
                },
                {
                    content: '密码修改',
                    url:"home"
                }
            ]
        }, {
            title: '信息管理',
            list1: [{
                    content: '公司列表',
                    url:"home"
                },
                {
                    content: '职位列表',
                    url:"home"
                }
            ]
        }, {
            title: '内容管理',
            list1: [{
                    content: 'Article列表',
                    url:"about"
                }
            ]
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ]
export default {
    
  name:"Zhu",
  data() {
      return{ 
          dataList,
          index: -1,
          getres:{},
          isRouterAlive: true,
          token:'1',
          indexcontent:-1,
          changecolor:-1,
          
            }
          },
  methods: {
        dianji(i) {
                    cookie.set('token',i)

                    this.indexcontent=-1
                    if (this.index == i) {
                        this.index = -1;
                    } else {
                        this.index = i;
                    }
                },
        sectap(p){
            cookie.set('tokensec',p)
                    this.$refs.secmeun[0].getElementsByTagName("a")[0].style.background='#232A3A'
                    this.$refs.secmeun[0].getElementsByTagName("a")[1].style.background='#232A3A'
                    this.$refs.secmeun[0].getElementsByTagName("a")[2].style.background='#232A3A'
                    this.$refs.secmeun[1].getElementsByTagName("a")[0].style.background='#232A3A'
                    this.$refs.secmeun[1].getElementsByTagName("a")[1].style.background='#232A3A'
                    this.$refs.secmeun[2].getElementsByTagName("a")[0].style.background='#232A3A'
                    event.path[1].style.background='grey'
        }
                ,
                reload() {
                    this.isRouterAlive = false;
                    this.$nextTick(function() 
                    {
　　　　　　　　　　  this.isRouterAlive = true;
})
},
logout(){
    axios.post('/api/a/logout')
    .then((response)=>{
        console.log(response)
        remToKen()
        this.$router.push('/login')
    })

    
}
  },           
  provide() {
　　　　　　return {
　　　　　　　　reload: this.reload
　　　　　　}
　　　　},
created(){
    this.indexcontent=cookie.get('token');
},
mounted(){
    var first=parseInt(cookie.get('token'))
    var second=parseInt(cookie.get('tokensec'))
    console.log(first,second)
    this.$refs.secmeun[first].getElementsByTagName("a")[second].style.background='grey'
    
}

}
 

</script>>
<style lang="scss" scoped>
.secmeumstyle{
    background: grey;
    height: 40px;
    font-size: 18px;
    color: white;
    line-height: 40px;
}
.secmeumstyle:hover{
     cursor:pointer;
}
.secmeun{
    padding-left: 0px;
}
.navbar-toggle-button {
    border: 1px solid white;
}
.navbar-toggle-button span {
    background-color: white;
}
.nav>li a {
    padding: 0;
}
.navbar-collapse{
    padding-left: 0;
}
   .topbar-content {
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0 0 6px #e3e2e2;
    border-color: #e3e2e2;
}
.navbar-top-links {
    margin-right: 0;
}
.navbar-top-links li:last-child {
    margin-right: 15px;
}
.navbar-top-links li a {
    padding: 15px;
    min-height: 50px;
}
        .navbar-top-links .dropdown .dropdown-character, .navbar-top-links .dropdown .dropdown-name, .navbar-top-links .dropdown .dropdown-close {
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px;
}
        .navbar-top-links .dropdown .dropdown-close {
    color: rgb(35, 42, 58);
}
        .navbar-top-links .dropdown .vertical {
    color: #e8e8e8;
}
        @media (min-width: 768px){
.sidebar {
    width: 250px; 
}
}
        .wrapper{
            overflow: hidden;
            min-height: 100vh;
        }
        .topbar-content{
            overflow: hidden;
            background-color: #fff;
            box-shadow: 0 0 6px #e3e2e2;
            border-color: #e3e2e2;
        }
        .www>button{
            border:0px;
            font-size:14px; 
        }
        .www>button:focus{
            outline: none;
        }
        .list {
            width: 250px;
            margin: 0px auto 0;
            text-align: center;
        }

        .list>li {
            width: 250px;
        }

        .list>li a {
            display: block;
            
            height: 40px;
            
            line-height: 40px;
            color: #fff;
            text-decoration: none;
            font-size: 16px;
        }

        .list>li>ul {
            display: none;
        }
        .navbar-default .navbar-brand:hover {
         color: #fff;
         }
        .list>li>ul>button {
            display: block;
            width:250px;
            line-height: 40px;
            height: 40px;
            background: #232A3A;
            color: #fff;
            font-size: 15px;
            border:0px;
            outline: none;
        }
        .list>li>ul>li>font {
            position: relative;
            right: -20px;
        }
        .navbar-default{
            background: #fff;
        }
        .header-font {
        font-size: 18px;
        font-weight: 600;
        width: 250px;
        height: 50px;
        color: #fff;
        }
      @media (min-width: 768px){
   
     .container-fluid>.navbar-collapse, .container>.navbar-collapse, .container>.navbar-header {
    margin-right: 0;
    margin-left: -16px;
    width: 250px;
    height: 0px;
    position: absolute;
    top: 51.5px;
    }
   .navbar-header{
         background: #232A3A;
         width: 250px;
          color: #fff;
    }
    .navbar {
        border-radius: 0px;
    }
    .list{
        float: left;
        // padding-top:30px;
        // padding-bottom: 3000px;
        background: #232A3A;
    }
    }
    @media (min-width: 768px) {
        .header-font {
        position: relative;
        right: -38px;
    }
    
    .header-line{
        position: relative;
        top: 8px;
    }
    }
    @media (max-width:768px) {
        .sidebar{
            position: fixed!important;
            top:100px!important;
            padding-bottom:0px!important;
            z-index: 2;
        }
         .www{
        display: flex;
        justify-content: flex-end;
        width: 100vw;
        margin-top:7px; 
        position: relative;
        left: -40px;

    }
        .list{
            width: 100vw;
        }
        .list>li a,.list>li ul button{
            width: 100vw;
        }
        
    }
    .navbar-header{
         background: #232A3A;
         }
    
    .navbar-default .navbar-brand {
    color: #fff;
    }
     .navbar-default{
        margin-bottom:0px; 
     }
     nav {
         position: relative;
     }
</style>