<!-- 工作台中的今日异常提醒 -->
<template>
    <div class="nowNotification">
        <div class="title">
            <AlertTwoTone two-tone-color="#D11212" />
            今日异常提醒
        </div>
        <div class="content">
            <!-- 通话异常 -->
            <div class="abnormalInfo">
                <div class="subTitle">通话异常</div>
                <div class="subContent" v-for="(item) in nowAbnormalInfo" :key="item.id" :value="item.id">
                    {{item.name}} - {{item.area}} - {{item.sex}} - {{item.age}}
                    <span :style="{color: '#D11212'}">{{item.type}}</span>
                </div>
            </div>
        </div>
        <FullscreenOutlined class="fullscreen-icon" />
    </div>
</template>

<script setup>
import {ref, reactive, onMounted, computed} from "vue"
import { AlertTwoTone, FullscreenOutlined } from '@ant-design/icons-vue'
import { getNoticeApi } from '@/api/head_nurse/headnurseWorkbench'
import { message } from 'ant-design-vue'

const nowAbnormalInfo = ref([])

// 调用api获取“今日异常提醒”
const getTodayNotice = (flag = true) => {
    getNoticeApi(flag).then(res => {
        if(res.data.code === 200){
            const leng = ref(null)
            if(res.data.data.rows.length<=6){
                leng.value = res.data.data.rows.length  //如果今日异常小于6条，则展示全部数据
            }else{
                leng.value = 6 //如果今日异常大于6条，则展示6条，即最多展示6条数据
            }
            for(let i=0; i < leng.value; i++) {
                nowAbnormalInfo.value.push(
                    {
                        id:res.data.data.rows[i].patientCode,
                        name:res.data.data.rows[i].patientName,
                        area:res.data.data.rows[i].cancerName,
                        sex:res.data.data.rows[i].gender,
                        age:res.data.data.rows[i].age,
                        type:res.data.data.rows[i].followUpSituation
                    }
                )
            }
        }else{
            message.error("获取失败！" + res.data.msg)
        }
    }).catch((err) => {
      console.log(err)
  })
}

onMounted(() => {
    getTodayNotice()
})

</script>

<style lang="less" scoped>
.nowNotification {
    box-shadow: 3px 3px 11px rgba(0, 0, 0, 0.2);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center; /* 垂直居中 */
    width: 100%;
    height: 100%;

    .title {
        height: 8%;
        font-size: 22px;
        font-family: "思源黑体";
        font-weight: bold;
        color: #033D32;
        margin-top: 8px;
        margin-left: 10px;
        align-self: flex-start; /* 添加这行代码，使得 .title 不居中 */
    }
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        width: 100%;
        // height: 92%;
        // background-color: aqua;
        .abnormalInfo {
            border: 1px dashed #999999;
            width: 90%;
            height: 35vh;
            margin-top: 10px;
            .subTitle {
                font-size: 20px;
                font-family: "思源黑体";
                font-weight: bold;
                margin-top: 7px;
                margin-bottom: 10px;
                padding-left: 15px;
            }
            .subContent {
                font-size: 18px;
                font-family: "思源黑体";
                margin-bottom: 10px;
                padding-left: 15px;
                display: flex;
                justify-content: space-between; /* 子元素分布在起始边和结束边 */
                align-items: center; /* 垂直居中对齐子元素 */
                width: 96%;
                height: 3vh;
            }
        }
    }
    .fullscreen-icon {
        position: absolute; /* 绝对定位 */
        top: 10px; /* 距离顶部的距离 */
        right: 10px; /* 距离右侧的距离 */
        font-size: 22px; /* 图标大小，根据需要调整 */
        cursor: pointer; /* 鼠标移动到上面时显示手势 */
    }
}
</style>
