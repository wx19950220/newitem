<template>
<div class="about">
<div id="page-wrapper" class="page-wrapper">
       <div class="panel panel-default">
           <form  class="form-horizontal">
               <div class="panel-body">
           <div class="row pd-bottom-2">
               <div class="col-md-4">
                   <div class="form-group">
                       <label class="control-label col-md-4">发布时间</label>
                       <div class="col-md-8">
                           <calendar style="width:100%" v-model="value" show-date-only :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="placeholder" :lang="lang" :position="position" :on-day-click="dayClick"></calendar>
                        </div>
                   </div>
              </div>
              <div class="col-md-4">
                   <div class="form-group">
                       <label class="control-label col-md-4">——</label>
                       <div class="col-md-8">
                           <calendar style="width:100%" v-model="value" show-date-only :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="placeholder" :lang="lang" :position="position" :on-day-click="dayClick"></calendar>
                        </div>
                   </div>
              </div>
              <div class="col-md-4">
                   <div class="form-group">
                       <label class="control-label col-md-4" style="word-spacing:25px">类 型</label>
                       <div class="col-md-8">
                           <select  class="form-control" v-model="formData.type">
                               <option value="" selected>全部</option>
                               <option value="0">首页banner</option>
                               <option value="1">找职位banner</option>
                               <option value="2">找精英banner</option>
                               <option value="3">行业大图</option>
                           </select>
                           </div>
                   </div>
              </div>
           </div>
            <div class="row pd-bottom-2">
                <div class="col-md-4">
                   <div class="form-group">
                       <label class="control-label col-md-4" style="word-spacing:25px">状 态</label>
                       <div class="col-md-8">
                           <select  class="form-control" v-model="formData.status">
                               <option value="" selected>全部</option>
                               <option value="1">草稿</option>
                               <option value="2">上线</option>
                           </select>
                        </div>
                   </div>
              </div>
            </div>
            <div class="row pd-bottom-2">
                <div class="col-md-4 pull-right text-right">
                   <button type="button" class="btn btn-danger" @click="delsearch()">清空</button>
                   <button type="button" class="btn btn-success" @click="search(formData)">搜索</button>
              </div>
            </div>
           
           </div>
           </form>
       </div>
       <div class="showlist">
           <div class="article-list-title">
               <div class="article-title-content">Article列表</div>
               <router-link to="listadd">
               <button type="button" class="btn btn-success article-btn">+新增</button>
               </router-link>
           </div>
           <div style="padding:15px">
            <table class="show-list">
               <tr class="show-list-title">
                   <th class="show-id">ID</th>
                   <th class="show-name">名称</th>
                   <th class="show-type">类型</th>
                   <th class="show-creat">发布时间</th>
                   <th class="show-change">修改时间</th>
                   <th class="show-creater">发布者</th>
                   <th class="show-state">状态</th>
                   <th class="show-action">操作</th>
               </tr>
                <tr class="show-list-title" v-for="(item,i) in reslist" :style="{background:i%2==0?'#F5F5F5':'white'}" height="57px">
                   <th class="show-id">{{i+1}}</th>
                    <th class="list-type"><div>{{item.title}}</div></th>
                     <th>{{type[item.type]}}</th>
                      <th>{{item.createAt|formatDate}}</th>
                       <th>{{item.updateAt|formatDate}}</th>
                        <th>{{item.author}}</th>
                          <!-- <th ref="bbb">{{item.status==1?'草稿':'上线'}}</th> -->
                          <th v-if="item.status==1">草稿</th>
                          <th v-if="item.status==2">上线</th>
                          <th>
                          <!-- <a ref="aaa" class="list-state-change " @click="updownline(item,item.status,item.id,i)">{{item.status==1?'上线':'下线'}}</a> -->
                          <a v-if="item.status==1"  data-toggle="modal" data-target='#myModal1' @click="value1(item)">上线</a>
                          <a v-if="item.status==2"  data-toggle="modal" data-target="#myModal2" @click="value1(item)">下线</a>

                           <router-link :to="{ path:'/Zhu/listedit', query: {id: item.id,op:item}}">
                           <a class="list-change" >编辑</a>
                           </router-link>
                            <a class="list-del" data-toggle="modal" data-target="#myModal3" @click="value1(item)">删除</a>  
                          </th> 
               </tr>
              
               <!-- <div></div> -->
            </table>
           </div>
