import axios from "axios";
// 引入全局配置
import { config } from "@/config/config";

//获取该时间段内的执行情况数据
const executeApi = (startDate,endDate) => new Promise((resolve, reject) =>{
    let data = {
        startdate: startDate,
        enddate:endDate
    }
    let token = localStorage.getItem(config.userToken)
    axios({
        method:'post',
        url:'/api/select/statisticians',
        headers:{
            "Content-Type": "application/json",
            "token":token
        },
        data:JSON.stringify(data)
    }).then((response)=>{
        resolve(response)
    }).catch((error)=>{
        reject(error.response)
    })
})

export{
    executeApi
}