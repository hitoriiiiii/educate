<!-- 护士长--计划管理--随访进程管理标题组件 -->
<template>
    <div class="progressTitle">
        <div class="totalProcess">
            <!-- xx癌随访计划标题 -->
            <div class="planTitle">
                <div class="diseaseTitle">{{progressTitle.diseaseTitle}}</div>
                <div class="status">{{progressTitle.status}}</div>
                <div>{{progressTitle.nowDate}}</div>
            </div>
            <a-statistic class="allFollowPatients" title="应访患者总数" :value="progressTitle.allFollowPatients" />
        </div>
        <a-divider type="vertical" style="height: 60px; background-color: #BBBBBB" />
        <div class="digitalInfo">
            <a-row :gutter="20">
                <a-col :span="6" v-for="item in progressTitle.digitalInfo" :key="item.key">
                    <a-statistic :title="item.title" :value="item.value" />
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue"

const progressTitle = reactive({ // 随访进程标题信息
    diseaseTitle: '', // 疾病名称
    status: '', // 进程总状态
    nowDate: '', // 当前时间
    allFollowPatients: 72, // 应访患者总数
    digitalInfo: [
        { title: '随访中患者人数', key: 'following', value: 54 },
        { title: '随访异常人数', key: 'allFollowPatients', value: 4 },
        { title: '终止随访人数', key: 'end', value: 4 },
        { title: '随访完成人数', key: 'finished', value: 4 },
    ], 
})

onMounted(() => {
    getTime()
    getprogressTitleInfo()
})
// 获取当前时间
const getTime = () => {
    let getTime = new Date().getTime() //获取当前时间时间戳
    let time = new Date(getTime)  //创建一个日期对象
    let year = time.getFullYear() // 年
    let month = (time.getMonth() + 1).toString().padStart(2, '0') // 月
    let date = time.getDate().toString().padStart(2, '0') // 日
    let hour = time.getHours().toString().padStart(2, '0') // 时
    let minute = time.getMinutes().toString().padStart(2, '0') // 分
    let second = time.getSeconds().toString().padStart(2, '0') // 秒
    progressTitle.nowDate = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
}
// 获取随访进程标题信息
const getprogressTitleInfo = () => {
    progressTitle.diseaseTitle = "鼻咽癌随访计划"
    progressTitle.status = "进行中"
    // progressTitle.digitalInfo.forEach((item, index) => {
    //     // console.log(item, index)
    //     // 后端传回数据,判断与item.key对应的数据,并把后端传回的value赋值给item.value
    // })
}
</script>

<style lang="less" scoped>
.progressTitle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3vh;
    padding-top: 1vh;
    box-shadow: 0 3px 11px rgba(0, 0, 0, 0.2);

    .totalProcess {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: center;

        .planTitle {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 2;
            padding: 1vh 0;
            .diseaseTitle {
                font-size: 22px;
                // color: #033D32;
                font-family: "思源黑体";
                // font-weight: bold;
            }
            .status {
                background-color: #388B7C;
                color: #fff;
                font-size: 16px;
                width: 70px;
                height: 23px;
                border-radius: 8px; /* 设置边框圆弧半径为 10px */
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 1vh 0;
            }
        }
        .allFollowPatients {
            text-align: center;
            margin-right: 1vw;
            flex: 1;
        }
    }
    .digitalInfo {
        flex: 2;
        text-align: center; /* 文本水平居中 */
    }
}
::v-deep .ant-statistic-title{
    font-size: 19px;
    font-family: "思源黑体";
    // color: #033D32;
    color: black;
    // font-weight: bold;
}
::v-deep .ant-statistic-content {
    font-size: 20px;
    font-family: "思源黑体";
    color: #033D32;
}
</style>
