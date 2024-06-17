<!-- 护士长--今日异常提醒 -->
<template>
    <div class="alertLayout">
        <!-- 搜索框 -->
        <div class="searchBox">
            <div class="keywordsSearch">
                姓名：<a-input v-model:value="searchData.name" placeholder="请输入姓名" allowClear :style="{width: '400px'}"></a-input>
            </div>
            <div class="allotBtn">
                <a-button type="primary" @click="getAlertList">查询</a-button>
            </div>
        </div>
        <!-- 异常提醒表格 -->
        <div class="alertTable">
            <a-table
                :columns="columns"
                :data-source="dataSource"
                :pagination="pagination"
                :scroll="{ y: '60vh' }"
                :bordered="true"
                @change="handleTableChange"
            />
        </div>
    </div>
</template>
<script setup>
import {ref, reactive,onMounted} from "vue"
import {handTodayAlert} from '@/api/head_nurse/handAlerts'

const searchData = reactive({ // 高级检索的选项
    name: '',
})
// 表格页码相关设置
const pagination = reactive({
    pageSize: 10, //每页最多条目数
    current: 1, //当前页码
    total: 11, //总条目数
    showTotal: (total, range) => `总共 ${total} 条数据`, // 在这里定义显示总数据量的格式
})
//表格--表头
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
        title:'分组',
        dataIndex:'group',
        align: 'center',
        width: '7%',
    },
    {
        title:'时间',
        dataIndex:'time',
        align:'center',
        width:'7%',
    },
    {
        title:'异常类型',
        dataIndex:'type',
        align:'center',
        width:'7%',
    },
]
const dataSource = ref([])

onMounted(() => {
    getAlertList()
})

// 获取表格
const getAlertList = () =>{
    dataSource.value.splice(0, dataSource.value.length)
    // 调用 api 获取所有随访任务分配的列表，设置dataSource的值
    handTodayAlert(searchData.name).then(res =>{
        if(res.data.code === 200){
            console.log('今日',searchData.name)
            pagination.total = res.data.data.rows.length
            for(let i = 0;i < res.data.data.rows.length; i++){
                dataSource.value.push({
                    number:i+1,
                    ID:res.data.data.rows[i].patientCode,
                    name:res.data.data.rows[i].patientName,
                    phone:res.data.data.rows[i].phonenumber,
                    gender:res.data.data.rows[i].gender,
                    age:res.data.data.rows[i].age,
                    age:res.data.data.rows[i].age,
                    group:res.data.data.rows[i].cancerName,
                    time:res.data.data.rows[i].completionDate,
                    type:res.data.data.rows[i].followUpSituation
                })
            }
        }
    }).catch(err =>{
        console.log(err)
    })
}

//处理翻页
const handleTableChange = (e) => {
    pagination.current = Number(e.current)
    getAlertList()
}
</script>

<style lang="less" scoped>
.alertLayout{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 新增的样式 */
    .searchBox{
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        .keywordsSearch {
            margin: 1vh 3vw;
        }
        .allotBtn{
            display: flex;
        }
    }
    .alertTable{
        margin-top: 10px;
        width: 96%;
        display: flex;
        justify-content: center;
        min-height: 50vh;
    }
}

:deep(.ant-table-thead > tr > th) {
    background: #D3DED8 !important;
}
</style>
