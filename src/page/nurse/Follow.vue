<!-- 教师--批改列表 -->
<template>
    <div class="contentHeader">
        <!-- 引入icon -->
        <a-button type="text" @click="jumpToIndex">
            <template #icon><LeftOutlined />
        </template></a-button>
        <span class="headerDetail" style="margin-right: 10px;">本周批改计划</span>
        <span class="headerDetail" style="color: #4095E5;">已完成{{ completionNumber }}人 / 共{{ TotalFollow }}人</span>
    </div>
    <div class="contentTable">
        <!-- 搜索表单 -->
        <a-form class="searchForm">
            <a-form-item label="姓名" style="margin-right: 20px;">
                <a-input placeholder="请输入姓名" v-model:value="serchInfo.name" allowClear="true"/>
            </a-form-item>
            <a-form-item label="状态" style="margin-right: 20px; width: 250px;">
                <a-select placeholder="请选择状态" v-model:value="serchInfo.statu" allowClear="true">
                    <a-select-option value="1">全部</a-select-option>
                    <a-select-option value="2">已批改</a-select-option>
                    <a-select-option value="3">未批改</a-select-option>
                    <a-select-option value="4">批改异常</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click.prevent="handleSubmit" class="seachBtn">查询</a-button>
            </a-form-item>
        </a-form>
        <!-- 批改表格 -->
        <div class="followTable">
            <a-table :columns="columns" :data-source="data" :scroll="{ y: '55vh' }" :bordered="true">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'todeadline'">
                      <!-- 当本行的数据时负数时，显示“已逾期，且颜色是红色”；若数据为正数，显示获得的数据 -->
                        <span v-if="record[column.key] < 0" style="color: red">已逾期</span>
                        <span v-else>{{ record[column.key] }}</span>
                    </template>
                    <template v-if="column.key === 'operation'">
                        <!-- 当状态为已批改时，操作栏的“去批改”变成灰色，且不能点击；否则“去批改”为绿色，且点击可以去批改 -->
                        <span v-if="record['todeadline'] === null" style="color: grey">去批改</span>
                        <span v-else>
                            <router-link 
                                :to="{ name: 'followDetail', params: { source: 'follow' } }" 
                                style="color: #368467;font-weight:500">去批改
                            </router-link>
                        </span>
                    </template>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup>
import { LeftOutlined } from '@ant-design/icons-vue'
import { reactive } from "vue"
import { useRouter } from 'vue-router'
import { getFollowListApi, getTodayInfoApi } from '@/api/nurse/nurseWorkbench'
import { ref, onMounted } from "vue";
import { message } from 'ant-design-vue'

// 搜索框表单数据
const serchInfo = reactive({
    name: null,
    statu: null,
});
let status = '';
// 定义提交函数
const handleSubmit = () => {
  if(serchInfo.statu === '1'){
    status = '全部'
  }else if(serchInfo.statu === '2'){
    status = '已批改'
  }else if(serchInfo.statu === '3'){
    status = '未批改'
  }else if(serchInfo.statu === '4'){
    status = '批改异常'
  }else{
    status = ''  
  }
  console.log(serchInfo.name, status);  // 已经获取到了数据
    // 调用接口进行搜索
  getFollowList()  
};
// 批改表格数据
const columns = [
  {
    title: 'ID',
    width: 50,
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    align: 'center',
  },
  {
    title: '姓名',
    width: 80,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    align: 'center',
  },
  {
    title: '电话',
    dataIndex: 'tel',
    key: 'tel',
    width: 50,
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    width: 30,
    align: 'center',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 30,
    align: 'center',
  },
  {
    title: '分组',
    dataIndex: 'group',
    key: 'group',
    width: 50,
    align: 'center',
  },
  {
    title: '截止日期',
    dataIndex: 'deadline',
    key: 'deadline',
    width: 50,
    align: 'center',
  },
  {
    title: '距截止日期时间',
    dataIndex: 'todeadline',
    key: 'todeadline',
    width: 50,
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 50,
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 50,
    align: 'center',
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 30,
    align: 'center',
  },
];
const data = ref([]);
// 获取批改列表
const getFollowList = () => {
  // 清空 data.value
  data.value.splice(0, data.value.length);
  // getFollowListApi(serchInfo.name, status).then(res => {
  //   console.log(res)
  //   if(res.data.code === 200){
  //     for (let i = 0; i < res.data.data.rows.length; i++) {
  //       data.value.push(
  //         {
  //           id: res.data.data.rows[i].patientCode,
  //           name: res.data.data.rows[i].patientName,
  //           sex: res.data.data.rows[i].gender,
  //           age: res.data.data.rows[i].age,
  //           tel: res.data.data.rows[i].phonenumber,
  //           group: res.data.data.rows[i].cancerName,
  //           deadline: res.data.data.rows[i].latestFollowDue,
  //           todeadline: res.data.data.rows[i].days,
  //           remark: res.data.data.rows[i].note,
  //           status: res.data.data.rows[i].followUpSituation,
  //           operation: "操作",
  //         }
  //       );
  //     }
  //   }else{
  //     message.error("获取失败！" + res.data.msg)
  //   }
  //   }).catch((err) => {
  //     console.log(err)
  // })
      for (let i = 1; i < 100; i++) {
        data.value.push({
        id: `P00000000${i}`,
        name: `name ${i}`,
        sex: `${i%4===0?'女':'男'}`,
        age: 32,
        tel: 13778787878,
        group: `${i%3===0?'语文':'英语'}`,
        deadline: '2023-07-23',
        todeadline: '5天',
        remark:  Math.floor(Math.random() * (100 - 60 + 1)) + 60,
        status: `${i%4===0?'未批改':'已批改'}`,
        operation: '操作',
      });
    }
}

// 获取批改进度
const completionNumber = ref()
const TotalFollow = ref()
const getTodayInfo = () => {
  getTodayInfoApi().then(res => {
    if(res.data.code === 200){
        TotalFollow.value = res.data.data.total
        completionNumber.value = res.data.data.completionNumber
    }else{
      message.error("获取失败！" + res.data.data.msg)
    }
    }).catch((err) => {
      console.log(err)
  })
}

// 跳转到“批改详情”页面
const router = useRouter()
// const jumpToFollowDetail = () => {
//     router.push({ path: '/followDetail'})
// }
// 跳转到“个人中心”页面
const jumpToIndex = () => {
    router.push({ path: '/nurseIndex'})
}
// 动态设置表格高度
// const dynamicTableHeight = ref(document.body.clientHeight*0.5);

// 在mounted生命周期中调用"获取列表数据函数"
onMounted(() => {
  getFollowList();
  getTodayInfo();
});
</script>

<style lang="less" scoped>
.contentHeader {
    padding-bottom: 15px;
    .headerDetail {
        font-size: 16px;
    }
}
.contentTable {
    background-color: #fff;
    height: 93%;
    box-shadow: 3px 3px 7px 1px rgba(0, 0, 0, 0.3);
    text-align: center;
    .searchForm {
        margin: 0 auto;
        width: 800px;
        padding-top: 20px;
        display: flex;
        .seachBtn {
            width: 100px;
        }
        :deep(.ant-form-item){
            margin-bottom: 24px;
        }
    }
    .followTable {
        padding-right: 10px;
        padding-left: 10px;
        min-height: 400px;
    }
}
</style>
