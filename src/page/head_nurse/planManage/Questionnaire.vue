<!-- 护士长--计划管理--随访问卷列表 -->
<template>
    <div class="questionnaireListLayout">
        <!-- 顶部检索框 -->
        <div class="searchBox">
            <!-- 问卷名检索 -->
            <div class="titleSearch">
                问卷名：
                <a-input v-model:value="searchData.keywords" placeholder="请输入问卷名" allowClear :style="{width: '180px'}"></a-input>
            </div>
            <!-- 适用对象检索 -->
            <div class="applicableSearch">
                适用对象：
                <a-select
                    ref="select"
                    v-model:value="searchData.applicable"
                    style="width: 150px"
                    placeholder="请选择适用对象"
                    allowClear
                >
                    <a-select-option v-for="item in applicableType" :key="item.key">{{item.value}}</a-select-option>
                </a-select>
            </div>
            <!-- 创建时间检索 -->
            <div class="date">
                截止日期：
                <a-date-picker v-model:value="searchData.date" />
            </div>
            <div class="searchBtn">
                <a-button class="searchBtn" type="primary" @click="getQuesNaireInfoList">查询</a-button>
                <a-popconfirm
                    title="确定要删除吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handleDeleteSome"
                >
                    <a-button class="dangerBtn" type="primary" danger>批量删除</a-button>
                </a-popconfirm>
            </div>
        </div>
        <!-- 计随访问卷列表况表格 -->
        <div class="questionnaireInfoTable">
            <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                :columns="columns"
                :data-source="dataSource"
                :rowKey="record => record.questionName"
                :scroll="{ y: '57vh' }"
                :pagination="pagination"
                :bordered="true"
                @change="handleTableChange"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'action'">
                        <a-button type="text" @click="jumpToQuesDetail(record.questionName)" :style="{color: '#388B7C', fontWeight: '600'}">查看</a-button>
                        <a-popconfirm
                            title="确定要删除吗？"
                            ok-text="确定"
                            cancel-text="取消"
                            @confirm="handleDeleteOne(record.questionName)"
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
import {ref, reactive, onMounted} from "vue"
import { message } from "ant-design-vue"
import { useRouter } from 'vue-router'

const router = useRouter()
const searchData = reactive({ // 检索信息
    keywords: '', // 问卷名
    applicable: '', // 适用对象
    date: '', // 创建时间
})
const applicableType = ref([]) // 适用对象列表
const pagination = reactive({  // 表格页码相关设置
    pageSize: 10, //每页最多条目数
    current: 1, //当前页码
    total: 11, //总条目数
    showTotal: (total, range) => `总共 ${total} 条数据`, // 在这里定义显示总数据量的格式
})
const selectedRowKeys = ref([]) //列表的选择框-选择框选中的问卷名列表下标索引
const columns = [
    {
        title: '序号',
        dataIndex: 'number',
        align: 'center',
        width: '8%',
    },
    {
        title: '问卷名',
        dataIndex: 'questionName',
        align: 'center',
        width: '17%',
    },
    {
        title: '适用对象',
        dataIndex: 'applicableType',
        align: 'center',
        width: '15%',
    },
    {
        title: '创建者',
        dataIndex: 'creater',
        align: 'center',
        width: '15%',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        align: 'center',
        width: '15%',
    },
    {
        title: '备注',
        dataIndex: 'note',
        align: 'center',
        width: '15%',
    },
    {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '15%',
    },
]
const dataSource = ref([])
const deleteList = ref([]) // 待批量删除的问卷列表

onMounted(() => {
    getQuesNaireInfoList()
})
// 获取随访问卷列表信息
const getQuesNaireInfoList = () => {
    // 配置适用对象选择框的选择项
    applicableType.value = [
        { key: '0', value: '鼻咽癌重症' },
        { key: '1', value: '鼻咽癌轻症' },
    ]
    dataSource.value = [
        {
            number: '1',
            questionName: '鼻咽癌重症',
            applicableType: '鼻咽癌重症',
            creater: '陈嘉',
            createTime: '2023-10-03',
            note: '无',
        },
        {
            number: '2',
            questionName: '鼻咽癌轻症',
            applicableType: '鼻咽癌轻症',
            creater: '陈嘉',
            createTime: '2023-10-03',
            note: '无',
        },
        {
            number: '3',
            questionName: '鼻咽癌重症（糖尿病）',
            applicableType: '鼻咽癌重症',
            creater: '陈嘉',
            createTime: '2023-10-03',
            note: '无',
        },
        {
            number: '4',
            questionName: '鼻咽癌重症（心脏病）',
            applicableType: '鼻咽癌重症',
            creater: '陈嘉',
            createTime: '2023-10-03',
            note: '特殊使用',
        },
        {
            number: '5',
            questionName: '疑似鼻咽癌',
            applicableType: '鼻咽癌重症',
            creater: '陈嘉',
            createTime: '2023-10-03',
            note: '无',
        },
        {
            number: '6',
            questionName: '鼻咽癌1',
            applicableType: '鼻咽癌重症',
            creater: '陈嘉',
            createTime: '2023-10-03',
            note: '无',
        },
        {
            number: '7',
            questionName: '鼻咽癌2',
            applicableType: '鼻咽癌重症',
            creater: '陈嘉',
            createTime: '2023-10-03',
            note: '无',
        },
    ]
}
// 选择框选中的类别列表
const onSelectChange = (keys) => {
    // console.log(keys)
    selectedRowKeys.value = keys
    // 将选择的类别保存到deleteList中
    deleteList.value = keys
}
// 点击某个问卷的“删除”按钮
const handleDeleteOne = (name) => {
    // console.log(name)
    // 调用删除单个问卷的api，成功后重新获取问卷列表
    getQuesNaireInfoList()
}
// 点击“批量删除”按钮
const handleDeleteSome = () => {
    if(deleteList.value.length > 0) {
        // 调用批量删除类别的api，成功后重新获取问卷列表
        deleteList.value = []
        getQuesNaireInfoList()
    } else {
        message.error("请选择待删除的问卷")
    }
}
// 点击“查看”按钮跳转到对应问卷的详细界面
const jumpToQuesDetail = (name) => {
    router.push({
        path: '/questionDetail',
        query: {
            questionName: name
        }
    })
}
// 处理翻页
const handleTableChange = (e) => {
    pagination.current = Number(e.current)
    getQuesNaireInfoList()
}
</script>

<style lang="less" scoped>
.questionnaireListLayout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 新增的样式 */
    
    .searchBox {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        margin: 3vh 0;
        .searchBtn {
            display: flex;
            gap: 20px; /* 设置按钮之间的间距 */
            .dangerBtn {
                margin-left: 1vw;
                background-color: #A54138;
            }
        }
    }
    .questionnaireInfoTable {
        width: 96%;
        display: flex;
        justify-content: center;
        min-height: 57vh;
        // margin-top: 10px;
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
