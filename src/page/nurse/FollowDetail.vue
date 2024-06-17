<!-- 教师--批改问卷填写 -->
<template>
    <!-- 患者信息 -->
    <div class="contentHeader">
        <div>
            <a-button type="text" @click="jumpToList">
                <template #icon><LeftOutlined /></template>
            </a-button>
            <span class="contentHeaderText">
                <span>{{ patientInfo.name }}</span>
                <span>{{ patientInfo.sex }}</span>
                <span>{{ patientInfo.age }}岁</span>
                <span>电话：{{ patientInfo.tel }}</span>
            </span>
        </div>
        <div style="font-size: 16px;">
            选择批改问卷：
            <a-select 
                style="width: 270px;" 
                placeholder="请选择批改问卷" 
                v-model:value="selectedValue" 
                @change="getQuestionnaireData"
            >
                <a-select-option v-for="item in QuestionnaireList" :value=item.id :key=item.id>{{ item.name }}</a-select-option>
            </a-select>
            <!-- <a-button type="primary">确定</a-button> -->
        </div>        
    </div>
    <!-- 问卷信息 -->
    <div class="contentBody">
        <!-- 病理报告 -->
        <div class="sickDescribe">
            <div class="sickDescribeTitle">病理报告</div>
            <div class="sickDescribeContent">这是一段关于病理报告的描述...</div>
        </div>
        <!-- 问卷填写区域 -->
        <div class="questionnaire">
            <div class="questionnaireTitle">
                批改表单
            </div>
            <!-- 问卷表头 -->
            <div class="questionnaireHead">
                <!-- 表头文字 -->
                <span class="questionnaireName">乳腺癌-轻症批改问卷</span><br>
                <span class="questionnaireNotice">
                    <p>本问卷旨在收集您在我们医院接受治疗和护理过程中的体验和感受。我们关注您的健康状况、治疗效果以及对医院环境和服务的整体满意度。我们承诺，所有收集到的信息将仅用于改善我们的服务，并严格保密。</p>
                    <p>问卷填写预计需要5-10分钟。请根据您的实际体验，尽可能详细地回答以下问题。您的每一条建议都将被我们认真考虑，并用于改进我们的服务流程和质量。</p>
                </span>
                <!-- 异常情况选择 -->
                <div class="abnormalCondition">
                    <span>异常情况：</span>
                    <a-radio-group v-model:value="abnormalvalue" @change="abnormalChange">
                        <a-radio :value="0" style="font-size: 16px;">无异常</a-radio>
                        <a-radio :value="1" style="font-size: 16px;">电话挂断</a-radio>
                        <a-radio :value="2" style="font-size: 16px;">电话未接通</a-radio>
                        <a-radio :value="3" style="font-size: 16px;">空号</a-radio>
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
                    <a-form-item
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
                        <!-- 根据type判断是多选题还是单选题 -->
                        <!-- 若为单选题 -->
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
                        <!-- 若为多选题 -->
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
                    </a-form-item>
                    <a-form-item
                        style="border-top: 1px dashed #ccc; padding-top: 20px;"
                    >
                        <span style="line-height: 50px;">备注：</span>
                        <a-textarea
                            placeholder="请输入要备注的内容"
                            :auto-size="{ minRows: 2, maxRows: 2 }"
                            :style="{width: '85%'}"
                            v-model:value="answerData[answerDataLen-2].pz"
                        />
                    </a-form-item>
                    <a-form-item
                    >
                        是否死亡：
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
import { ref, onMounted} from "vue"
import { useRouter, useRoute } from 'vue-router'

const patientInfo = ref({
    name: '刘岚芝',
    sex: '女',
    age: '25',
    tel: '13800000000',
})
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
// 获取批改问卷列表
const QuestionnaireList = ref([])
const getQuestionnaireList = () => {
    // 调用接口获取现在数据库中所有的问卷名和问卷id
    QuestionnaireList.value = [
        {id:'1', name:'乳腺癌-轻症'},
        {id:'2', name:'乳腺癌-重症'},
        {id:'3', name:'胃癌-轻症'},
        {id:'4', name:'胃癌-重症'}
    ]
}
// 异常情况单选框数据
const abnormalvalue = ref(0);
const abnormalChange = () => {
    if(abnormalvalue.value !== 0){
        // 如果异常情况value值不为0，则表示存在异常情况，则下面的问卷所有的问题都“取消必填”
        console.log("异常情况:", abnormalvalue.value)
    }
}
// 填写问卷区域数据
const questionnaireData = ref([
    // 在这里调用接口，默认获取id=1的问卷内容
    {
        id: '1',
        question: '您是否在近3个月内患过Breast Cancer？',
        type: 0,  // 0:单选，1：多选
        options: ['是', '否']
    },
    {
        id: '2',
        question: '请问在过去的一个月里，您有以下哪些症状？',
        type: 1,  // 0:单选，1：多选
        options: ['头痛', '耳鸣', '听力下降', '鼻塞', '其他', '无明显症状']
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
/* 初始化“备注”和“死亡日期”*/
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
    formRef.value
    .validate()
    .then(() => {
        console.log('access', answerData.value);
        alert('提交成功')
        // 提交成功之后，刷新页面
        window.location.reload()
    })
    .catch(error => {
        console.log('error', error);
    });
}

onMounted(() => {
    getQuestionnaireList()
    console.log(answerData.value)
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
        background-color: #B4D4CE;
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
                background-color: rgba(0, 102, 80, 0.1);
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