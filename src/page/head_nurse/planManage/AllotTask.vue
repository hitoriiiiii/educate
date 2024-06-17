<!-- 护士长--计划管理--随访任务分配 -->
<template>
    <div class="allotTaskLayout">
        <!-- 顶部检索框 -->
        <div class="searchBox">
            <div class="searchContent">
                <div class="date">
                    截止日期：
                    <a-date-picker v-model:value="searchData.dateRange" />
                </div>
                <div class="nameSearch">
                    姓名：<a-input v-model:value="searchData.name" placeholder="请输入姓名" allowClear :style="{width: '240px'}"></a-input>
                </div>
                <a-button type="primary" @click="getAllotTaskList">查询</a-button>
            </div>
            <a-button class="allotBtn" type="primary" @click="openAllotSomeModal">批量分配</a-button>
            <!-- 批量分配的modal组件 -->
            <a-modal v-model:open="modalInfo.allotSomeModal" @ok="handleAllot" @cancel="handleCancel" style="width:500px">
                <div class="distributeNurseTitle">请为患者分配随访护士</div>
                <div class="distributeNurseSelect">
                    <a-select
                        v-model:value="allotInfo.nureseId"
                        style="width:200px"
                        allowClear
                    >   
                        <a-select-option v-for="(item) in nurseList" :key="item.nureseId" :value="item.nurseId">
                            {{item.nurseName}}---已分配{{item.num}}人
                        </a-select-option>
                    </a-select>
                </div>
            </a-modal>
        </div>
        <!-- 随访任务分配情况表格 -->
        <div class="allotTaskTable">
            <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                :columns="columns"
                :data-source="dataSource"
                :rowKey="record => record.ID"
                :scroll="{ y: '57vh' }"
                :pagination="pagination"
                :bordered="true"
                @change="handleTableChange"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'action'">
                        <a-button type="primary" @click="openAllotOneModal(record.ID)" :disabled="isDisabled">分配</a-button>
                        <a-button class="viewBtn" @click="handlePatientShow(true, record.ID)">查看</a-button>
                    </template>
                </template>
            </a-table>
            <!-- 单个患者分配的modal组件 -->
            <a-modal v-model:open="modalInfo.allotOneModal" @ok="handleAllot" @cancel="handleCancel" style="width:500px">
                <div class="distributeNurseTitle">请为患者分配随访护士</div>
                <div class="distributeNurseSelect">
                    <a-select
                        v-model:value="allotInfo.nureseId"
                        style="width:200px"
                        allowClear
                    >   
                        <a-select-option v-for="(item) in nurseList" :key="item.nureseId" :value="item.nurseId">
                            {{item.nurseName}}---已分配{{item.num}}人
                        </a-select-option>
                    </a-select>
                </div>
            </a-modal>
            <!-- 某位患者的病历图片 -->
            <a-image
                :width="200"
                :style="{ display: 'none' }"
                :preview="{
                    visible: caseInfo.caseVisible,
                    onVisibleChange: handlePatientShow,
                }"
                :src="caseInfo.caseUrl"
            />
        </div>
    </div>  
</template>

<script setup>
import {ref, reactive, onMounted, watch} from "vue"
import { message } from 'ant-design-vue'
import caseImageUrl from '@/assets/caseImage.jpg'

