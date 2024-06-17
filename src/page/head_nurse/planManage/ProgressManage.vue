<!-- 护士长--计划管理--随访进程管理 -->
<template>
    <div class="progressManageLayout">
        <!-- 随访进程标题信息 -->
         <Title></Title>
        <!-- 随访进程检索信息 -->
        <div class="searchBox">
            <!-- 随访进程的状态按钮 -->
            <div class="radioButtons">
                <a-radio-group v-model:value="searchData.checkedButton" size="large">
                    <a-radio-button v-for="item in radioButtons" :key="item.value" :value="item.value" border>
                        <component :is="item.icon" />
                        <span>&nbsp;&nbsp;{{item.text}}</span>
                    </a-radio-button>
                </a-radio-group>
            </div>
            <div class="searchContent">
                <!-- 随访日期选择 -->
                <!-- <div class="date">
                    日期：
                    <a-range-picker class="range" v-model:value="searchData.dateRange" />
                    <a-radio-group v-model:value="searchData.dateRadio">
                        <a-radio :value="1">日</a-radio>
                        <a-radio :value="2">周</a-radio>
                        <a-radio :value="3">月</a-radio>
                        <a-radio :value="4">年</a-radio>
                    </a-radio-group>
                </div> -->
                <div class="keywordsSearch">
                    关键字：<a-input v-model:value="searchData.keywords" placeholder="患者姓名/患者ID/护士姓名" allowClear :style="{width: '400px'}"></a-input>
                </div>
                <div class="searchBtn">
                    <a-button type="primary" @click="getProgressList">查询</a-button>
                    <a-button>导出</a-button>
                </div>
            </div>
        </div>
        <!-- 随访进程情况表格 -->
        <div class="progressTable">
            <a-table 
                :columns="columns"
                :data-source="dataSource"
                :rowKey="record => record.ID"
                :scroll="{ y: '35vh' }"
                :pagination="pagination"
                :bordered="true"
                @change="handleTableChange"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="['first', 'second', 'third', 'fourth', 'fifth'].includes(column.dataIndex)">
                        <!-- 随访完成 -->
                        <template v-if="record[column.dataIndex] === 0">
                            <CheckCircleTwoTone :style="{fontSize: '18px'}" two-tone-color="#52c41a" />
                        </template>
                        <!-- 随访异常 -->
                        <template v-else-if="record[column.dataIndex] === 1">
                            <ExclamationCircleTwoTone :style="{fontSize: '18px'}" two-tone-color="#ff4d4f" />
                        </template>
                        <!-- 逾期未随访 -->
                        <template v-else-if="record[column.dataIndex] === 2">
                            <BellTwoTone :style="{fontSize: '18px'}" two-tone-color="#faad14" />
                        </template>
                        <!-- 终止随访 -->
                        <template v-else-if="record[column.dataIndex] === 3">
                            <PauseCircleTwoTone :style="{fontSize: '18px'}" two-tone-color="#8B8B8C" />
                        </template>
                    </template>
                    <template v-else-if="column.dataIndex === 'action'">
                        <a-button type="text" @click="jumpToPatientFollow" :style="{color: '#388B7C'}">查看</a-button>
                    </template>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue"
