<!-- 护士长--计划管理--随访问卷制作--随访问卷的问卷参数 -->
<template>
    <div class="content">
        <!-- 问卷题 -->
        <a-form
            class="questionForm"
            ref="formRef"
            name="questions_form"
            :model="questionValidateForm"
        >
            <a-space
                v-for="(question, index) in questionValidateForm.questions"
                :key="question.id"
                style="display: flex; margin-bottom: 1vh"
                align="baseline"
                direction="vertical"
            >
                <div class="number">第{{index+1}}题</div>
                <!-- 问题类型 -->
                <a-form-item
                    label="问题类型"
                    :name="['questions', index, 'type']"
                    :rules="{
                        required: true,
                        message: '问题类型不能为空',
                        trigger: 'change',
                    }"
                    class="formItem"
                >
                    <a-radio-group v-model:value="question.type">
                        <a-radio :value="0">单选题</a-radio>
                        <a-radio :value="1">多选题</a-radio>
                    </a-radio-group>
                </a-form-item>
                <!-- 问题 -->
                <a-form-item
                    label="问题"
                    :name="['questions', index, 'value']"
                    :rules="{
                        required: true,
                        message: '问题不能为空',
                        trigger: 'change',
                    }"
                >
                    <a-select
                        v-model:value="question.value"
                        :options="questionList.map(item => ({ value: item }))"
                        style="width: 300px"
                        allowClear
                    >
                    </a-select>
                    <a-button type="text" @click="removeQuestion(question)"><MinusCircleOutlined />删除题目</a-button>
                </a-form-item>
                <!-- <a-divider style="height: 1px; background-color: #BBBBBB" /> -->
            </a-space>
        </a-form>
        <div class="btn">
            <a-config-provider
                :theme="{
                    token: {
                        colorPrimary: '#4096ff',
                    },
                }"
            >
                <a-button type="primary" class="submitBtn" @click="addQuestion">增加题目</a-button>
            </a-config-provider>
            <a-button type="primary" html-type="submit" @click="submitForm">提交</a-button>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue"
import { MinusCircleOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const questionList = ref([]) //问题列表
const formRef = ref()
const questionValidateForm = reactive({
  questions: [], // 表单的题目选择数据
})

onMounted(() => {
    getQuestionContent()
})
// 获取问卷制作中的相关信息
const getQuestionContent = () => {
    questionList.value = ['有无高血压', '有无冠心病', '有无吸烟史', '有无饮酒史']
    questionValidateForm.questions = [
        { type: 0, value: '有无高血压', id: '001' },
        { type: 1, value: '有无饮酒史', id: '002' },
    ]
}
//  点击“提交”按钮
const submitForm = () => {
    formRef.value.validate().then(() => {
        console.log('values', questionValidateForm.questions)
        router.push({ path: '/questionnaire'})
    }).catch(error => {
        console.log('error', error)
    })
}
// 点击“删除题目”按钮
const removeQuestion = item => {
    const index = questionValidateForm.questions.indexOf(item)
    if (index !== -1) {
        questionValidateForm.questions.splice(index, 1)
    }
}
// 点击“增加题目”按钮
const addQuestion = () => {
    questionValidateForm.questions.push({
        type: '', // 问题类型 单选为0 or 多选为1
        value: '', // 问题
        id: Date.now(), // id目前是按照时间戳来设置的，具体的值待和后端商议
    })
}
</script>

<style lang="less" scoped>
.content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .questionForm {
        width: 90%;
        min-height: 45vh;
        max-height: 45vh;
        overflow-y: auto;
        box-shadow: 3px 3px 11px rgba(0, 0, 0, 0.2);
        padding: 1vh 2vw;
        margin-top: 1vh;
        .number {
            font-size: 18px;
            font-weight: bold;
        }
        .formItem {
            margin-bottom: 1px;
        }
    }
    .btn {
        display: flex;
        margin-top: 2.2vh;
        .submitBtn {
            margin-right: 5vw;
        }
    }
}

</style>