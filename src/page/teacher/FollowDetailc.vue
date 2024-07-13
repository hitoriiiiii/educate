<!-- 教师--批改问卷填写 -->
<template>
    <!-- 患者信息 -->
    <div class="contentHeader">
        <div>
            <a-button type="text" @click="jumpToList">
                <template #icon><LeftOutlined /></template>
            </a-button>
            <span class="contentHeaderText">
                <span>{{ studentInfo.name }}</span>
                <span>{{ studentInfo.sex }}</span>
                <span>{{ studentInfo.age }}岁</span>
                <span>邮箱：{{ studentInfo.email }}</span>
            </span>
        </div>
             
    </div>
    <!-- 问卷信息 -->
    <div class="contentBody">
        <div class="sickDescribe">
            <div class="sickDescribeTitle">学习情况报告</div>
            <div class="sickDescribeContent">这是一段关于学习情况反馈的描述...</div>
        </div>
        <!-- 问卷填写区域 -->
        <div class="questionnaire">
            <div class="questionnaireTitle">
                批改表单
            </div>
            <!-- 问卷表头 -->
            <div class="questionnaireHead">
                <!-- 表头文字 -->
                <span class="questionnaireName">智能指导生成问卷</span><br>
                <span class="questionnaireNotice">
                    <p>本问卷手机您的指导，生成对学生的具体指导</p>
                </span>
                <!-- 异常情况选择 -->
                <div class="abnormalCondition">
                    <span>总体学习状况：</span>
                    <a-radio-group v-model:value="abnormalvalue" @change="abnormalChange">
                        <a-radio :value="0" style="font-size: 16px;">优秀</a-radio>
                        <a-radio :value="1" style="font-size: 16px;">良好</a-radio>
                        <a-radio :value="2" style="font-size: 16px;">一般</a-radio>
                        <a-radio :value="3" style="font-size: 16px;">较差</a-radio>
                    </a-radio-group>
                </div>
            </div>
            <!-- 问卷内容 -->
            <div class="questionnaireContext">
                <a-form
                    :model="answerData"
                    name="basic"
                    autocomplete="off"
                    ref="formRef"
                    :rules="rules"
                >
                    <!-- <a-form-item
                    v-for="(question, index) in questionnaireData"
                    :key="question.id"
                    :label="'第'+(index+1)+'题'"
                    :name=question.question
                    ref="answerDataRef"
                    >
                        <div class="questionTitle">
                            <span style="line-height: 35px;font-size: 16px;">{{ question.question }}</span>
                            <span style="font-size: 16px;line-height: 30px;">({{ question.type==0?'单选题':'多选题' }})</span>
                        </div>
                        <div v-if="question.type==0">
                            <a-radio-group v-model:value="answerData[index].ans">
                                <a-radio 
                                    v-for="(item, index) in question.options" 
                                    :value="index" 
                                    :key="index"
                                    style="font-size: 16px;line-height: 40px;"
                                >
                                    {{ item }}
                                </a-radio>
                            </a-radio-group>
                        </div>
                        <div v-if="question.type==1">
                            <a-checkbox-group v-model:value="answerData[index].ans">
                                <a-checkbox 
                                    v-for="(item, index) in question.options" 
                                    :value="index" 
                                    :key="index"
                                    style="font-size: 16px;line-height: 40px;"
                                    >
                                    {{ item }}
                                </a-checkbox>
                            </a-checkbox-group>
                        </div>
                    </a-form-item> -->
                    <a-form-item
                        style="border-top: 1px dashed #ccc; padding-top: 20px;"
                    >
                        <span style="line-height: 50px;">指导关键词：</span>
                        <a-textarea
                            placeholder="请输入简略的指导的内容，AI帮您生成完整指导"
                            :auto-size="{ minRows: 5, maxRows: 5 }"
                            :style="{width: '85%'}"
                            v-model:value="sendText"
                        />                        
                        <a-button type="primary" html-type="submit" @click="getanswer()">生成</a-button>
                    </a-form-item>
                    <div style="display: flex; justify-content: center;">
    
                    <!-- 加载框 :spinning="spinning" -->
                    <a-spin size="large" tip="Loading..." :spinning="spinning" >
                    </a-spin>
                    </div>
                    <a-form-item
                        style="border-top: 1px dashed #ccc; padding-top: 20px;"
                    >
                        <span style="line-height: 50px;">生成结果：</span>
                        <a-textarea
                            placeholder="此处显示生成后的指导，您可以在此进行修改"
                            :auto-size="{ minRows: 5, maxRows: 5 }"
                            :style="{width: '85%'}"
                            v-model:value="returnText"
                        />
                    </a-form-item>

                    <a-form-item
                    >
                        日期：
                        <a-date-picker v-model:value="answerData[answerDataLen-1].dieData" style="width: 200px;"/>
                    </a-form-item>
                    <a-form-item class="submitButton">
                        <a-button type="primary" html-type="submit" @click="handleSubmit">提交</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>