import Title from '@/components/head_nurse/ProgressManageTitle.vue'
import { ClockCircleOutlined, BellOutlined, ExclamationCircleOutlined, PauseCircleOutlined, CheckCircleOutlined, CheckCircleTwoTone, ExclamationCircleTwoTone, BellTwoTone, PauseCircleTwoTone } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const radioButtons = reactive([   // 随访的按钮状态信息
    { icon: ClockCircleOutlined, value: 'following', text: '正在随访' },
    { icon: BellOutlined, value: 'lateFollow', text: '逾期未随访' },
    { icon: ExclamationCircleOutlined, value: 'abnormal', text: '随访异常' },
    { icon: PauseCircleOutlined, value: 'end', text: '终止随访' },
    { icon: CheckCircleOutlined, value: 'finished', text: '随访完成' },
])
const searchData = reactive({  // 高级检索信息
    checkedButton: 'following',  // 要查询的随访状态
    dateRange: null, //日期选择框
    dateRadio: null, //日or月or周or年
    keywords: '', // 根据患者姓名or护士姓名or患者ID关键字查询
})
const pagination = reactive({  // 表格页码相关设置
    pageSize: 5, //每页最多条目数
    current: 1, //当前页码
    total: 6, //总条目数
    showTotal: (total, range) => `总共 ${total} 条数据`, // 在这里定义显示总数据量的格式
})
const columns = [
    {
        title: 'ID',
        dataIndex: 'ID',
        align: 'center',
        width: '11%',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        align: 'center',
        width: '18%',
    },
    {
        title: '随访人员',
        dataIndex: 'nurseName',
        align: 'center',
        width: '18%',
    },
    // {
    //     title: '上次随访',
    //     dataIndex: 'lastfollowTime',
    //     align: 'center',
    //     width: '10%',
    // },
    {
        title: '第一周期',
        dataIndex: 'first',
        align: 'center',
        width: '8%',
    },
    {
        title: '第二周期',
        dataIndex: 'second',
        align: 'center',
        width: '8%',
    },
    {
        title: '第三周期',
        dataIndex: 'third',
        align: 'center',
        width: '8%',
    },
    {
        title: '第四周期',
        dataIndex: 'fourth',
        align: 'center',
        width: '8%',
    },
    {
        title: '第五周期',
        dataIndex: 'fifth',
        align: 'center',
        width: '8%',
    },
    {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '8%',
    },
]
const dataSource = ref([])


onMounted(() => {
    getProgressList()
})
// 获取全部随访进程情况
const getProgressList = () => {
    // 假设随访状态：0为随访完成，1为随访异常，2为逾期未随访，3为终止随访
    dataSource.value = [
        {
            ID: 'P0135230101',
            name: '阿不都沙拉木·阿不都热西提',
            nurseName: '阿不都沙拉木·阿不都热西提',
            first: 0,
            second: 1,
            third: 0,
            fourth: '',
            fifth: '',
        },
        {
            ID: 'P0135230102',
            name: '阿不都沙拉木·阿不都热西提',
            nurseName: '阿不都沙拉木·阿不都热西提',
            first: 0,
            second: 0,
            third: '',
            fourth: '',
            fifth: '',
        },
        {
            ID: 'P0135230103',
            name: '阿不都沙拉木·阿不都热西提',
            nurseName: '阿不都沙拉木·阿不都热西提',
            first: 0,
            second: 0,
            third: 2,
            fourth: '',
            fifth: '',
        },
        {
            ID: 'P0135230104',
            name: '阿不都沙拉木·阿不都热西提',
            nurseName: '阿不都沙拉木·阿不都热西提',
            first: 0,
            second: 3,
            third: '',
            fourth: '',
            fifth: '',
        },
        {
            ID: 'P0135230105',
            name: '阿不都沙拉木·阿不都热西提',
            nurseName: '阿不都沙拉木·阿不都热西提',
            first: 0,
            second: 0,
            third: 0,
            fourth: '',
            fifth: '',
        },
        {
            ID: 'P0135230106',
            name: '阿不都沙拉木·阿不都热西提',
            nurseName: '阿不都沙拉木·阿不都热西提',
            first: 0,
            second: 0,
            third: 0,
            fourth: '',
            fifth: '',
        },
    ]
}
// 点击"查看"按钮显示该患者的详细随访信息
const jumpToPatientFollow = () => {
    router.push({
        path: '/patientFollow'
    })
    
}
// 处理翻页
const handleTableChange = (e) => {
    pagination.current = Number(e.current)
    getProgressList()
}
</script>

<style lang="less" scoped>
.progressManageLayout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 新增的样式 */
    .searchBox {
        font-size: 16px;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        
        .searchContent {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 96%;
            margin: 3vh 0;
            .date {
                .range {
                    margin-right: 1vw;
                }
            }
            // .keywordsSearch {
            //     margin-left: 2vw;
            // }
            .searchBtn {
                margin-left: 2vw;
                display: flex;
                gap: 20px; /* 设置按钮之间的间距 */
            }
        }
    }
    .progressTable {
        // margin-top: 20px;
        width: 96%;
        display: flex;
        justify-content: center;
        min-height: 35vh;
        // background-color: aqua;
    }
}
::v-deep .ant-table-thead > tr > th  {
    background: #D3DED8 !important;
}
</style>
