import axios from "axios";
// 引入全局配置
import { config } from "@/config/config";

//上传结果
const executeApi = (dialogue) => new Promise((resolve, reject) =>{
    let data =  dialogue
    
    //  http://127.0.0.1:42878/api/dialog/
    // 601
    // /post_dialogues?
    // token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlYWNoZXJyIiwidWlkIjo2MDEsImV4cCI6MTcyMDY2MzEyOSwibmJmIjoxNzIwNTc1OTI5fQ.ekeAnLEJCctpRjnoYdy_68v1GcPRW87R6He3yBG9b0k
    // &type=0&teacher_id=601
    const uid = localStorage.getItem(config.userUid)
    let token = localStorage.getItem(config.userToken)
    // let url='api/api/dialog/{{uid}}/post_dialogues?token={{token}}&type=0&teacher_id={{uid}}'
    let url = config.url + 'api/dialog/' + uid + '/post_dialogues?token=' + token + '&type=0&teacher_id=' + uid;
    console.log(url)
    console.log(data)
    axios({
        method:'post',
        url:url,
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
//上传评价
const postApi = (dialogue,id) => new Promise((resolve, reject) =>{
    let data =  dialogue
    // http://127.0.0.1:42878/api/dialog/
    // {{uid}}
    // /post_dialogues?token=
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlYWNoZXJyIiwidWlkIjo2MDEsImV4cCI6MTcyMDc3MzcxNSwibmJmIjoxNzIwNjg2NTE1fQ._KKBG8yIGiYsd478TDcKqMEhZTL4w-WDQJ2VcwJyLmk
    // &type=1
    // &teacher_id=601
    // &student_id=408
    const uid = localStorage.getItem(config.userUid)
    let token = localStorage.getItem(config.userToken)
    // let url = 'api/api/dialog/' + uid + '/post_dialogues?token=' + token + '&type=0&teacher_id=' + uid;
    // let url='api/api/dialog/{{uid}}/post_dialogues?token={{token}}&type=0&teacher_id={{uid}}'
    let url = config.url + 'api/dialog/' + uid + '/post_dialogues?token=' + token + '&type=1&teacher_id=' + uid +'&student_id=' + id;
    console.log(url)
    console.log(data)
    axios({
        method:'post',
        url:url,
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
const poscApi = (dialogue,id) => new Promise((resolve, reject) =>{
    let data =  dialogue
    // http://127.0.0.1:42878/api/dialog/
    // {{uid}}
    // /post_dialogues?token=
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlYWNoZXJyIiwidWlkIjo2MDEsImV4cCI6MTcyMDc3MzcxNSwibmJmIjoxNzIwNjg2NTE1fQ._KKBG8yIGiYsd478TDcKqMEhZTL4w-WDQJ2VcwJyLmk
    // &type=1
    // &teacher_id=601
    // &student_id=408
    const uid = localStorage.getItem(config.userUid)
    let token = localStorage.getItem(config.userToken)
    // let url = 'api/api/dialog/' + uid + '/post_dialogues?token=' + token + '&type=0&teacher_id=' + uid;
    // let url='api/api/dialog/{{uid}}/post_dialogues?token={{token}}&type=0&teacher_id={{uid}}'
    let url = config.url +  'api/dialog/' + uid + '/post_dialogues?token=' + token + '&type=2&teacher_id=' + uid +'&student_id=' + id;
    console.log(url)
    console.log(data)
    axios({
        method:'post',
        url:url,
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


//获取历史详情
const detailApi = (historyindex) => new Promise((resolve, reject) =>{
    let index =  historyindex
    // http://127.0.0.1:42878/api/dialog/
    // 601
    // /get_dialogue_detial?token=
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlYWNoZXJyIiwidWlkIjo2MDEsImV4cCI6MTcyMDY2MzEyOSwibmJmIjoxNzIwNTc1OTI5fQ.ekeAnLEJCctpRjnoYdy_68v1GcPRW87R6He3yBG9b0k
    // &dialogue_id=1501
    let uid = localStorage.getItem(config.userUid)
    let token = localStorage.getItem(config.userToken)
    let url = config.url +  'api/dialog/' + uid + '/get_dialogue_detial?token=' + token + '&dialogue_id=' + index;
    // let url = 'api/api/dialog/' + uid + '/post_dialogues?token=' + token + '&type=0&teacher_id=' + uid;
    console.log(url)
    axios({
        method:'get',
        url:url,
        headers:{
            "Content-Type": "application/json",
            "token":token
        },
    }).then((response)=>{
        resolve(response)
    }).catch((error)=>{
        reject(error.response)
    })
})

//历史数据
const historyApi = () => new Promise((resolve, reject) =>{
    // let data =  dialogue
    const uid = localStorage.getItem(config.userUid)
    let token = localStorage.getItem(config.userToken)
    // http://127.0.0.1:42878/api/dialog/
    // 601
    // /get_dialogues?token=
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlYWNoZXJyIiwidWlkIjo2MDEsImV4cCI6MTcyMDY2MzEyOSwibmJmIjoxNzIwNTc1OTI5fQ.ekeAnLEJCctpRjnoYdy_68v1GcPRW87R6He3yBG9b0k
    // &student_id=601
    // &type=0
    let url = config.url +  'api/dialog/' + uid + '/get_dialogues?token=' + token +'&student_id='+ uid + '&type=0';
    // console.log(uid,token)
    axios({
        method:'get',
        url:url,
        headers:{
            "Content-Type": "application/json",
            "token":token
        },
    }).then((response)=>{
        resolve(response)
    }).catch((error)=>{
        reject(error.response)
    })
})
export{
    executeApi,
    historyApi,
    detailApi,
    postApi
}