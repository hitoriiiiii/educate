import axios from "axios";
// 引入全局配置
import { config } from "@/config/config";
// 登录验证
const loginApi = (loginForm) => new Promise((resolve, reject) => {
    let data = {
        name: loginForm.username,
        password: loginForm.password,
    }
    // http://127.0.0.1:42878/api/login
    console.log(JSON.stringify(data))
    axios({
        method: "post",
        url: 'api/api/login',
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data)
    }).then((response) => {
        resolve(response)
    }).catch((error) => {
        reject(error.response);
    })
})

const registerApi = (account) => new Promise((resolve, reject) => {
    let data = account
    console.log(JSON.stringify(data))
    // http://127.0.0.1:42878/api/register
    axios({
        method: "post",
        url: 'api/api/register',
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data)
    }).then((response) => {
        resolve(response)
    }).catch((error) => {
        reject(error.response);
    })
})
export {
    loginApi,registerApi
}