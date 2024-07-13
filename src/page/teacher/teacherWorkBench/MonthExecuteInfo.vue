<!-- 教师-工作台-本月执行情况 -->
<template>
    <div class="executeStatistics">
        <!-- 数字化展示 -->
        <div class="digitization">
            <div class="title">本月交流情况</div>
            <div class="statistic">
                <a-row>
                    <a-col :span="12">
                        <a-statistic title="学习状态评价数" :value=statistic.complete />
                    </a-col>
                    <a-col :span="12">
                        <a-statistic title="学习状态未评价数" :value=statistic.nofollow />

                    </a-col>
                </a-row>
                <a-row> 
                    <a-col :span="12">
                        <a-statistic title="职业生涯指导数" :value=statistic.latenofollow />

                    </a-col>
                    <a-col :span="12">
                        <a-statistic title="职业生涯未指导数" :value=statistic.abnormal />
                    </a-col>
                </a-row>
            </div>
        </div>
        <!-- 图形展示 -->
        <div class="graphical" ref="chart"></div>
        <FullscreenOutlined class="fullscreen-icon" @click="jumpToExecute" />
    </div>
</template>

<script setup>
import {ref, onMounted, watchEffect} from "vue"
import * as echarts from 'echarts'
import { FullscreenOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { getMonthInfoApi } from '@/api/teacher/teacherWorkbench'
import { message } from 'ant-design-vue'

const router = useRouter()
// 数字化信息
const statistic = ref({
    complete: 0, //已批改数
    nofollow: 0, //未批改数
    latenofollow: 0, //逾期未批改数
    abnormal: 0, //批改异常
})
const loaded = ref(false) //数据是否加载完成
// 调用api获取本月执行情况
const getMonthInfo = () => {
//     getMonthInfoApi().then(res => {
//         if(res.data.code === 200){ 
//             statistic.value.complete = res.data.data.completionNumber
//             statistic.value.nofollow = res.data.data.noFollowedNumber
//             statistic.value.latenofollow = res.data.data.overdueNumber
//             statistic.value.abnormal = res.data.data.exceptionNumber
//             loaded.value = true; // 数据加载完成
//         }else{
//             message.error("获取失败！" + res.data.msg)
//         }
//     }).catch((err) => {
//       console.log(err)
//   })
            statistic.value.complete =112
            statistic.value.nofollow = 123
            statistic.value.latenofollow = 88
            statistic.value.abnormal = 134
            loaded.value = true; // 数据加载完成
}
// 加载环形图数据
const chart = ref(null)
const loadGraphData = () => {
    if(loaded.value){
        const myChart = echarts.init(chart.value)
        // 图形化信息
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '1%',
                left: 'center',
            },
            series: [{
                type: 'pie',
                radius: ['45%', '80%'],
                center: ['55%', '55%'], // 调整环形图在容器中的位置，第二个值越大，环形图越往下
                avoidLabelOverlap: false,
                label: {
                    show: false, //显示标签
                    position: 'center', // 标签显示在扇区外侧
                    formatter: '{b}: {c}', // 标签格式，{b}是name, {c}是value
                    fontSize: 15, // 字体大小
                    fontWeight: 'normal' // 字体粗细
                },
                labelLine: {
                    show: false, // 显示标签线
                    length: 8, // 标签线的长度
                    length2: 8, // 第二段标签线的长度
                    smooth: 0.2, // 标签线平滑度
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 15,
                        fontWeight: 'bold'
                    }
                },
                data: [
                    { value: statistic.value.complete, name: '学习状态评价数' },
                    { value: statistic.value.nofollow, name: '学习状态未评价数' },
                    { value: statistic.value.latenofollow, name: '生涯规划指导数' },
                    { value: statistic.value.abnormal, name: '未指导数' },
                ]
            }]
        }
        myChart.setOption(option)
    }
}

onMounted(() => {
    getMonthInfo();
    // watchEffect函数会在loaded的值发生变化时自动调用test函数，从而更新图表
    watchEffect(()=>{
        loadGraphData();
    })
})
// 跳转到执行情况页面
const jumpToExecute = () => {
    router.push({path: '/follow'})
}
</script>

<style lang="less" scoped>
.executeStatistics{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    box-shadow: 3px 3px 11px rgba(0, 0, 0, 0.2);
    position: relative;
    width: 100%;
    height: 100%;
    .digitization{
        flex: 3;
        display: flex;
        flex-direction: column;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        text-align: center; /* 文本水平居中 */
        padding-left: 15px;
        .title {
            font-size: 22px;
            font-family: "思源黑体";
            font-weight: bold;
            color: #033D32;
            margin-bottom: 15px;
        }
        .statistic{
            background-color: #EFEFEF;
            width: 17vw;
            height: 22vh;
            padding-top: 2vh;
            ::v-deep .ant-statistic{
                margin-left: 1vw;
                margin-bottom: 2vh;
            }
            ::v-deep .ant-statistic-title{
                font-size: 18px;
                font-family: "思源黑体";
                color: #033D32;
            }
            ::v-deep .ant-statistic-content {
                font-weight: bold;
                font-size: 20px;
                font-family: "思源黑体";
                color: #033D32;
            }
        }
    }
    .graphical{
        flex: 4;
        width: 100%;
        height: 100%;
        display: flex; /* 使用 Flexbox */
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        padding-top: 30px;
        // margin-top: 20px;
    }
    .fullscreen-icon {
        position: absolute; /* 绝对定位 */
        top: 10px; /* 距离顶部的距离 */
        right: 10px; /* 距离右侧的距离 */
        font-size: 24px; /* 图标大小，根据需要调整 */
        cursor: pointer; /* 鼠标移动到上面时显示手势 */
    }
}
</style>
@/api/teacher/teacherWorkbench