import axios from "axios";
// 引入全局配置
import { config } from "@/config/config";

//获取所有护士的执行情况数据
const handExecuteApi = (keyWord) => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    let data ={
        keyword:keyWord
    }
    axios({
        method: "post",
        url: '/api/select/allStatisticians',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
        data: JSON.stringify(data)
    }).then((response) => {
        resolve(response)
    }).catch((error) => {
        console.log(error)
        reject(error.response);
    })
})

export{
    handExecuteApi
}