</template>

<script setup>
import { LeftOutlined } from '@ant-design/icons-vue'
import { ref, onMounted,computed} from "vue"
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue';
import { getChatResponse } from '@/api/ApiChat'
import { poscApi,executeApi} from '@/api/teacher/executeApi'
// import {poscApi,executeApi} from '@/api/teacher/followApi'

let spinning = ref(false);
let sendText = ref('');
let returnText = ref('');
let abnormalvalue = ref(0);
let studyvalue = '优秀';
const abnormalChange = () => {
    if(abnormalvalue.value == 0){
        studyvalue='优秀'
    }
    else  if(abnormalvalue.value == 1){
        studyvalue='良好'
    }
    else  if(abnormalvalue.value == 2){
        studyvalue='一般'
    }
    else  if(abnormalvalue.value == 3){
        studyvalue='较差'
    }
}
let handledtext = computed(() => {
  return `根据关键词：该生总体学习情况${studyvalue}，${sendText.value}，给出职业生涯规划指导`;
});
const getanswer = () => {
            spinning.value = true;
          getChatResponse(handledtext.value).then((res) => {
            spinning.value = false;
            console.log('打印' + res)
            returnText.value = res
            console.log(returnText.value)            
          })
          console.log(sendText.value)
        };


// const studentInfo = ref({
//     name: '刘学生',
//     sex: '女',
//     age: '19',
//     tel: '13800000000',
// })

const route = useRoute();
const studentInfo = ref({
    id:route.query.id,
    name: route.query.name,
    sex: route.query.sex,
    age: route.query.age,
    email: route.query.email,
});

// 根绝来源页面，进行返回跳转
const { params } = useRoute();
const pathSelect = ref([])
if (params.source == 'follow') {
    pathSelect.value = '/follow';
} else if (params.source == 'notifications') {
    pathSelect.value = '/notifications';
}
const router = useRouter()
const jumpToList = () => {
    router.push({
        path: pathSelect.value  // 根据来源路径跳转
    })
}


// const poscApi = (dialogue) => new Promise((resolve, reject) =>{
//     let data =  dialogue
//     // http://127.0.0.1:42878/api/dialog/
//     // {{uid}}
//     // /posc_dialogues?token=
//     // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlYWNoZXJyIiwidWlkIjo2MDEsImV4cCI6MTcyMDc3MzcxNSwibmJmIjoxNzIwNjg2NTE1fQ._KKBG8yIGiYsd478TDcKqMEhZTL4w-WDQJ2VcwJyLmk
//     // &type=1
//     // &teacher_id=601
//     // &student_id=408
//     const uid = localStorage.getItem(config.userUid)
//     let token = localStorage.getItem(config.userToken)
//     let id = studentInfo.value.id
//     // let url = 'api/api/dialog/' + uid + '/posc_dialogues?token=' + token + '&type=0&teacher_id=' + uid;
//     // let url='api/api/dialog/{{uid}}/posc_dialogues?token={{token}}&type=0&teacher_id={{uid}}'
//     let url = 'api/api/dialog/' + uid + '/posc_dialogues?token=' + token + '&type=1&teacher_id=' + uid +'&student_id=' + id;
//     console.log(url)
//     console.log(data)
//     axios({
//         method:'posc',
//         url:url,
//         headers:{
//             "Content-Type": "application/json",
//             "token":token
//         },
//         data:JSON.stringify(data)
//     }).then((response)=>{
//         resolve(response)
//     }).catch((error)=>{
//         reject(error.response)
//     })
// })

const poscData = () =>{
      const sendTime = new Date().getTime();
      let dialogue = [
            {
                "time": sendTime,
                "type": 0,
                // "content": sendContent
                "content": sendText.value
            },
            {
                "time":sendTime + 1000,
                "type": 1,
                "content": returnText.value
                // "content": returnContent
            }
        ]
        // console.log(dialogue),studentInfo.value.id
      if (dialogue){
        poscApi(dialogue,studentInfo.value.id).then((res)=>{
          console.log('调用接口',res)
          if(res.data.success === true){
            console.log(res)
            message.info('提交成功！！');
            // setTimeout(()=>{
            //       history.value=[];
            //     getHistory()
            // },100)
          }else{
            console.log('提交失败'+res.data)
          }
        })
      }
    }



