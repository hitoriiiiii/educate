<!--  教师-工作台-消息通知 -->
<template>
    <div class="nowNotification">
        <div class="title">
            <div>
                <SoundOutlined two-tone-color="#D11212" />
                消息通知
            </div>
            <div>
                <FullscreenOutlined class="fullscreen-icon" @click="jumpToNotifications"/>
            </div>
        </div>
        <div class="content">
            <!-- 逾期未批改 -->
            <div class="abnormalInfo lateNoFollow">
                <div class="subTitle">逾期未批改</div>
                <div class="subContent" v-for="(item) in lateNoFollow" :key="item.id" :value="item.id">
                    {{item.id}} - {{item.name}} - {{item.sickness}}
                    <span :style="{color: '#D11212'}">逾期未批改</span>
                </div>
            </div>
            <!-- 批改提醒 -->
            <div class="abnormalInfo followNotice">
                <div class="subTitle">批改提醒</div>
                <div class="subContent">
                    <span>临期批改数(距截止时间＜3天)</span>
                    <span class="followNoticeDay">{{ followNotice }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import { SoundOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import { getLateFollowApi, getFollowNoticeApi } from '@/api/nurse/nurseWorkbench'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

// 跳转到消息通知页面
const router = useRouter()
const jumpToNotifications = () => {
    router.push({path: '/notifications'})
}

const lateNoFollow = ref([])  // 本周逾期未批改的前三条信息
const followNotice = ref(null)  // 本周临期批改数
// 调用接口，获取“逾期未批改信息”
const getLateNoFollow = () => {
//     getLateFollowApi().then(res => {
//         if(res.data.code === 200){
//             console.log(res.data.data)
//             for(let i=0; i<res.data.data.rows.length; i++) {
//                 lateNoFollow.value.push(
//                     {
//                         id:res.data.data.rows[i].id,
//                         name:res.data.data.rows[i].patientName,
//                         sickness:res.data.data.rows[i].cancerName,
//                     }
//                 )
//             }
//         }else{
//             message.error("获取失败！" + res.data.data.msg)
//         }
//     }).catch((err) => {
//       console.log(err)
//   })
        for(let i=0; i<3; i++) {
                        lateNoFollow.value.push(
                            {
                                id:i,
                                name:"mynameis "+i,
                                sickness:"chinese",
                            }
                        )
                    }
}
// 调用接口，获取“临期批改数量”
const getFollowNotice = () => {
    followNotice.value = 6
//      getFollowNoticeApi().then(res => {
//         if(res.data.code === 200){
//             console.log(res.data.data)
//             followNotice.value = res.data.data.total
//         }else{
//             message.error("获取失败！" + res.data.data.msg)
//         }
//     }).catch((err) => {
//       console.log(err)
//   })

}
onMounted(() => {
    getLateNoFollow()
    getFollowNotice()
})
</script>

<style lang="less" scoped>
.nowNotification {
    box-shadow: 3px 3px 11px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    .title {
        font-size: 22px;
        font-family: "思源黑体";
        font-weight: bold;
        color: #033D32;
        padding-top: 8px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        justify-content: space-between;
    }
    .content {
        align-items: center; /* 垂直居中 */
        width:100%;
        height: 100%;
        position: relative;
        .abnormalInfo {
            margin: 5px 10px 5px 10px;
            border: 1px dashed #999999;
            .subTitle {
                font-size: 20px;
                font-family: "思源黑体";
                font-weight: bold;
                margin-top: 7px;
                margin-bottom: 7px;
                padding-left: 15px;
            }
            .subContent {
                font-size: 18px;
                // font-family: "思源黑体";
                margin-bottom: 5px;
                padding-left: 15px;
                display: flex;
                justify-content: space-between; /* 子元素分布在起始边和结束边 */
                align-items: center; /* 垂直居中对齐子元素 */
                width: 96%;
                height: 3vh;
                .followNoticeDay {
                    color: #5470C6;
                }
            }
        }
        .lateNoFollow {
            height: 48%;
            position: absolute;
            top: 5px;
            left: 5px;
            right: 5px;
        }
        .followNotice {
            height: 26%;
            position: absolute;
            bottom: 40px;
            left: 5px;
            right: 5px
        }
    }
}
</style>
