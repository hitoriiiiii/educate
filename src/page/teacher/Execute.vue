<!-- 教师--执行情况 -->
<template>

<div>
    <a-modal v-model:open="hopen" width="1000px" :title=historydetail.content @ok="handleOk">
      <p v-bind:text="historydetail.detail">{{ historydetail.detail }}</p>
    </a-modal>
  </div>


<div class="bg">
<div style="display: flex; justify-content: flex-end;">
  <br>
<a-button type="primary" @click="showDrawer" style="margin-top: 10px; margin-right: 10px;">历史记录</a-button>
      <a-drawer :width="500" title="历史记录" :placement="placement" :open="open" @close="onClose">
        <template #extra>
          <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
          <!-- <a-button type="primary" @click="onClose">Submit</a-button> -->
        </template>


          <!-- 历史记录列表 -->
        <a-list size="large" :data-source="history">
        <template #renderItem="{ item }">
          <a-list-item>
            {{ item.content}}
                time：
            {{ item.time.substring(0, 10) }}
            <template #extra>
              <a-button style="margin-right: 8px" @click="getHistoryDetail(item.index)">查看</a-button>
            </template>
        </a-list-item>
        </template>
      </a-list>



      </a-drawer>
</div>

  
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
    <!-- 输入框 -->
        <br />
        <br />
        <div style="display: flex; justify-content: center;">
    
          <!-- 加载框 :spinning="spinning" -->
          <a-spin size="large" tip="Loading..." :spinning="spinning">
            </a-spin>
          </div>
        <div  style="display: flex; justify-content: center;">
          
          <a-textarea :rows="16" v-model:value="answer" placeholder="这里显示生成结果，您可以进行相应修改" style="width: 90% ;" />
        </div>
        <div style="display: flex; justify-content: center;">
       <a-form-item class="submitButton" >
        <br />

            <a-button type="primary" html-type="submit" @click="confirm(text)">保存</a-button>
      </a-form-item>
       </div>     

       <div  style="display: flex; justify-content: center;">
        <a-textarea v-model:value="text" placeholder="请在此输入要生成的内容" :rows="5" style="width: 80% ;"/>
        <a-form-item class="submitButton" style="margin-left: 10px; margin-top: 40px;">
            <a-button type="primary" html-type="submit" @click="send(text)" >发送</a-button>
        </a-form-item>
        <!-- <a-form-item class="submitButton">
            <a-button type="primary" html-type="submit" @click="getHistory">ceshi1</a-button>
        </a-form-item> -->
         </div>
      </div>
      
</template>

<script setup>
import {ref, reactive,computed, onMounted} from "vue"
import { message } from 'ant-design-vue';
import {executeApi,historyApi,detailApi} from '@/api/teacher/executeApi'
import dayjs from 'dayjs'
import { getChatResponse,closeWebSocketConnection } from '@/api/ApiChat'
import request from '@/api/base/request'
//历史细则弹窗
const hopen = ref(false);


const handleOk = e => {
  console.log(e);
  hopen.value = false;
};

//历史记录详情
const historydetail = ref({content:'',detail:''});
  


// const history = [
//   {content:'记录1',
//   index:'0001'},
//   {content:'记录2',
//   index:'0002'},
//   {content:'记录1',
//   index:'0003'},
//   {content:'记录1',
//   index:'0004'},
//   {content:'记录1',
//   index:'0005'},
// ];
let history = ref([
]);

const placement = ref('right');
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};

//日期选择按钮样式
const size = ref('large');
const selectedButton = ref('month');//默认按钮为“月”
const activeColor = ref('#1168C8');
const inactiveColor = ref('black');

//绑定handleButtonClick和selectedButton的值
  const handleButtonClick = (button) =>{
    selectedButton.value = button;
  };
let text = ref('');

let handledtext = computed(() => {
  return `你现在作为一名高校教师，请帮我生成一份关于${text.value}的智能教案`;
});

//加载中
let spinning = ref(false);
  
let answer = ref('');
let save = ref(false);

//view history
const viewHistory = (index) =>{
  console.log(index)
}


  // 向后端传入数据
    const getExecuteData1 = () =>{
      const sendTime = new Date().getTime();
      // let sendContent = 'test data -- send';
      // let  returnContent = 'test data -- get';
      let dialogue = [
            {
                "time": sendTime,
                "type": 0,
                // "content": sendContent
                "content": text.value
            },
            {
                "time":sendTime + 1000,
                "type": 1,
                "content": answer.value
                // "content": returnContent
            }
        ]
        // console.log(dialogue)
      if (dialogue){
        executeApi(dialogue).then((res)=>{
          console.log('调用接口',res)
          if(res.data.success === true){
            console.log(res)
            message.info('保存成功！！');
            setTimeout(()=>{
                  history.value=[];
                getHistory()
            },100)
          }else{
            console.log('上传失败'+res.data.code)
          }
        })
      }
    }

    //历史记录
     const getHistory = () =>{
        historyApi().then((res)=>{
          console.log('调用接口',res)
          if(res.data.success === true){
            console.log(res)
            for (let i = 0; i < res.data.data.length; i++) {
            history.value.push(
              {
                time: res.data.data[i].end_time,
                content: res.data.data[i].content,
                index: res.data.data[i].dialogue_id,
              }
            );
           }
          }else{
            console.log('失败'+res.data.code)
          }
        })
      }

      //历史detail
      const getHistoryDetail = (historyindex) =>{
        detailApi(historyindex).then((res)=>{
          console.log('调用接口',res)
          if(res.data.success === true){
            console.log('打印' + res.data.data[0].content)
            console.log('打印' + res.data.data[1].content)
            historydetail.value.content = res.data.data[1].content
            historydetail.value.detail = res.data.data[0].content
            console.log(res)
            hopen.value = true;
          }else{
            console.log('失败'+res.data.code)
          }
        })
      }

    // AI提交问题返回答案
    const send = () => {
      spinning.value = true;
          getChatResponse(handledtext.value).then((res) => {
            answer.value = res
            spinning.value = false;
            // console.log(answer.value)
            // printText(answer.value)
            // getExecuteData1();
          })
          // console.log(handledtext.value)
          
        };
      const closeconnection=()=>{
        text = '',
        closeWebSocketConnection()
      };
      const confirm = () => {
        getExecuteData1();
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
    // getExecuteData()
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
    // getExecuteData()
  }
};

//选择年
const handleYearChange = () => {
  if (year.value) {
    const pickYear = new Date(year.value);
    const startOfYear = new Date(pickYear.getFullYear(), 0, 1);
    const endOfYear = new Date(pickYear.getFullYear(), 11, 31);
    startDate.value = formatDate(startOfYear);
    endDate.value = formatDate(endOfYear);
    // console.log(startDate.value +'-' + endDate.value)
    // getExecuteData()
  }
};

// 格式化日期为YYYY-MM-DD格式
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


//执行情况数据
const executeData = ref({
  all: 0,
  completed: 0,
  uncompleted: 0,
  abnormal: 0,
  overdue: 0,
});

onMounted(() => {
  setTimeout(()=>{
    selectedMonth.value = dayjs()
    // handleMonthChange()
    // getExecuteData()
    getHistory()
  },100)
});

//调用接口，获取执行情况数据
const getExecuteData = () =>{
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
          color:#c2ddfd;
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