const nurseList = ref([]) // 分配护士的名单列表
const modalInfo = reactive({ //两个分配modal配置
    allotOneModal: false, //单个患者分配的modal状态
    allotSomeModal: false, //批量分配的modal状态
})
const searchData = reactive({ // 高级检索的选项
    dateRange: '',
    name: '',
})
const selectedRowKeys = ref([]) //列表的选择框-选择框选中的类别列表下标索引
const columns = [
    {
        title: '序号',
        dataIndex: 'number',
        align: 'center',
        width: '7%',
    },
    {
        title: 'ID',
        dataIndex: 'ID',
        align: 'center',
        width: '12%',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        align: 'center',
        width: '10%',
    },
    {
        title: '电话',
        dataIndex: 'phone',
        align: 'center',
        width: '12%',
    },
    {
        title: '性别',
        dataIndex: 'gender',
        align: 'center',
        width: '7%',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        align: 'center',
        width: '7%',
    },
    {
        title: '截止日期',
        dataIndex: 'endTime',
        align: 'center',
        width: '12%',
    },
    {
        title: '距截止时间/天',
        dataIndex: 'distanceTime',
        align: 'center',
        width: '13%',
    },
    {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '18%',
    },
]
const dataSource = ref([])
const pagination = reactive({  // 表格页码相关设置
    pageSize: 10, //每页最多条目数
    current: 1, //当前页码
    total: 11, //总条目数
    showTotal: (total, range) => `总共 ${total} 条数据`, // 在这里定义显示总数据量的格式
})
const caseInfo = reactive({
    caseVisible: false, // 是否显示某个患者的病历
    caseUrl: '', // 某个患者病历的地址
    patientId: '', // 患者的id
}) 
const allotInfo = reactive({ // 分配信息
    patients: [], //待提交分配的患者id
    nureseId: "", //对应的护士编号
})
const isDisabled = ref(false) //单个患者的“分配”按钮状态

