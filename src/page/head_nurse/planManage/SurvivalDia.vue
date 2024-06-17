<!-- 护士长--计划管理--生存分析图 -->
<template>
    <div class="survivalDiaLayout">
        <a-spin :spinning="spinning">
            <div class="graphical" ref="chart"></div>
        </a-spin>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue"
import * as echarts from 'echarts'

const chart = ref(null)
const spinning = ref(true)
const dataSource = reactive({
    survivalData: [], // 生存患者数据
    deadData: [], // 死亡患者数据
    totalData: [], // 患者总数数据
})
onMounted(() => {
    getSurvivalDia()
})
// 获取要展示信息的数据
const getSurvivalDia = () => {
    // spinning.value = true
    // 调用api，获取生存患者、死亡患者和患者总数的数据，调用成功后再创建图形化信息
    spinning.value = false
    dataSource.survivalData = [150, 140, 230, 100, 130]
    dataSource.deadData = [32, 21, 40, 76, 32]
    dataSource.totalData = [182, 161, 270, 176, 162]
    setGrapConfigInfo()
}
// 配置要展示信息的图形信息
const setGrapConfigInfo = () => {
    const myChart = echarts.init(chart.value)
    // 图形化信息
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: { color: '#999' }
            }
        },
        toolbox: {
            feature: {
                dataView: { show: false, readOnly: true },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['生存患者', '死亡患者', '患者总数']
        },
        xAxis: [
            {
                type: 'category',
                data: ['第一周期', '第二周期', '第三周期', '第四周期', '第五周期'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '人数',
                min: 0,
                max: 300,
                interval: 50,
                axisLabel: { formatter: '{value} 人' }
            },
        ],
        series: [
            {
                name: '生存患者',
                type: 'bar',
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{c} 人'
                },
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 人';
                    }
                },
                data: dataSource.survivalData
            },
            {
                name: '死亡患者',
                type: 'bar',
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{c} 人'
                },
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 人';
                    }
                },
                data: dataSource.deadData
            },
            {
                name: '患者总数',
                type: 'line',
                // yAxisIndex: 1,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c} 人'
                },
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 人';
                    }
                },
                data: dataSource.totalData
            }
        ]
    }
    myChart.setOption(option)
}
</script>

<style lang="less" scoped>
.survivalDiaLayout {
    width: 100%;
    height: 100%;
    .graphical{
        width: 98%;
        height: 84vh;
        padding-top: 4vh;
    }
}
</style>