<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					<small><small>关闭</small></small>
				</button>
				<h4 class="modal-title pull-left" id="myModalLabel">
					操作提示
				</h4>
			</div>
			<div class="modal-body">
				<h4 style="color:grey;">上线后该图片将在轮播banner中展示。</h4>
                <span style="font-size:18px;font-weight:400">是否执行上线操作？</span>
                 
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" data-dismiss="modal">取消
				</button>
                
				<button type="button" class="btn btn-primary" id="abd" @click="upline(uplineid,uplinestatus)" data-dismiss="modal" >
					确定
				</button>
			</div>
		</div>
</div>
</div>
 <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					<small><small>关闭</small></small>
				</button>
				<h4 class="modal-title pull-left" id="myModalLabel">
					操作提示
				</h4>
			</div>
			<div class="modal-body">
				<h4 style="color:grey;">下线后该图片将不展示站轮播banner中。</h4>
                <span style="font-size:18px;font-weight:400">是否执行下线操作？</span>
                
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" data-dismiss="modal">取消
				</button>
                
				<button type="button" class="btn btn-primary"  id="abc" @click="downline(uplineid,uplinestatus)">
					确定
				</button>
			</div>
		</div>
	</div>
 </div>
 <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title pull-left" id="myModalLabel">
					提示
				</h4>
			</div>
			<div class="modal-body">
                <span style="font-size:18px;font-weight:400">是否确认删除</span>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" data-dismiss="modal">取消
				</button>
				<button type="button" class="btn btn-primary"   @click="dellist(delid)">
					确定
				</button>
			</div>
		</div>
	</div>
 </div>
 <div class="modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title pull-left" id="myModalLabel">
					提示
				</h4>
			</div>
			<div class="modal-body">
                <span style="font-size:18px;font-weight:400">上线成功</span>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">
					确定
				</button>
			</div>
		</div>
	</div>
 </div>
 <div class="modal fade" id="myModal5" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title pull-left" id="myModalLabel">
					提示
				</h4>
			</div>
			<div class="modal-body">
                <span style="font-size:18px;font-weight:400">下线成功</span>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">
					确定
				</button>
			</div>
		</div>
	</div>
 </div>
 <div class="modal fade" id="myModal6" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title pull-left" id="myModalLabel">
					提示
				</h4>
			</div>
			<div class="modal-body">
                <span style="font-size:18px;font-weight:400">编辑成功</span>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">
					确定
				</button>
			</div>
		</div>
	</div>
 </div>
</div>
       <ul class="pagination pull-right">
           <li class="pull-left paginationCenter">
               每页显示
               <input type="text" class="paginationGo text-center" v-model="pagesize" >
               条
           </li>
           <li @click="firstpage()"><a>首页</a></li>
           <li @click="cutpage()" :class="pagenow<=1?'disabled':''"><a><</a></li>
           <li :class="index+1==pagenow?'active':''" v-for="item,index in pagenum" @click="choosepage(index)">
               <a>{{index+1}}</a>
           </li>
            <li @click="pluspage()" :class="pagenow>=pagenum?'disabled':''"><a>></a></li>
            <li @click="endpage()"><a>末页</a></li>
            <li>
                去第
                <input type="text" class="paginationGo text-center" v-model="pagewhich" onkeyup="value=value.replace(/[^\d\.]/g,'')" >
                页
                <a class="pull-right" @click="getaxios()" >确定</a>
            </li>
       </ul>
</div>
</div>
</template>

<script>
import bus from '../../bus'
 import moment from 'moment'
import axios from 'axios'
import qs from 'qs'
import Calendar from 'vue2-slot-calendar';

