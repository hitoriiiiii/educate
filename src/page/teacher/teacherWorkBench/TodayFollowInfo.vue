<!-- 教师-工作台-今日批改信息 -->
<template>
    <div class="nowFollowInfo">
        <div class="person">你好<br>xxx教师</div>
        <div class="card-container">
            <a-card class="card" :title=title :bordered="false">
                <div class="content">
                    <span class="weekFollow" style="margin-right: 30px;">咨询人数</span>
                    <span class="weekFollow">{{ completionNumber }} / {{ TotalFollow }}</span>
                </div>
            </a-card>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getTodayInfoApi } from '@/api/teacher/teacherWorkbench'
import { message } from 'ant-design-vue'

// 获取当前日期
const date = new Date().toLocaleDateString()
const title = ref(date + '回答情况')
const completionNumber = ref()
const TotalFollow = ref()
// 获取批改进度
const getTodayInfo = () => {
//   getTodayInfoApi().then(res => {
//     if(res.data.code === 200){
//         TotalFollow.value = res.data.data.total
//         completionNumber.value = res.data.data.completionNumber
//     }else{
//       message.error("获取失败！" + res.data.data.msg)
//     }
//     }).catch((err) => {
//       console.log(err)
//   })
TotalFollow.value = 600
completionNumber.value = 200
}
onMounted(() => {
    getTodayInfo()
})
</script>

<style lang="less" scoped>
.nowFollowInfo{
    background: linear-gradient(to bottom, #388B7C 20%, #B2DFDB 80%);
    box-shadow: 3px 3px 11px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    padding: 10px;
    .person {
        font-size: 22px;
        font-family: "思源黑体";
        color: #FFFFFF;
        margin-bottom: 10px;
    }
    .card-container {
        display: flex;
        justify-content: center;
        align-items: center;
        
        .card {
            background-color: rgba(239, 239, 239, 0.5);
            width: 20vw;
            height: 22vh;
            border-radius: 4px;
        
            .content {
                width: 100%;
                height: 100%;
                margin-top: 10px;
                display: flex;
                justify-content: center;
                .weekFollow {
                    font-size: 22px;
                    font-family: "思源黑体";
                    text-align: center; /* 水平居中 */
                    // margin-top: 30px
                }
            }
        }
    }
    
}
</style>
@/api/teacher/teacherWorkbench