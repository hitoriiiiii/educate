<!-- 教师--执行情况 -->
<template>
  <div class="bg">
    <!-- 日期选择按钮 -->
    <div class="btn">
      <!-- "日"按钮 -->
      <a-button 
        type="link" 
        :size="size" 
        class="custom-link-button"
        v-model:value="day"
        :style="{ 
            color: selectedButton === 'day' ? activeColor : inactiveColor,//通过selectedButton的值变换样式 
            fontSize: selectedButton === 'day' ? '20px' : '18px' 
        }"
        @click="handleButtonClick('day')"
      >
          日
      </a-button>
      <!-- "周"按钮 -->
      <a-button 
        type="link" 
        :size="size" 
        v-model:value="week"
        class="custom-link-button"
        :style="{
            color: selectedButton === 'week' ? activeColor : inactiveColor,
            fontSize: selectedButton === 'week' ? '20px' : '18px'
        }"
        @click="handleButtonClick('week')"
      >
        周
      </a-button>
      <!-- "月"按钮 -->
      <a-button 
        type="link" 
        :size="size" 
        v-model:value="selectedMonth"
        class="custom-link-button"
        :style="{
            color: selectedButton === 'month' ? activeColor : inactiveColor,
            fontSize: selectedButton === 'month' ? '20px' : '18px'
        }"
        @click="handleButtonClick('month')"
      >
        月
      </a-button>
      <!-- "年"按钮 -->
      <a-button 
        type="link" 
        :size="size" 
        v-model:value="year"
        class="custom-link-button"
        :style="{
            color: selectedButton === 'year' ? activeColor : inactiveColor,
            fontSize: selectedButton === 'year' ? '20px' : '18px'
        }"
        @click="handleButtonClick('year')"
      >
        年
      </a-button>
    </div>
    <!-- 日期选择框，通过selectedButton的值显示日期选择框 -->
    <div class="datePicks">
      <!-- "日"选择框 -->
      <a-date-picker 
        v-if="selectedButton === 'day'" 
        v-model:value="day" 
        :size="size" 
        :bordered="false" 
        class="datePick"
        @change="handleDateChange"
      />
      <!-- "周"选择框 -->
      <a-date-picker 
        v-if="selectedButton === 'week'" 
        v-model:value="week" 
        picker="week" 
        :size="size" 
        :bordered="false" 
        class="datePick"
        @change="handleWeekChange"
      />
      <!-- "月"选择框 -->
      <a-date-picker 
        v-if="selectedButton === 'month'"
        v-model:value="selectedMonth" 
        picker="month" 
        :size="size" 
        :bordered="false" 
        class="datePick"
        @change="handleMonthChange"
      />
      <!-- "年"选择框 -->
      <a-date-picker 
        v-if="selectedButton === 'year'"
        v-model:value="year" 
        picker="year" 
        :size="size" 
        :bordered="false" 
        class="datePick"
        @change="handleYearChange"
      />
    </div>
    <!-- 分割线 -->
    <hr style="width:80%">
    <!-- 导出按钮 -->
    <a-button type="primary" class="exportbtn" @click="exportToExcel">导出为excel</a-button>
    <!-- 执行情况描述列表 -->
    <a-descriptions 
      bordered
      :column="2"
      class = "executeDescrip"
    >
      <a-descriptions-item label="批改任务数" :span="2" style="font-weight:500">{{ executeData.all }}</a-descriptions-item>
      <a-descriptions-item label="已批改数" style="font-weight:500">{{ executeData.completed }}</a-descriptions-item>
      <a-descriptions-item label="已批改比例" style="font-weight:500">{{ completedRatio }}</a-descriptions-item>
      <a-descriptions-item label="未批改数" style="font-weight:500">{{ executeData.uncompleted }}</a-descriptions-item>
      <a-descriptions-item label="未完成比例" style="font-weight:500">{{ uncompletedRatio }}</a-descriptions-item>
      <a-descriptions-item label="批改异常数" style="font-weight:500">{{ executeData.abnormal }}</a-descriptions-item>
      <a-descriptions-item label="批改异常比例" style="font-weight:500">{{ abnormalRatio }}</a-descriptions-item>
      <a-descriptions-item label="逾期未批改数" style="font-weight:500">{{ executeData.overdue }}</a-descriptions-item>
      <a-descriptions-item label="逾期比例" style="font-weight:500">{{ overdueRatio }}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script setup>
import {ref, reactive,computed, onMounted} from "vue"
import XLSX from 'xlsx';
import {executeApi} from '@/api/nurse/executeApi'
import dayjs from 'dayjs'

//日期选择按钮样式
const size = ref('large');
const selectedButton = ref('month');//默认按钮为“月”
const activeColor = ref('green');
const inactiveColor = ref('black');

//绑定handleButtonClick和selectedButton的值
const handleButtonClick = (button) =>{
  selectedButton.value = button;
};
const day = ref();
const week = ref();
const selectedMonth = ref();
const year = ref();
const startDate = ref();
const endDate = ref();

//选择日
const handleDateChange = () =>{
  if (day.value) {
    startDate.value = formatDate(new Date(day.value));
    endDate.value = formatDate(new Date(day.value));
    console.log(day.value)
    // console.log(startDate.value +'-' + endDate.value)
    getExecuteData()
  } 
};