export default {
    inject: ["reload"],
    data(){
        return{
             formData: {
        createdAt: '',
        lastAt: '',
        type: '',
        status:''
      },
            delid:'',
            uplineid:'',
            uplinestatus:'',
            getlist:[],
            reslist:[],
            type:[ "首页banner", "找职位banner"  ,"找精英banner" ,"行业大图"],
            gh:'',
            pagetotal:'',
            pagesize:'',
            pagenum:'',
            pagenow:1,
            pagewhich:'',
            disabled: [], //禁用的日期
            value: new Date(), //值
            format: "yyyy-MM-dd", //文本框中显示的日期格式
            clear: false, //是否在文本框右侧显示清除按钮（X）
            placeholder: "日期", //水印
            position: "left", //日期面板位置，默认null和left 居左，right则靠右
            lang: "" //语言，默认中文，可选值：zh-CN、en

        }
    },

    methods:{
    search({ createdAt, lastAt, type, status }) {
         let _this=this
         axios({
                url:`/api/a/article/search?size=${this.pagesize}&page=1&type=${type}&status=${status}`,
                method:"get"
                })
                .then(response => {
                // 请求成功
                 _this.pagesize=response.data.data.size
                 _this.pagetotal=response.data.data.total
                 _this.pagenum=Math.ceil(response.data.data.total/response.data.data.size)
                 _this.getlist=response.data.data.articleList;
                 _this.reslist=response.data.data.articleList;
                 this.pagenow=1
                console.log(response, _this.pagenum)
                })
    },
   delsearch(){
       this.reload()
   },
    value1(item){
        this.uplineid=item.id;
        this.uplinestatus=item.status;
        this.delid=item.id
    },

        upline(id,status){
            let _this=this
            let api ='/api/a/u/article/status'
            let io={
                id:id,
                status:2
                   }
              axios.put(api,qs.stringify(io))
              .then(response => {
                let res = response.data;
                console.log(res);
                // $('#myModal4').modal('show')
                this.reload()
                sessionStorage.setItem('1',1)  
                })
                .catch(error => {
                console.log(error);
                });   
            
        },
        downline(id,status){
            let _this=this
            let api ='/api/a/u/article/status'
            let io={
                id:id,
                status:1
                   }
              axios.put(api,qs.stringify(io))
              .then(response => {
                let res = response.data;
                console.log(res);
                 this.reload()
                 $(".modal-backdrop").remove()
                sessionStorage.setItem('2',1) 
                })
                .catch(error => {
                console.log(error);
                });
               
        },
        dellist(id){
        let _this=this
        axios({
            url:'/api/a/u/article/'+id,
            method:'delete'
        })
        .then(response => {
            // 请求成功
            let res = response
            console.log(res);
            this.reload()
            $(".modal-backdrop").remove()
           
            })
    },
        getform(index){
            let _this=this
            this.pagenow=index||this.pagenow     
            axios({
               url:`/api/a/article/search?size=${this.pagesize}&page=${this.pagenow}&type=${this.formData.type}&status=${this.formData.status}`,
                method:"get"
                })
                .then(response => {
                // 请求成功
                 _this.pagesize=response.data.data.size
                 _this.pagetotal=response.data.data.total
                 _this.pagenum=Math.ceil(response.data.data.total/response.data.data.size)
                 _this.getlist=response.data.data.articleList;
                 _this.reslist=response.data.data.articleList;
                console.log(response, _this.pagenum)
                })
        },
        //确定是什么size是什么页码
        getaxios(){
            this.pagenow=this.pagewhich
            if(this.pagewhich==0){
                this.pagenow=1
            }
            this.getform()
        },
        //当前页
        choosepage(index){
            
            this.getform(index+1)
        },
        //上一页
        cutpage(){
            if(this.pagenow>1){
                this.pagenow--
                this.getform(this.pagenow)
            }
        },
        //下一页
        pluspage(){
            if(this.pagenow<this.pagenum){
                this.pagenow++
                this.getform(this.pagenow)
            }
        },
        //首页
        firstpage(){
            this.pagenow=1
            this.getform(this.pagenow)
        },
        //末页
        endpage(){
            this.pagenow=this.pagenum
            this.getform(this.pagenow)
        },
          //鼠标点击日历面板上的日期时的事件，
                 //传递的两个参数均是同一个值，只是类型不同，随便用哪个看个人需要
                 //date 是 Date 类型
                 //dateStr 是 String 类型
                 dayClick: function(date, dateStr) {
                    console.log(date);
                    console.log(dateStr);
                     console.log(this.value);
                 }
    },
  components:{
      calendar: Calendar
  },
   created(){
       this.getform()
            },
    mounted(){
        if(sessionStorage.getItem('1')==1||localStorage.getItem('uplinesuccess')==1){
            $('#myModal4').modal('show')
            sessionStorage.removeItem('1')
            localStorage.removeItem('uplinesuccess')
        };
        if(sessionStorage.getItem('2')==1){
            $('#myModal5').modal('show')
            sessionStorage.removeItem('2')
        };
        if(localStorage.getItem('savesuccess')==1){
            $('#myModal6').modal('show')
            localStorage.removeItem('savesuccess')
        }
        
    },
    filters: {
      formatDate(value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      }
    }
    
}
</script>

