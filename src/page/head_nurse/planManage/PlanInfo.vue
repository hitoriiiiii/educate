<!-- 护士长--计划管理 -->
<template>
    <div class="planInfoLayout">
        <!-- 顶部检索框 -->
        <div class="searchBox">
            <div class="typeSearch">
                类别：
                <a-select
                    ref="select"
                    v-model:value="searchType"
                    mode="multiple"
                    style="width: 440px"
                    placeholder="请选择要查询的类别"
                    allowClear
                >
                    <a-select-option v-for="item in typeList" :key="item">{{item}}</a-select-option>
                </a-select>
                <a-button class="searchBtn" type="primary" @click="getPlanInfoList">查询</a-button>
            </div>
            <a-popconfirm
                title="确定要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDeleteSome"
            >
                <a-button class="dangerBtn" type="primary" danger>批量删除</a-button>
            </a-popconfirm>
        </div>
        <!-- 计划管理情况表格 -->
        <div class="planInfoTable">
            <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                :columns="columns"
                :data-source="dataSource"
                :rowKey="record => record.type"
                :scroll="{ y: '63vh' }"
                :pagination="pagination"
                :bordered="true"
                @change="handleTableChange"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'action'">
                        <a-button type="text" @click="jumpToDetail(record.type)" :style="{color: '#388B7C', fontWeight: '600'}">查看</a-button>
                        <a-popconfirm
                            title="确定要删除吗？"
                            ok-text="确定"
                            cancel-text="取消"
                            @confirm="handleDeleteOne(record.type)"
                        >
                            <a-button class="deleteBtn" type="text" danger>删除</a-button>
                        </a-popconfirm>
                    </template>
                </template>
            </a-table>
        </div>
    </div>  
</template>

<script setup>
import { message } from "ant-design-vue"
import {ref, reactive, onMounted} from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()
const searchType = ref([]) //要搜索的类别
const typeList = ref([]) //类别种类
const selectedRowKeys = ref([]) //列表的选择框-选择框选中的类别列表下标索引
const columns = [
    {
        title: '序号',
        dataIndex: 'number',
        align: 'center',
        width: '5%',
    },
    {
        title: '类别',
        dataIndex: 'type',
        align: 'center',
        width: '10%',
    },
    {
        title: '累计患者',
        dataIndex: 'totalPatients',
        align: 'center',
        width: '7%',
    },
    {
        title: '随访中患者',
        dataIndex: 'following',
        align: 'center',
        width: '8%',
    },
    {
        title: '终止随访患者',
        dataIndex: 'end',
        align: 'center',
        width: '9%',
    },
    {
        title: '总需随访任务',
        dataIndex: 'totalTask',
        align: 'center',
        width: '10%',
    },
    {
        title: '已完成任务',
        dataIndex: 'finished',
        align: 'center',
        width: '8%',
    },
    {
        title: '今日新增任务',
        dataIndex: 'addNow',
        align: 'center',
        width: '10%',
    },
    {
        title: '逾期未随访任务',
        dataIndex: 'lateFollow',
        align: 'center',
        width: '10%',
    },
    {
        title: '异常任务',
        dataIndex: 'abnormal',
        align: 'center',
        width: '7%',
    },
    {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '12%',
    },
]
const dataSource = ref([])
const pagination = reactive({  // 表格页码相关设置
    pageSize: 10, //每页最多条目数
    current: 1, //当前页码
    total: 11, //总条目数
    showTotal: (total, range) => `总共 ${total} 条数据`, // 在这里定义显示总数据量的格式
})
const deleteList = ref([]) // 待批量删除的类别列表

