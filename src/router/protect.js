import router from './index'
import {getToKen} from '../untils/app'

const whiteRouter=['/login'];  //_indexOf方法 判断数组中是否有指定的某个对象
router.beforeEach((to,from,next)=>{
    console.log(to)
    if(getToKen()){
        
        next()

    }else{
        
        if(whiteRouter.indexOf(to.path)!==-1){
            
            next()
        }else{
            next('/login')
        }

    }
})