onMounted(() => {
    getAllotTaskList()
})
// 监听待提交分配的患者列表，若大于1，则不可点击单个患者的“分配”按钮
watch(() => allotInfo.patients, (newValue) => {
    if(newValue.length > 1) {
        isDisabled.value = true
    } else {
        isDisabled.value = false
    }
})
// 获取随访任务分配列表
const getAllotTaskList = () => {
    // 调用 api 获取所有随访任务分配的列表，设置dataSource的值
    dataSource.value = [
        {
            number: '1',
            ID: 'P0135230101',
            name: "陈小",
            phone: "18432939406",
            gender: "男",
            age: 35,
            endTime: "2024-02-10",
            distanceTime: 7,
        },
        {
            number: '2',
            ID: 'P0135230102',
            name: "陈小",
            phone: "18432939406",
            gender: "男",
            age: 35,
            endTime: "2024-02-10",
            distanceTime: 7,
        },
        {
            number: '3',
            ID: 'P0135230103',
            name: "陈小",
            phone: "18432939406",
            gender: "男",
            age: 35,
            endTime: "2024-02-10",
            distanceTime: 7,
        },
        {
            number: '4',
            ID: 'P0135230104',
            name: "陈小",
            phone: "18432939406",
            gender: "男",
            age: 35,
            endTime: "2024-02-10",
            distanceTime: 7,
        },
        {
            number: '5',
            ID: 'P0135230105',
            name: "陈小",
            phone: "18432939406",
            gender: "男",
            age: 35,
            endTime: "2024-02-10",
            distanceTime: 7,
        },
        {
            number: '6',
            ID: 'P0135230106',
            name: "陈小",
            phone: "18432939406",
            gender: "男",
            age: 35,
            endTime: "2024-02-10",
            distanceTime: 7,
        },
        {
            number: '7',
            ID: 'P0135230107',
            name: "陈小",
            phone: "18432939406",
            gender: "男",
            age: 35,
            endTime: "2024-02-10",
            distanceTime: 7,
        },
        {
            number: '8',
            ID: 'P0135230108',
            name: "陈小",
            phone: "18432939406",
            gender: "男",
            age: 35,
            endTime: "2024-02-10",
            distanceTime: 7,
        },
        {
            number: '9',
            ID: 'P0135230109',
            name: "陈小",
            phone: "18432939406",
            gender: "男",
            age: 35,
            endTime: "2024-02-10",
            distanceTime: 7,
        },
        {
            number: '10',
            ID: 'P0135230110',
            name: "陈小",
            phone: "18432939406",
            gender: "男",
            age: 35,
            endTime: "2024-02-10",
            distanceTime: 7,
        },
        {
            number: '11',
            ID: 'P0135230111',
            name: "陈小",
            phone: "18432939406",
            gender: "男",
            age: 35,
            endTime: "2024-02-10",
            distanceTime: 7,
        },
    ]
    // console.log(searchData.dateRange, searchData.name)
}
// 选择框选中的患者列表
const onSelectChange = (keys) => {
    // console.log(keys)
    selectedRowKeys.value = keys
    allotInfo.patients = selectedRowKeys.value
}
// 点击某个患者的“分配”按钮
const openAllotOneModal = (id) => {
    modalInfo.allotOneModal = true
    allotInfo.nureseId = ""
    // 将该患者的ID保存到 allotInfo 中
    allotInfo.patients = []
    allotInfo.patients.push(id)
    // console.log(allotInfo.patients, typeof(allotInfo.patients))
    getNurseList()
}
// 点击“批量分配”按钮
const openAllotSomeModal = () => {
    // 点击“批量分配”按钮前判断是否选择了待分配的患者
    if(allotInfo.patients.length > 0) {
        modalInfo.allotSomeModal = true
        allotInfo.nureseId = ""
        getNurseList()
    } else {
        message.error("请选择待批量分配的患者")
    }
}
// 获取护士列表
const getNurseList = () => {
    // 调用api，获取护士列表，设置nurseList
    nurseList.value = [
        {nureseId: '001', nurseName: '护士1', num: 102},
        {nureseId: '002', nurseName: '护士2', num: 106},
        {nureseId: '003', nurseName: '护士3', num: 97},
        {nureseId: '004', nurseName: '护士4', num: 102},
    ]
}
// 点击modal的“取消”按钮或右上角叉
const handleCancel = () => {
    allotInfo.patients = []
}
// 提交患者分配的护士
const handleAllot = () => {
    // 判断allotInfo里的内容是否为空，将allotInfo的信息通过api传递给后端
    if(allotInfo.nureseId !== '') {
        // console.log(allotInfo.patients, allotInfo.nureseId)
        // 若传递成功，则将modal的变量设置为false，allotInfo的内容初始化
        modalInfo.allotOneModal = false
        modalInfo.allotSomeModal = false
        allotInfo.patients = []
        allotInfo.nureseId = ""
        selectedRowKeys.value = []
        // 更新页面列表显示
        getAllotTaskList()
    } else {
        message.error("请选择分配护士")
    }
}
// 点击“查看”按钮显示某个患者的病历
const handlePatientShow = (visible, id = caseInfo.patientId) => {
    if(visible) {
        caseInfo.patientId = id
        // 通过患者的 id 调用 api 获得该患者的病历照片
        caseInfo.caseUrl = caseImageUrl
    }
    caseInfo.caseVisible = visible
}
// 处理翻页
const handleTableChange = (e) => {
    pagination.current = Number(e.current)
    getAllotTaskList()
}
</script>

<style lang="less" scoped>
.allotTaskLayout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 新增的样式 */

    .searchBox {
        width: 96%;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        .searchContent {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            // background-color: aqua;
            .nameSearch {
                margin: 0 4vw;
            }
        }
        .allotBtn {
            margin-right: 2vw;
        }
    }
    .allotTaskTable {
        margin-top: 20px;
        width: 96%;
        display: flex;
        justify-content: center;
        min-height: 57vh;
        .viewBtn {
           margin-left: 1vw;
        }
        
    }
}
.distributeNurseTitle {
        // display: flex;
        // justify-content: center;
        margin-bottom: 20px;
        text-align: center;
        font-family: "思源黑体";
        font-size: 16px;
}
.distributeNurseSelect {
    display: flex;
    justify-content: center;
}
::v-deep .ant-table-thead > tr > th  {
    background: #D3DED8 !important;
}
</style>
