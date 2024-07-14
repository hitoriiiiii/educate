import axios from "axios";
// 引入全局配置
import { config } from "@/config/config";

// 教师个人信息查询
const getTeacherInfoApi = () => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    let uid = localStorage.getItem(config.userUid)
    let url = config.url + 'api/' + uid + '?uid=' + uid +'&token='+token
    console.log(url)
    // http://127.0.0.1:42878/api/
    // {{uid}}
    // ?uid=601
    // &token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlYWNoZXJyIiwidWlkIjo2MDEsImV4cCI6MTcyMDk3NjE4MCwibmJmIjoxNzIwODg4OTgwfQ.agCYD25q977F_K1n3ult9lSwXMc_sVr-tXLm7wLZunY
    axios({
        method: "get",
        url:url,
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

// 获取列表（教师主页）
const getTodayInfoApi = () => new Promise((resolve, reject) => {   
    let token = localStorage.getItem(config.userToken)
    axios({
        method: "get",
        url: config.url + 'select/weekFollowUpTask',
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

// 执行情况（教师主页）
const getMonthInfoApi = () => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    axios({
        method: "post",
        url: config.url +  'select/statisticians',
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



// 获取评价信息
const getFollowNoticeApi = (startDate,endDate, keyWord) => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    let data = {
        startdate:startDate,
        enddate:endDate
    }
    axios({
        method: "post",
        url: config.url + `select/clinicalFollowTask?keyWord=${keyWord}`,
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

// 获取学生列表
const getFollowListApi = (classId) => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    let uid = localStorage.getItem(config.userUid)
    let data = classId
    // http://127.0.0.1:42878/api/class/
    // {{uid}}
    // /students?class_id=
    // 1101
    // &token=
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlYWNoZXIiLCJ1aWQiOjQwNywiZXhwIjoxNzIwNzU0MjM4LCJuYmYiOjE3MjA2NjcwMzh9.ifNldh51a3QE5CYrKiGCQ_L42CM0PCdz3edWgiMeEDM
    // &page=0
    let url = config.url + 'api/class/' + uid + '/students?class_id='+ data + '&token=' + token;
    console.log(url)
    axios({
        method: "get",
        url: url,
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
    }).then((response) => {
        resolve(response)
    }).catch((error) => {
        console.log(error)
        reject(error.response);
    })
})

export {
    getTeacherInfoApi,
    getTodayInfoApi,
    getMonthInfoApi,
    getFollowNoticeApi,
    getFollowListApi,
}