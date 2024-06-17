import axios from "axios";
// 引入全局配置
import { config } from "@/config/config";

// axios.interceptors.request.use(function (config) {
//     console.log('API URL:', config.url); // 打印接口地址
//     console.log('Request Data:', config.data); // 打印请求数据
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

// 登录验证
const loginApi = (loginForm) => new Promise((resolve, reject) => {
    let data = {
        name: loginForm.username,
        password: loginForm.password,
        // role: loginForm.role
    }
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

export {
    loginApi,
}