onMounted(() => {
    getPlanInfoList()
})
// 获取计划管理列表
const getPlanInfoList = () => {
    dataSource.value = [
        {
            number: '1',
            type: '鼻咽癌',
            totalPatients: 123,
            following: 115,
            end: 8,
            totalTask: 540,
            finished: 450,
            addNow: 21,
            lateFollow: 3,
            abnormal: 1,
        },
        {
            number: '2',
            type: '胃癌',
            totalPatients: 123,
            following: 115,
            end: 8,
            totalTask: 540,
            finished: 450,
            addNow: 21,
            lateFollow: 3,
            abnormal: 1,
        },
        {
            number: '3',
            type: '直肠癌',
            totalPatients: 123,
            following: 115,
            end: 8,
            totalTask: 540,
            finished: 450,
            addNow: 21,
            lateFollow: 3,
            abnormal: 1,
        },
        {
            number: '4',
            type: '乳腺癌',
            totalPatients: 123,
            following: 115,
            end: 8,
            totalTask: 540,
            finished: 450,
            addNow: 21,
            lateFollow: 3,
            abnormal: 1,
        },
        {
            number: '5',
            type: '肺癌',
            totalPatients: 123,
            following: 115,
            end: 8,
            totalTask: 540,
            finished: 450,
            addNow: 21,
            lateFollow: 3,
            abnormal: 1,
        },
        {
            number: '6',
            type: '肝癌',
            totalPatients: 123,
            following: 115,
            end: 8,
            totalTask: 540,
            finished: 450,
            addNow: 21,
            lateFollow: 3,
            abnormal: 1,
        },
        {
            number: '7',
            type: '肾癌',
            totalPatients: 123,
            following: 115,
            end: 8,
            totalTask: 540,
            finished: 450,
            addNow: 21,
            lateFollow: 3,
            abnormal: 1,
        },
        {
            number: '8',
            type: '神经瘤',
            totalPatients: 123,
            following: 115,
            end: 8,
            totalTask: 540,
            finished: 450,
            addNow: 21,
            lateFollow: 3,
            abnormal: 1,
        },
        {
            number: '9',
            type: '甲状腺癌',
            totalPatients: 123,
            following: 115,
            end: 8,
            totalTask: 540,
            finished: 450,
            addNow: 21,
            lateFollow: 3,
            abnormal: 1,
        },
        {
            number: '10',
            type: '食道癌',
            totalPatients: 123,
            following: 115,
            end: 8,
            totalTask: 540,
            finished: 450,
            addNow: 21,
            lateFollow: 3,
            abnormal: 1,
        },
        {
            number: '11',
            type: '黑色素癌',
            totalPatients: 123,
            following: 115,
            end: 8,
            totalTask: 540,
            finished: 450,
            addNow: 21,
            lateFollow: 3,
            abnormal: 1,
        },
    ]
    typeList.value = ["鼻咽癌", "胃癌", "直肠癌", "乳腺癌", "肺癌", "肝癌", "肾癌", "神经瘤", "甲状腺癌", "食道癌"]
}
// 选择框选中的类别列表
const onSelectChange = (keys) => {
    // console.log(keys)
    selectedRowKeys.value = keys
    // 将选择的类别保存到deleteList中
    deleteList.value = keys
}
// 点击某个类别信息的“删除”按钮
const handleDeleteOne = (type) => {
    // console.log(type)
    // 调用删除单个类别的api，成功后重新获取计划管理列表
    getPlanInfoList()
}
// 点击“批量删除”按钮
const handleDeleteSome = () => {
    if(deleteList.value.length > 0) {
        // 调用批量删除类别的api，成功后重新获取计划管理列表
        deleteList.value = []
        getPlanInfoList()
    } else {
        message.error("请选择待删除的类别")
    }
}
// 点击“查看”按钮跳转到某个类别的详细界面
const jumpToDetail = (type) => {
    router.push({
        path: '/allotTask',
        query: {
            typeId: type
        }
    })
}
// 处理翻页
const handleTableChange = (e) => {
    pagination.current = Number(e.current)
    getPlanInfoList()
}
</script>

<style lang="less" scoped>
.planInfoLayout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 新增的样式 */

    .searchBox {
        width: 96%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        .typeSearch {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            // background-color: aqua;
            .searchBtn {
                margin-left: 3vw;
            }
        }
        .dangerBtn {
            margin-right: 2vw;
            background-color: #A54138;
        }
    }
    .planInfoTable {
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        min-height: 64vh;
        .deleteBtn {
            // background-color: #A73126;
            font-weight: 600;
            color: #A73126;
        }
    }
}
::v-deep .ant-table-thead > tr > th  {
    background: #D3DED8 !important;
}
</style>
