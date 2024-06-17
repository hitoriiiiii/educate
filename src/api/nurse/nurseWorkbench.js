import axios from "axios";
// 引入全局配置
import { config } from "@/config/config";

// 护士个人信息查询
const getNurseInfoApi = () => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    axios({
        method: "get",
        url: '/api/nurse/detail',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
        // data: JSON.stringify(data)
    }).then((response) => {
        resolve(response)
    }).catch((error) => {
        reject(error.response);
    })
})

// 获取本周随访任务（护士主页）
const getTodayInfoApi = () => new Promise((resolve, reject) => {   
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

// 获取本月执行情况（护士主页）
const getMonthInfoApi = () => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    axios({
        method: "post",
        url: '/api/select/statisticians',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
        data: JSON.stringify({})
    }).then((response) => {
        resolve(response)
    }).catch((error) => {
        console.log(error)
        reject(error.response);
    })
})

// 获取逾期未随访（护士主页）
const getLateFollowApi = (startDate,endDate, keyWord) => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    let data = {
        startdate:startDate,
        enddate:endDate
    }
    axios({
        method: "post",
        url: `/api/select/overdueFollowTask?keyWord=${keyWord}`,
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

// 获取临期随访数（护士主页）
const getFollowNoticeApi = (startDate,endDate, keyWord) => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    let data = {
        startdate:startDate,
        enddate:endDate
    }
    axios({
        method: "post",
        url: `/api/select/clinicalFollowTask?keyWord=${keyWord}`,
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

// 获取随访列表
const getFollowListApi = (keyWord, status) => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    let data = {
        keyword: keyWord,
        status: status
    }
    axios({
        method: "post",
        url: '/api/select/allFollowTask',
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

export {
    getNurseInfoApi,
    getTodayInfoApi,
    getMonthInfoApi,
    getLateFollowApi,
    getFollowNoticeApi,
    getFollowListApi,
}