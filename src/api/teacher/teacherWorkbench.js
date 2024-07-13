import axios from "axios";
// 引入全局配置
import { config } from "@/config/config";

// 教师个人信息查询
const getTeacherInfoApi = () => new Promise((resolve, reject) => {
    let token = localStorage.getItem(config.userToken)
    axios({
        method: "get",
        url: '/api/teacher/detail',
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

// 获取本周随访任务（教师主页）
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

// 执行情况（教师主页）
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

// 获取逾期未随访（教师主页）
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

// 获取临期随访数（教师主页）
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
    let url = 'api/api/class/' + uid + '/students?class_id='+ data + '&token=' + token;
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
    getLateFollowApi,
    getFollowNoticeApi,
    getFollowListApi,
}