//选择周
const handleWeekChange = () => {
  if (week.value) {
    const pickDay = new Date(week.value);//将字符串转换为日期对象
    const dayOfWeek = pickDay.getDay();
    const startOfWeek = new Date(pickDay.getFullYear(), pickDay.getMonth(), pickDay.getDate() - (dayOfWeek - 1));
    const endOfWeek = new Date(pickDay.getFullYear(), pickDay.getMonth(), pickDay.getDate() + (7 - dayOfWeek));
    startDate.value = formatDate(startOfWeek);
    endDate.value = formatDate(endOfWeek);
    // console.log(startDate.value +'-' + endDate.value)
    getExecuteData()
  }
};

//选择月
const handleMonthChange = () => {
  if (selectedMonth.value) {
    const monthString = selectedMonth.value.toISOString().split('T')[0];
    const monthParts = monthString.split('-')
    const year = parseInt(monthParts[0]);
    const month = parseInt(monthParts[1]) - 1;
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    startDate.value = formatDate(start);
    endDate.value = formatDate(end);
    // console.log(selectedMonth.value)
    // console.log(startDate.value +'-' + endDate.value)
    getExecuteData()
  }
};

//选择年
const handleYearChange = () => {
  if (year) {
    const pickYear = new Date(year.value);
    const startOfYear = new Date(pickYear.getFullYear(), 0, 1);
    const endOfYear = new Date(pickYear.getFullYear(), 11, 31);
    startDate.value = formatDate(startOfYear);
    endDate.value = formatDate(endOfYear);
    // console.log(startDate.value +'-' + endDate.value)
    getExecuteData()
  }
};

// 格式化日期为YYYY-MM-DD格式
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

//导出为excel
const exportToExcel = () => {
  const XLSX = require('xlsx');
  const data = [
    ['任务类型', '数量/比例'],
    ['批改任务数', executeData.value.all],
    ['已批改数', executeData.value.completed],
    ['已批改比例', completedRatio.value],
    ['未批改数', executeData.value.uncompleted],
    ['未完成比例', uncompletedRatio.value],
    ['批改异常数', executeData.value.abnormal],
    ['批改异常比例', abnormalRatio.value],
    ['逾期未批改数', executeData.value.overdue],
    ['逾期比例', overdueRatio.value],
  ];
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, '执行情况.xlsx');
};

//执行情况数据
const executeData = ref({
  all: 0,
  completed: 0,
  uncompleted: 0,
  abnormal: 0,
  overdue: 0,
});

//计算执行情况中各类情况的比例
const completedRatio = computed(() => {
  if (executeData.value.all === 0) {
    return '0%';
  }
  const ratio = (executeData.value.completed / executeData.value.all) * 100;
  return ratio.toFixed(0) + '%';
});

const uncompletedRatio = computed(() => {
  if (executeData.value.all === 0) {
    return '0%';
  }
  const ratio = (executeData.value.uncompleted / executeData.value.all) * 100;
  return ratio.toFixed(0) + '%';
});

const abnormalRatio = computed(() => {
  if (executeData.value.all === 0) {
    return '0%';
  }
  const ratio = (executeData.value.abnormal / executeData.value.all) * 100;
  return ratio.toFixed(0) + '%';
});

const overdueRatio = computed(() => {
  if (executeData.value.all === 0) {
    return '0%';
  }
  const ratio = (executeData.value.overdue / executeData.value.all) * 100;
  return ratio.toFixed(0) + '%';
});

//页面挂载时，获取当月数据
onMounted(() => {
  setTimeout(()=>{
    selectedMonth.value = dayjs()
    handleMonthChange()
    getExecuteData()
  },100)
});

//调用接口，获取执行情况数据
const getExecuteData = () =>{
  // if (startDate.value && endDate.value){
  //   executeApi(startDate.value, endDate.value).then((res)=>{
  //     // console.log('调用接口',res)
  //     if(res.data.code === 200){
  //       // console.log(res.data.data)
  //       executeData.value.all = res.data.data.total//批改任务数
  //       executeData.value.completed = res.data.data.completionNumber//已批改数
  //       executeData.value.uncompleted = res.data.data.noFollowedNumber//未批改数
  //       executeData.value.abnormal = res.data.data.exceptionNumber//批改异常数
  //       executeData.value.overdue = res.data.data.overdueNumber//逾期未批改数
  //     }else{
  //       console.log('未获取到起止日期')
  //     }
  //   })
  // }
  executeData.value.all = 50;
    executeData.value.completed = 42;
    executeData.value.uncompleted = 1;
    executeData.value.abnormal = 7;
    executeData.value.overdue = 1;
}
</script>

<style lang="less" scoped>
.bg{
  width: 100%;
  height: 100%;
  margin:0 auto;
  box-shadow:2px 2px 5px #535252;
  background-color: #ffffff95;
  .btn{
      width: 700px;
      height:50px;
      margin:0 auto;
      .custom-link-button{
          color:green;
          font-size: 18px;
          margin-top: 28px;
          margin-left: 100px;
      }
  }
  .datePicks{
      width: 100px;
      height:50px;
      margin:0 auto;
      margin-top:37px;
      .datePick{
          width:160px;
          :deep(.ant-picker-input>input) {
              font-size: 18px !important;
          }
      }
  }
  .exportbtn{
      font-size: 20px;
      width: 140px;
      height: auto;
      margin-top: 10px;
      margin-left: 82%;
  }
  .executeDescrip{
      font-size: 20px;
      width: 80%;
      height: auto;
      margin: 0 auto;
      margin-top: 35px;
  }
  .executeDescrip .ant-descriptions-item-content {
      font-size: 16px;
  }
}
:deep(.ant-descriptions .ant-descriptions-item-label){
  font-size: 16px;
  text-align: center;
  width: 320px;
  height:75px;
}
:deep(.ant-descriptions .ant-descriptions-item-content){
  font-size: 16px;
  text-align: center;
}

</style>