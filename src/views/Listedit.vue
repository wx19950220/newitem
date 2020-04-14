<template>
    <div>
        <div class="page">
         <div class="showlist panel panel-default row">
           <div class="article-list-title ">
               <div class="article-title-content">编辑Article</div>
           </div>
           <div style="padding:15px">
          <form class="form-horizontal" v-on:submit='defaultevent'>
              <div class="form-group ">
                  <label for="" class="control-label col-md-2">标题名称</label>
                  <div class=" col-md-8"><input type="text" class="form-control" placeholder="请输入信息" v-model="data.title" ref="titleinput"/></div>
              </div>
              <div class="form-group ">
                 
                  <label for="" class="control-label col-md-2 word-spacing-25" >类 型</label>
                  <div class=" col-md-2"><select id="sex" class="form-control" v-model="whichtype" @change="changetype" ref="sex">
                   <option>请选择</option>
                   <option>首页Banner</option>
                   <option>找职位Banner</option>
                   <option>找精英Banner</option>
                   <option>行业大图</option>
                 </select></div>
                 <div class=" col-md-2"><select id="dd" class="form-control" v-show="showtype" v-model="whichindustry" ref="downdrop" @change="changeindustry">
                   <option>请选择</option>
                   <option>移动互联网</option>
                   <option>电子商务</option>
                   <option>企业服务</option>
                    <option>020</option>
                    <option>教育</option>
                    <option>金融</option>
                    <option>游戏</option>
                 </select></div>
                 </div>
              <div class="form-group">
                  <label for="" class="control-label col-md-2 word-spacing-25">说 明</label>
                  <!-- <div class="col-md-8"><input type="text" class="form-control" placeholder="请输入信息" v-model="data.content" ref="contentinput"/></div> -->
                  <quillEditor class="col-md-8" v-model="data.content"  ref="myQuillEditor" :options="editorOption" />
              </div>
              <div class="form-group">
                  <label for="" class="control-label col-md-2">跳转链接</label>
                  <div class="col-md-8"><input type="text" class="form-control" placeholder="请输入信息" v-model="data.url" ref="urlinput"/></div>
              </div>
              <div class=" form-group updata" style="padding-left:0px">
                  
                  <label for="" class="control-label col-md-2 word-spacing-25">配 图</label>
                  
                  <div class="col-md-10" style="padding-left:0px">
                      <div class="col-md-12">
                      <label class="btn btn-primary" for="upfile">选择文件</label>
                      <input type="file" id="upfile" ref="updata" v-show="lll" @change="picchange"/>
                      </div>
                      
                  <div class="col-md-12">
                      <img :src='item.picshow' alt="" class="img-responsive "/>
                  </div>
                  <div class="col-md-12">
              <div class="table-responsive col-md-8">
                  <table class="table">
                      <thead>
                          <tr>
                          <th>图片名</th>
                          <th>文件大小</th>
                          <th>进度</th>
                          <th>操作</th>
                          <th>操作</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-show="item.hide">
                          <td>{{showpicfile.name}}</td>
                          <td>{{showpicfile.size}}</td>
                          <td >
                              <div class="progress" style="margin-bottom:0px;width:100%;" v-show="item.progress">
                                  <div class="progress-bar" role="progressbar" :style="'width:'+item.progresslenth+'%'" ></div>
                              </div>
                          </td>
                          <td>
                              <span class="glyphicon glyphicon-ok" v-show="item.sucessicon"></span>
                              <!-- <span class="glyphicon glyphicon-ban-circle" v-show="stopicon"></span>
                              <span class="glyphicon glyphicon-remove" v-show="removeicon"></span> -->
                          </td>
                          <td nowarp>
                              <button class="btn btn-success btn-xs" @click="uploadbtn()" ref="uploadbtn" style="margin-right:3px"><span class="glyphicon glyphicon-upload"></span>&ensp;上传</button>
                               <button class="btn btn-danger btn-xs" @click="deletebtn()"><span class="glyphicon glyphicon-trash"></span>&ensp;删除</button>
                          </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              </div>
             </div>
              <div class="form-group ">
                  <div class="col-md-2"></div>
                  <div class="col-md-8">
                  <button class="btn btn-success" ref="shangxian" style="margin-right:3px" @click="upline()">立即上线</button>
                  <button class="btn btn-success" ref="caogao" @click="savebook()" type="submit">存为草稿</button>
                  <router-link to="about">
                  <button class="btn btn-default pull-right">取消</button>
                  </router-link>
                  </div>
              </div>
          </form>
           </div>
       
           </div>
           </div>
       </div>
     
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
export default {
    
    data(){
        return{
            data:{title:{},type:{},img:{},industry:{},url:{},content:null,status:{}},
            lll:null,
            pic:null,
            whichtype:null,
            whichindustry:null,
            showtype:false,
            showpicfile:{name:null,size:null},
            item:{progress:null,sucessicon:null,stopicon:null,removeicon:null,hide:null,picshow:null,progresslenth:null},
            tupian:null,
            submitform:{title:{},type:{},img:{},industry:{},url:{},content:{},status:{},createAt:{},status:{}},
             editorOption: {  
               modules: {
               ImageExtend: {
               loading: true,
               name: 'file',
               action: 'api/a/u/img/task',
               response: (res) => {
                return res.data.url
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
        }
    },
    components:{
        quillEditor
    },
    methods:{
        defaultevent(e){
            e.preventDefault();
        },
        picchange(e){
            console.log(e.target.files[0])
            this.item.hide=true
            this.tupian=e.target.files[0]
              var imgURL = window.URL.createObjectURL(e.target.files[0]);
              this.pic=imgURL
              this.showpicfile.name=e.target.files[0].name;
              this.showpicfile.size=parseFloat(e.target.files[0].size/1024/1024).toFixed(2)+'Mb';
              this.item.progress=true;
        },
        changetype(){
            console.log(this.$refs.sex.selectedIndex)
            if(this.$refs.sex.selectedIndex==4){this.showtype=true}
            else{this.showtype=false}
            if(!this.data.url||!this.data.title||this.$refs.downdrop.selectedIndex==0||this.$refs.sex.selectedIndex==0){ this.$refs.caogao.disabled="disabled"}else{this.$refs.caogao.disabled=""}
            if(!this.data.url||!this.data.title||this.$refs.downdrop.selectedIndex==0||this.$refs.sex.selectedIndex==0){ this.$refs.shangxian.disabled="disabled"}else{this.$refs.shangxian.disabled=""}    
        },
        changeindustry(){
            if(!this.data.url||!this.data.title||this.$refs.downdrop.selectedIndex==0||this.$refs.sex.selectedIndex==0){ this.$refs.caogao.disabled="disabled"}else{this.$refs.caogao.disabled=""}    
            if(!this.data.url||!this.data.title||this.$refs.downdrop.selectedIndex==0||this.$refs.sex.selectedIndex==0){ this.$refs.shangxian.disabled="disabled"}else{this.$refs.shangxian.disabled=""}    

        },
        uploadbtn(){
            this.item.picshow=this.pic
            this.data.img=this.pic
            var progressnow=0;
            var timer=setInterval(()=>{
                progressnow++;
                if(progressnow>=100){
                     clearInterval(timer);
                     this.item.sucessicon=true
                }
                 this.item.progresslenth=progressnow
            },20)
            this.$refs.uploadbtn.disabled="disabled"
            let params = new FormData()
            params.append('file',this.tupian,this.tupian.name)
            axios.post('api/a/u/img/task',params)
            .then(response=>{
                let res = response;
                console.log(res);
                this.data.img=res.data.data.url
            })
        },
        deletebtn(){
             this.item.hide=null
             this.$refs.updata.value=''
             this.item.progresslenth=0
             this.item.sucessicon=null
             this.$refs.uploadbtn.disabled=""
        },
        upline(){
            this.data.industry=this.$refs.downdrop.selectedIndex-1;
            this.data.type=this.$refs.sex.selectedIndex-1;
            this.data.status=2;
            let submit=qs.stringify(this.data)
            let id=this.$route.query.id
            console.log(id,this.data)
            axios.put(`/api/a/u/article/${id}?`+submit)
            .then(response => {
                let res = response;
                console.log(res);
                window.history.back(-1);
                 localStorage.setItem('uplinesuccess',1)
                
                })
        },
        savebook(){
            this.data.industry=this.$refs.downdrop.selectedIndex-1;
            this.data.type=this.$refs.sex.selectedIndex-1;
            let submit=qs.stringify(this.data)
            // let api='/api/a/u/article/'+this.$route.query.id
            let id=this.$route.query.id
             console.log(id,this.data)
            axios.put(`/api/a/u/article/${id}?`+submit)
            .then(response => {
                let res = response;
                console.log(res);
                window.history.back(-1);
                localStorage.setItem('savesuccess',1)
                })
            
        }
    },
   created(){
       
        var pageid=this.$route.query.id   
         axios({
            url:'/api/a/article/'+pageid,
            method:'get'})
        .then(response => {
            // 请求成功
            let res = response;
            console.log(res);
            this.data=res.data.data.article
            console.log(this.data)
            this.pic=this.data.img
            this.item.picshow=this.data.img
        //根据id进入后的默认行业选项
        if(this.data.type==0)
        {this.whichtype="首页Banner"}
        else if(this.data.type==1){this.whichtype="找职位Banner"} 
        else if(this.data.type==2){this.whichtype="找精英Banner"}
        else if(this.data.type==3){this.whichtype="行业大图"} 
        if(this.data.type==3){this.showtype=true}
        console.log(this.showtype)
         //根据industry进入行业
         if(this.data.industry==0){this.whichindustry="移动互联网"}
         else if(this.data.industry==1){this.whichindustry="电子商务"}
         else if(this.data.industry==2){this.whichindustry="企业服务"}
         else if(this.data.industry==3){this.whichindustry="020"}
         else if(this.data.industry==4){this.whichindustry="教育"}
          else if(this.data.industry==5){this.whichindustry="金融"}
           else if(this.data.industry==6){this.whichindustry="游戏"}
            })
    }
   ,
   watch:{
       'data.url':function(){
             if(!this.data.url||!this.data.title||this.$refs.downdrop.selectedIndex==0||this.$refs.sex.selectedIndex==0){ this.$refs.caogao.disabled="disabled"}else{this.$refs.caogao.disabled=""}
            if(!this.data.url||!this.data.title||this.$refs.downdrop.selectedIndex==0||this.$refs.sex.selectedIndex==0){ this.$refs.shangxian .disabled="disabled"}else{this.$refs.shangxian.disabled=""}            
       },
       'data.title':function(){
             if(!this.data.url||!this.data.title||this.$refs.downdrop.selectedIndex==0||this.$refs.sex.selectedIndex==0){ this.$refs.caogao.disabled="disabled"}else{this.$refs.caogao.disabled=""}
             if(!this.data.url||!this.data.title||this.$refs.downdrop.selectedIndex==0||this.$refs.sex.selectedIndex==0){ this.$refs.shangxian.disabled="disabled"}else{this.$refs.shangxian.disabled=""}            
       },
   }
}
</script>

<style lang="scss" scoped>
@media (min-width: 768px){
.page {
   height:100%;
   width:calc(100% - 250px);
    position: absolute;
    left: 250px;
    top: 50px;
    padding: 30px 30px 30px 30px;
}
}
.page{
        background-color: #f5f5f5;
}
.show-list{
    width: 100%;
    border: 1px solid rgb(221, 221, 221);
    
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
.updata{
    padding-left: 15px;
    padding-right:15px; 
}
table th,table td{
    text-align: center
}
.word-spacing-25{
    word-spacing: 25px;
}
@media (max-width: 768px){
  .page {
    height:100%;
    width: 100%;
    position: absolute;
    top: 100px;
    padding: 30px 30px 30px 30px;}
    }
</style>