import axios from 'axios';
//引入全局配置
import {config} from '@/config/config'

//获取今日异常数据
const handTodayAlert = (keyWord) =>new Promise((resolve,reject) =>{
    let token = localStorage.getItem(config.userToken)
    let data ={
        // isToday : true,
        keyword :keyWord
    }
    axios({
        method:'post',
        url:'api/select/exceptionAlerts',
        headers:{
            'Content-Type':'application/json',
            'token':token,
        },
        data: JSON.stringify(data)
    }).then((response) =>{
        resolve(response)
    }).catch((error) =>{
        reject(error.response)
    })
})

//获取历史异常数据
const handHistoryAlert = (keyWord) =>new Promise((resolve,reject) =>{
    let token = localStorage.getItem(config.userToken)
    let data ={
        isToday : false,
        keyword :keyWord
    }
    axios({
        method:'post',
        url:'api/select/exceptionAlerts',
        headers:{
            'Content-Type':'application/json',
            'token':token,
        },
        data: JSON.stringify(data)
    }).then((response) =>{
        resolve(response)
    }).catch((error) =>{
        reject(error.response)
    })
})

export{
    handTodayAlert,
    handHistoryAlert
}