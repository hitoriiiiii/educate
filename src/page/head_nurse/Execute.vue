<!-- 护士长--执行情况 -->
<template>
    <div class="executeLayout">
        <!-- 顶部检索框 -->
        <div class="searchBox">
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
                关键字：<a-input v-model:value="searchData.keywords" placeholder="请输入用户名或姓名" allowClear :style="{width: '400px'}"></a-input>
            </div>
            <div class="searchBtn">
                <a-button type="primary" @click="getDisplayList">查询</a-button>
                <a-button @click="exportToExcel">导出Excel</a-button>
            </div>
        </div>
        <!-- 执行情况表格 -->
        <div class="executeTable">
            <a-table 
                :columns="columns"
                :data-source="dataSource"
                :rowKey="record => record.user"
                :scroll="{ y: '63vh' }"
                :pagination="pagination"
                :bordered="true"
                @change="handleTableChange"
            >
            </a-table>
        </div>
    </div>   
</template>

<script setup>
import { theme } from 'ant-design-vue'
import {ref, reactive, onMounted, watch} from "vue"
import XLSX from 'xlsx'
import { handExecuteApi } from '@/api/head_nurse/handExecuteApi';
// 高级检索的选项
const searchData = reactive({
    dateRange: null, //日期选择框
    dateRadio: null, //日or月or周or年
    keywords: '',
})
// 表格页码相关设置
const pagination = reactive({
    pageSize: 10, //每页最多条目数
    current: 1, //当前页码
    total: 11, //总条目数
    showTotal: (total, range) => `总共 ${total} 条数据`, // 在这里定义显示总数据量的格式
})
const columns = [
    {
        title: '序号',
        dataIndex: 'number',
        align: 'center',
        width: '10%',
    },
    {
        title: '用户名',
        dataIndex: 'user',
        align: 'center',
        width: '15%',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        align: 'center',
        width: '15%',
    },
    {
        title: '随访任务数',
        dataIndex: 'taskNum',
        align: 'center',
        width: '10%',
    },
    {
        title: '未随访数',
        dataIndex: 'following',
        align: 'center',
        width: '10%',
    },
    {
        title: '已随访数',
        dataIndex: 'finished',
        align: 'center',
        width: '10%',
    },
    {
        title: '逾期未随访',
        dataIndex: 'lateFollow',
        align: 'center',
        width: '10%',
    },
    {
        title: '随访异常数',
        dataIndex: 'abnormal',
        align: 'center',
        width: '10%',
    },
    {
        title: '达标率',
        dataIndex: 'ratingRate',
        align: 'center',
        width: '10%',
    },
]
const dataSource = ref([])

// 监听日期范围选择器的变化
watch(() => searchData.dateRange, (newValue) => {
    if(newValue) {
        searchData.dateRadio = null
    }
})
// 监听日期单选按钮的变化
watch(() => searchData.dateRadio, (newValue) => {
    if(newValue) {
        searchData.dateRange = null
    }
})

onMounted(() => {
    getExecuteData()
})
// 获取所有执行情况列表
const getDisplayList = () => {
    getExecuteData()
}

//数据导出为excel表格
const exportToExcel = () => {
  import('xlsx').then((XLSX) => {
    const sheetData = dataSource.value.map((item) =>{
        return{
            序号:item.number,
            用户名:item.user,
            姓名:item.name,
            随访任务数:item.taskNum,
            未随访数:item.following,
            已随访数:item.finished,
            逾期未随访:item.lateFollow,
            随访异常数:item.abnormal,
            达标率:item.ratingRate
        }
    })
    const sheet = XLSX.utils.json_to_sheet(sheetData);//将 sheetData转换为一个工作表的数据
    const workbook = XLSX.utils.book_new();//创建一个新的工作簿
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');//工作表添加到工作簿中，指定工作表名称为 'Sheet1'
    XLSX.writeFile(workbook, 'table.xlsx');
  });
};

// 处理翻页
const handleTableChange = (e) => {
    pagination.current = Number(e.current)
    getExecuteData()
}

//调用接口，获取执行情况数据
const getExecuteData = ()=>{
    // console.log('调用接口')
    dataSource.value.splice(0, dataSource.value.length);
    handExecuteApi(searchData.keywords).then(res =>{
        if(res.data.code === 200){
            // console.log(searchData.keywords)
            pagination.total = res.data.data.rows.length
            for(let i = 0; i < res.data.data.rows.length; i++){
                dataSource.value.push({
                    number: i + 1,
                    user: res.data.data.rows[i].username,
                    name: res.data.data.rows[i].name,
                    taskNum: res.data.data.rows[i].total,
                    following: res.data.data.rows[i].noFollowedNumber,
                    finished: res.data.data.rows[i].completionNumber,
                    lateFollow: res.data.data.rows[i].overdueNumber,
                    abnormal: res.data.data.rows[i].exceptionNumber,
                    ratingRate: res.data.data.rows[i].complianceRate
                })  
            }
            
        }else{
            message.error('获取失败');
        }
    }).catch(err =>{
        console.log(err)
    })
}
</script>

<style lang="less" scoped>
.executeLayout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 新增的样式 */
    .searchBox {
        // font-family: '思源宋体', '宋体', Arial, Helvetica, sans-serif;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 96%;

        .date {
            .range {
                margin-right: 1vw;
            }
        }
        .keywordsSearch {
            margin: 1vh 3vw;
        }
        .searchBtn {
            margin-left: 4vw;
            display: flex;
            gap: 30px; /* 设置按钮之间的间距 */
        }
    }
    .executeTable {
        margin-top: 20px;
        width: 96%;
        display: flex;
        justify-content: center;
        min-height: 64vh;
        // background-color: aqua;
    }
}
::v-deep .ant-table-thead > tr > th  {
    background: #D3DED8 !important;
}

</style>