<style lang="scss" scoped>
a:hover{
    cursor:pointer;
    text-decoration:none;
}
.paginationGo {
    line-height: 28px;
    width: 50px;
}
.pagination li > a {
    margin: 0 5px;
    }
@media (min-width: 768px){
.form-horizontal .control-label {
    margin-bottom: 4px;
}
}
@media (min-width: 768px){
#page-wrapper {
    width:calc(100% - 250px);
    height: 100%;
    position: absolute;
    left: 250px;
    top: 50px;
    padding: 30px 30px 30px 30px;
}
}
.page-wrapper {
    background-color: #f5f5f5;
}
.about{
  width: 100vw;
  background: #F5F5F5;
 border:1px solid #fff;
}
.search,.showlist{
   
    background: #fff;
    border:1px solid rgb(221, 221, 221);
    border-radius: 4px;
}
.search{
     height: 200px;
}

.form-text1,.form-text2{
    margin-right:30px;
    font-size: 17px;
    font-weight: 600; 
}
.form-text2{
    letter-spacing: 17px;
}
.chooselist{
    display: flex;
    flex-wrap: wrap;
    position: relative;
}
.form-style{
    display: flex;
    margin: 30px 30px 5px 30px
}
.input-style{
    border-radius: 6px;
    border:1px solid rgb(221, 221, 221);
    height: 35px;
    margin-top:-5px; 
}
form>button{
    width: 60px;
    position: absolute;
    right: 30px;
    bottom: -50px;
}
.btn-danger{
    right: 100px;
}
@media (min-width: 1615px) {
    form>button{bottom: -120px;}
}
@media (max-width: 768px) {
    #page-wrapper {
    position: absolute;
    top: 100px;
    height: 100%;
    padding: 30px 30px 30px 30px;
}
    .search{
        height: 400px;
    }
    .form-style{
        display: block;
        margin-top: 14px
    }
    .chooselist{
        display: block;
    }
    .form-text1,.form-text2{
        margin-bottom: 10px;
    }
    .input-style{
       width: 100%;
    }
}
@media (max-width:768px) {
    .search,.showlist{
    margin-left: 10px;
    margin-right:10px; 
    margin-top:40px; 
    background: #fff;
    border:1px solid rgb(221, 221, 221);
    border-radius: 4px;
}
}
input,button{
    outline: unset;
}
.article-list-title{
    display: flex;
    justify-content: space-between;
    height: 45px;
   background: #F5F5F5;
    border-bottom:1px solid rgb(221, 221, 221);
}
.article-title-content{
    line-height: 45px;
    font-size: 17px;
    font-weight: 550;
    margin-left:15px;
}
.article-btn {
    height: 30px;
    width: 60px;
    margin-top:7px; 
    margin-right: 15px;
}
.show-list{
    width: 100%;
    border: 1px solid rgb(221, 221, 221);
}
.show-list-title{
    line-height: 35px;
    font-weight: 550;
}
.show-id{
    // width: 10px;
     padding-left:10px; 
    // margin-right: -20px;
}
table>tr>th{
    border-bottom: 1px solid rgb(221, 221, 221);
    text-align: center
}
th{
  max-width: 180px;
    white-space: wrap;
    word-wrap:break-word
}
.list-del{
    margin-left:10px;

}
.list-change{
    margin-left:10px; 
    
}
// .list-state-change{
//     margin-left:30px 
// }
</style>