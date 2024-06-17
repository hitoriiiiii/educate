import axios from "axios";
// 引入全局配置
import { config } from "@/config/config";

// 获取本月护士执行情况（护士长主页）
const getMonthExecteApi = () => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    axios({
        method: "get",
        url: '/api/select/currentMonthAll',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
        // data: JSON.stringify({})
    }).then((response) => {
        resolve(response)
    }).catch((error) => {
        console.log(error)
        reject(error.response);
    })
})

// 获取今日/历史异常提醒（护士长主页）
const getNoticeApi = (flag) => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    let data = {
        isToday:flag
    }
    axios({
        method: "post",
        url: '/api/select/exceptionAlerts',
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




// 护士长个人信息查询
const getheadNurseInfoApi = (id) => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    let data = {
        id:id
    }
    axios({
        method: "get",
        url: '/api/user',
        headers: {
            "Content-Type": "application/json",
            "token": token
        },
        data: JSON.stringify(data)
    }).then((response) => {
        resolve(response)
    }).catch((error) => {
        reject(error.response);
    })
})

// 获取随访数据（护士长主页）
const getFollowDataApi = () => new Promise((resolve, reject) => {   
    let token = localStorage.getItem(config.userToken)
    axios({
        method: "get",
        url: '/api/select/weekFollowUpTask',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
        // data: JSON.stringify(data)
    }).then((response) => {
        resolve(response)
    }).catch((error) => {
        console.log(error)
        reject(error.response);
    })
})

// 获取计划管理面板数据（护士长主页）
const getFlanManageApi = () => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    axios({
        method: "post",
        url: '/api/select/clinicalFollowTask',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
        // data: JSON.stringify({})
    }).then((response) => {
        resolve(response)
    }).catch((error) => {
        console.log(error)
        reject(error.response);
    })
})

export {
    getheadNurseInfoApi,
    getFollowDataApi,
    getMonthExecteApi,
    getNoticeApi,
    getFlanManageApi
}