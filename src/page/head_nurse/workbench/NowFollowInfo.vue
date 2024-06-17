<!-- 工作台中的今日随访信息 -->
<template>
    <div class="nowFollowInfo">
        <div class="person">你好<br>xxx护士长</div>
        <div class="card-container">
            <a-card class="card" :title=title :bordered="false">
                <div class="content">
                    <div class="newFollow">新增待随访<br>32</div>
                    <div class="finishedFollow">已完成随访<br>16</div>
                </div>
            </a-card>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue"
// 获取当前日期
const date = new Date().toLocaleDateString()
const title = ref(date + ' 随访数据')
</script>

<style lang="less" scoped>
.nowFollowInfo{
    background: linear-gradient(to bottom, #388B7C 20%, #B2DFDB 80%);
    box-shadow: 3px 3px 11px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    .person {
        font-size: 22px;
        font-family: "思源黑体";
        color: #FFFFFF;
        margin: 10px;
    }
    .card-container {
        margin-top: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        
        .card {
            background-color: rgba(239, 239, 239, 0.5);
            width: 20vw;
            height: 22vh;
            border-radius: 4px;
        
            .content {
                display: flex;
                justify-content: center; /* 水平居中 */
                align-items: center; /* 垂直居中 */
                width: 100%;
                height: 100%;
                .newFollow {
                    font-size: 22px;
                    font-family: "思源黑体";
                    text-align: center; /* 水平居中 */
                    margin-right: 1vw;
                }
                .finishedFollow {
                    font-size: 22px;
                    font-family: "思源黑体";
                    text-align: center; /* 水平居中 */
                }
            }
        }
    }
    
}
</style>
