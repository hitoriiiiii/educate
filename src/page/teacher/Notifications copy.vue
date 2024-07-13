<!-- 教师--消息通知 -->
<template>
    <div class="notiLayout">
      <!-- 左侧展示检索框 -->
      <div class="searchBox">
        <!-- 日期选择框 -->
        <a-space direction="vertical" class="dataPick">
            <a-range-picker 
              :size="size" 
              style="width: 400px"
              format="YYYY-MM-DD"
              show-time
              :open="true"
              :presets="rangePresets" 
              @change="onRangeChange"
            />
        </a-space>
        <!-- 临期批改按钮 -->
        <a-button type="primary" @click="getCriticalList" class="criticalBtn">
          <a-badge
            :count="criticalCount"
            :number-style="{
              backgroundColor: '#BD3124',
              color: '#fff',
              boxShadow: '0 0 0 1px #d9d9d9 inset',
            }"
            style="margin-right: 20px;"
          />
          临期批改任务
        </a-button>
        <!-- 逾期未批改按钮 -->
        <a-button type="primary" @click="getLateList" class="lateBtn">
          <a-badge
            :count="lateCount"
            :number-style="{
              backgroundColor: '#BD3124',
              color: '#fff',
              boxShadow: '0 0 0 1px #d9d9d9 inset',
            }"
            style="margin-right: 20px;"
          />
          逾期未批改任务
        </a-button>
      </div>
      <!-- 右侧展示表格 -->
      <div class="tableBox">
        <a-form class="searchForm">
          <a-form-item label="姓名" style="margin-right: 20px;">
                <a-input placeholder="请输入姓名" v-model:value="keyWord" allowClear="true"/>
            </a-form-item> 
            <a-button type="primary" @click.prevent="handleSubmit" class="seachBtn">查询</a-button>
        </a-form>
        <!-- 临期批改表格 -->
        <div class="criticalTable">
          <a-table
            v-if="currentTable === 'criticalTable'"
            :columns="criticalColumns"
            :data-source="criticalDatasource"
            :pagination="criticalPagination"
            :bordered="true"
            :scroll="{ y: '63vh' }"
            @change="handleCriticalChange"
        >
            <template #bodyCell="{ column }">
              <template v-if="column.dataIndex === 'action'">
                <a-button @click="jumpToFollowDetail" type="text" :style="{color: '#388B7C', fontWeight: '600'}">去批改</a-button>
              </template>
            </template>
          </a-table>
        </div>
        <!-- 逾期未批改表格 -->
        <div class="lateTable">
          <a-table
            v-if="currentTable === 'lateTable'"
            :columns="lateColumns"
            :data-source="lateDatasource"
            :pagination="latePagination"
            :bordered="true"
            :scroll="{ y: '50vh' }"
            @change="handleLateChange"
        >
            <template #bodyCell="{ column }">
              <template v-if="column.dataIndex === 'action'">
                <a-button @click="jumpToFollowDetail" type="text" :style="{color: '#388B7C', fontWeight: '600'}">去批改</a-button>
              </template>
            </template>
          </a-table>
        </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import dayjs from 'dayjs';
  import {ref, reactive,onMounted} from "vue"
  import { useRouter } from 'vue-router'
  import { getFollowNoticeApi, getLateFollowApi} from '@/api/teacher/teacherWorkbench'
  
  const size = ref('large');
  //起止日期
  const startDate = ref();
  const endDate = ref()
  //临期批改与逾期未批改徽标数
  const criticalCount = ref(0)
  const lateCount = ref(0)
  const keyWord = ref()

  // 日期选择框--选择
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      //console.log(dateStrings[0], dateStrings[1]);
      //console.log(typeof(dateStrings[0]),typeof(dateStrings[1]));
      startDate.value = dateStrings[0];
      endDate.value = dateStrings[1];
      console.log(currentTable.value)
      if(currentTable.value === 'criticalTable'){
        console.log("调用临期接口")
        getCriticalList()
      }else if(currentTable.value === 'lateTable'){
        console.log("调用逾期接口")
        getLateList()
      }
    } else {
      console.log('Clear');
      startDate.value = null
      endDate.value = null
      console.log(startDate.value,endDate.value)
      if(currentTable.value === 'criticalTable'){
        getCriticalList()
      }else if(currentTable.value === 'lateTable'){
        getLateList()
      }
    }
  };
  
  // 日期选择框--预设日期
  const rangePresets = ref([
    {
      label: '最近一周',
      value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
      label: '最近两周',
      value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
      label: '最近一月',
      value: [dayjs().add(-30, 'd'), dayjs()],
    },
  ]);
  
  // 默认显示临期批改表格
  const currentTable = ref('criticalTable'); 
  
  // 临期批改--表格--表头
  const criticalColumns = [
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
      width: '15%',
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
      title: '分组',
      dataIndex: 'group',
      align: 'center',
      width: '9%',
    },
    {
      title: '截止日期',
      dataIndex: 'endTime',
      align: 'center',
      width: '13%',
    },
    {
      title: '距截止时间/天',
      dataIndex: 'distanceTime',
      align: 'center',
      width: '10%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: '10%',
    },
  ];
  //查询关键字
  const handleSubmit = () =>{
    console.log('查询',keyWord.value)
    if(currentTable.value === 'criticalTable'){
      getCriticalList()
    }else if(currentTable.value === 'lateTable'){
      getLateList()
    }
  }
  //临期批改--翻页
  const criticalPagination = reactive({  // 表格页码相关设置
      pageSize: 7, //每页最多条目数
      current: 1, //当前页码
      total: 11, //总条目数
      showTotal: (total, range) => `总共 ${total} 条数据`, // 在这里定义显示总数据量的格式
  })
  

  
  // 临期批改--表格数据来源
  const criticalDatasource = ref([]);
  
  //挂载时获取临期批改表格
  onMounted(() => {
    getLateList()
    getCriticalList()
  })
  
  //临期批改--获取临期批改列表
  const getCriticalList = () => {
    
  }
  
  //临期批改--处理翻页
  const handleCriticalChange = (e) => {
    criticalPagination.current = Number(e.current)
    getCriticalList()
  }
  
  //逾期未批改--表头
  const lateColumns = [
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
      width: '15%',
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
      title: '分组',
      dataIndex: 'group',
      align: 'center',
      width: '9%',
    },
    {
      title: '截止日期',
      dataIndex: 'endTime',
      align: 'center',
      width: '13%',
    },
    {
      title: '逾期时间/天',
      dataIndex: 'overdueTime',
      align: 'center',
      width: '10%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: '10%',
    },
  ]
  
  //逾期未批改--翻页
  const latePagination = reactive({  // 表格页码相关设置
      pageSize: 7, //每页最多条目数
      current: 1, //当前页码
      total: 11, //总条目数
      showTotal: (total, range) => `总共 ${total} 条数据`, // 在这里定义显示总数据量的格式
  })
  
  
  // 逾期未批改--表格数据来源
  const lateDatasource = ref([]);
  
  //逾期未批改--获取逾期未批改列表
  const getLateList = () => {
    
  }
  
  //逾期未批改--处理翻页
  const handleLateChange = (e) => {
    latePagination.current = Number(e.current)
    getLateList()
  }

  //点击“去批改”，跳转到“批改详情”页面
  const router = useRouter()
  const jumpToFollowDetail = () => {
    router.push({ path: '/followDetail'})
  }
  </script>
  
  <style lang="less" scoped>
  .notiLayout{
    display: flex;
    height: 100%;
    .searchBox{
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-top:10px;
      // width: 500px;
      // height:600px;
      box-shadow:2px 2px 5px #535252;
      // align-items: center; /* 新增的样式 */
      .dataPick{
        margin-top: 20px;
        margin-left: 10px;
      }
      .criticalBtn{
        margin-top: 370px;
        margin-left:20px;
        width:400px;
        height: 60px;
        font-size: 18px;
      }
      .lateBtn{
        margin-top: 50px;
        margin-left:20px;
        width:400px;
        height: 60px;
        font-size: 18px;
      }
    }
    .tableBox{
      flex: 2;
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      margin-top:10px;
      margin-left:10px;
      box-shadow:2px 2px 5px #535252;
      .searchForm{
        margin-top:3px;
        width: 362px;
        padding-top: 20px;
        display: flex;//检索框和按钮在一排
        .seachBtn{
          width: 100px;
        }
      }
      //.criticalTable{
      //  height:200px;
      //}
      //.lateTable{
      //  margin-top: 20px;
      //}
    }
  }
  
  :deep(.ant-table-thead > tr > th) {
    background: #D3DED8 !important;
  }
  :deep(.ant-table-wrapper .ant-table-thead>tr>th .ant-table-wrapper tfoot>tr>td){
    padding: 8px 8px !important;
  }
  :deep(.ant-table-wrapper .ant-table-tbody>tr>td .ant-table-wrapper tfoot>tr>td){
    padding: 8px 8px !important;
  }
  </style>
  @/api/teacher/teacherWorkbench