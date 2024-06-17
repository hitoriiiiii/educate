<!-- 护士长--计划管理--随访问卷列表--问卷详情 -->
<template>
    <!-- 问卷详情区域 -->
    <div class="questionnaire">
        <div class="questionnaireTitle">
            <span>适用对象：乳腺癌-轻症</span>
            <span>随访周期：30天</span>
            <a-button type="primary" @click="jumpToAddDetail()">编辑</a-button>
        </div>
        <!-- 问卷表头 -->
        <div class="questionnaireHead">
            <!-- 表头文字 -->
            <span class="questionnaireName">乳腺癌-轻症随访问卷</span><br>
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
            >
                <!-- 问题 -->
                <a-form-item
                v-for="(question, index) in questionnaireData"
                :key="question.id"
                :label="'第'+(index+1)+'题'"
                :name=question.question
                ref="answerDataRef"
                :rules="[{ required: true, message: '请选择', trigger: 'submit' }]"
                >
                    <div class="questionTitle">
                        <span style="line-height: 35px;font-size: 16px;">{{ question.question }}</span>
                        <span style="font-size: 16px;line-height: 30px;">({{ question.type==0?'单选题':'多选题' }})</span>
                    </div>
                    <!-- 根据type判断是多选题还是单选题 -->
                    <!-- 若为单选题 -->
                    <div v-if="question.type==0">
                        <a-radio-group v-model:value="answerData[index].ans" >
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
                <!-- 备注 -->
                <a-form-item
                    style="border-top: 1px dashed #ccc; padding-top: 20px;"
                >
                    <span style="line-height: 50px;">备注：</span>
                    <a-textarea
                        placeholder="请输入要备注的内容"
                        :auto-size="{ minRows: 2, maxRows: 2 }"
                        :style="{width: '85%'}"
                    />
                </a-form-item>
                <!-- 死亡时间 -->
                <a-form-item
                >
                    是否死亡：
                    <a-date-picker v-model:value="value1" style="width: 200px;"/>
                </a-form-item>
                <a-form-item class="submitButton">
                    <a-button type="primary">提交</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()

// 点击“编辑”按钮跳转到对应问卷的编辑界面
const jumpToAddDetail = (name) => {
    router.push({
        path: '/addQuestion',
        query: {
            questionName: name  // 将questionName作为查询参数，其值为传入的name参数
        }
    })
}

// 获取随访问卷列表
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
    {
        id: '1',
        question: '您是否在近3个月内患过Breast Cancer？',
        type: 0,  // 0:单选，1：多选
        options: ['是', '否']
    }
])

// 存储问卷答案
let answerData = ref([])
for(let i=0; i<questionnaireData.value.length; i++){
    answerData.value.push({
        id: questionnaireData.value[i].id,
        question: questionnaireData.value[i].question,
        type: questionnaireData.value[i].type,
        ans: [],
    })
}

onMounted(() => {
    getQuestionnaireList()
    console.log(answerData.value)
})
</script>

<style lang="less" scoped>
    .questionnaire {
        width: 100%;
        min-height: 83vh;
        max-height: 83vh;
        overflow-y: auto;
        .questionnaireTitle {
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            border-bottom: 1px dashed #ccc;
            margin-left: 50px;
            margin-right: 50px;
            margin-top: 15px;
            padding-bottom: 5px;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .questionnaireHead {
            .questionnaireName {
                display: block;
                text-align: center;
                font-size: 20px;
                color: #368467;
                font-weight: bold;
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
</style>