// 获取批改问卷列表
const QuestionnaireList = ref([])
const getQuestionnaireList = () => {
    // 调用接口获取现在数据库中所有的问卷名和问卷id
    QuestionnaireList.value = [
        {id:'1', name:'高等数学'},
        {id:'2', name:'线性代数'},
        {id:'3', name:'程序设计'}
    ]
}
// 异常情况单选框数据

// 填写问卷区域数据
const questionnaireData = ref([
    // 在这里调用接口，默认获取id=1的问卷内容
    {
        id: '1',
        question: '该生学习方向上是否有偏差',
        type: 0,  // 0:单选，1：多选
        options: ['是', '否']
    },
    {
        id: '2',
        question: '该生课堂作业完成情况如何',
        type: 1,  // 0:单选，1：多选
        options: ['优秀', '良好', '一般', '较差']
    },
])
const getQuestionnaireData = value => {
    // 调用接口获取问卷内容（这里已经拿到问卷id，可以根据id，在页面上渲染出问卷内容）
    console.log(`selected: ${value}`);
    // 假设下面就是已经获取到的问卷数据
    questionnaireData.value = [
    ]
}

// 存储问卷答案
let answerData = ref([])
for(let i=0; i<questionnaireData.value.length; i++){
    answerData.value.push({
        id: questionnaireData.value[i].id,
        question: questionnaireData.value[i].question,
        type: questionnaireData.value[i].type,
        ans: []
    })
}

answerData.value.push(  
    { pz: null },
    { dieDate: null }
)
const answerDataLen = answerData.value.length  /* 计算答案问卷长度 */

// 定义验证规则
const formRef = ref(); // 创建一个ref来引用表单实例
const rules = {
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ]
}
// 提交之前进行表单验证
const handleSubmit = () => {
    // formRef.value
    // .validate()
    // .then(() => {
    //     console.log('access', answerData.value);
    //     alert('提交成功')
    //     // 提交成功之后，刷新页面
    //     window.location.reload()
    // })
    // .catch(error => {
    //     console.log('error', error);
    // });
    poscData()
}

onMounted(() => {
    getQuestionnaireList()
    // console.log(answerData.value)
    // console.log(studentInfo.value.id)
})
</script>

<style lang="less" scoped>
.contentHeader {
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    .contentHeaderText {
        span {
            margin-right: 10px;
            font-size: 16px;
        }
    }
}
.contentBody {
    height: 93%;
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* 子div水平居中 */
    .sickDescribe {
        background-color: #c2ddfd;
        height: 100px;
        overflow-y: auto;
        width: 70%;
        margin-top: 15px;
        margin-bottom: -5px;  /* 抵消flex-wrap换行之后造成的行间距 */
        .sickDescribeTitle {
            margin-left: 50px;
            margin-top: 5px;
            font-size: 16px;
            color: #1168C8;
            font-weight: bold;
        }
        .sickDescribeContent {
            margin-left: 50px;
            margin-right: 50px;
            margin-top: 10px;
            font-size: 15px;
            text-align: justify;  /*设置文字两端对齐*/
            line-height: 20px;
        }
    }
    .questionnaire {
        // background-color: yellow;
        border: 1px solid #ccc;
        width: 70%;
        height: 80%;
        overflow-y: auto;
        .questionnaireTitle {
            border-bottom: 1px dashed #ccc;
            margin-left: 50px;
            margin-right: 50px;
            margin-top: 15px;
            padding-bottom: 5px;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: bold;
        }
        .questionnaireHead {
            .questionnaireName {
                display: block;
                text-align: center;
                font-size: 20px;
            }
            .questionnaireNotice {
                p {
                    margin-left: 50px;
                    margin-right: 50px;
                    margin-bottom: 10px;
                    font-size: 16px;
                    text-align: justify;
                    line-height: 23px;
                    color: #4b4a4ae1;
                }
            }
            .abnormalCondition {
                margin-left: 50px;
                margin-top: 25px;
                margin-bottom: 5px;
                span {
                    font-weight: bold;
                    font-size: 16px;
                    color: #EE3B3B
                }
            }
        }
        .questionnaireContext {
            margin-left: 50px;
            margin-right: 50px;
            padding-top: 20px;
            :deep(.ant-form-item-label >label){
                font-size: 18px;
                font-weight: bold;
                margin-right: 10px;
            }
            .questionTitle {
                background-color: #c2ddfd;
                width: auto;
                border-radius: 10px;
                
                padding-left: 15px;
            }
            .submitButton {
                margin-top: 30px;
                margin-bottom: 15px;
                text-align: center;
            }
        }
    }
}
</style>