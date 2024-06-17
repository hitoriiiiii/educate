<!-- 护士长--计划管理--随访进程管理-患者随访记录 -->
<template>
    <div class="followLog">
        <!-- 患者基本信息 -->
        <div class="patientInfo">
            <div style="line-height: 40px;">
                <span>{{ patientInfo.name }}</span>
                <span>{{ patientInfo.sex }}</span>
                <span>{{ patientInfo.age }}岁</span>
                <span>电话：{{ patientInfo.tel }}</span>
                <span class="disease">{{ patientInfo.disease }}</span>
            </div>
            <div>
                <a-button type="primary" @click="jumpToList">返回</a-button>
            </div>
        </div>
        <!-- 随访记录查看 -->
        <div class="quesnaireDetail">
            <!-- 时间轴 -->
            <div class="timeLine">
                <a-steps
                  v-model:current="current"
                  :items=timeLineData
                  @change="timeLineClick"
                >
                    <template #progressDot="{ index, prefixCls }">
                        <a-popover>
                          <!-- <template #content>
                            <span>step {{ index+1 }} status: {{ status }}</span>
                          </template> -->
                            <span  :class="`${prefixCls}-icon-dot`" />
                        </a-popover>
                    </template>
                </a-steps>
            </div>
            <!-- 问卷内容 -->
            <div class="quesnaireContent">
                <!-- 异常情况 -->
                <div class="abnormalCondition">
                    <span>异常情况：</span>
                    <div @click.stop.prevent="onContainerClick" :style="{ cursor: isReadOnly ? 'not-allowed' : 'auto' }">
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
                                    <div @click.stop.prevent="onContainerClick" :style="{ cursor: isReadOnly ? 'not-allowed' : 'auto' }">
                                        <a-radio 
                                            v-for="(item, index) in question.options" 
                                            :value="index" 
                                            :key="index"
                                            style="font-size: 16px;line-height: 40px;"
                                        >
                                            {{ item }}
                                        </a-radio>
                                    </div>
                                </a-radio-group>
                            </div>
                            <!-- 若为多选题 -->
                            <div v-if="question.type==1">
                                <a-checkbox-group v-model:value="answerData[index].ans">
                                    <div @click.stop.prevent="onContainerClick" :style="{ cursor: isReadOnly ? 'not-allowed' : 'auto' }">
                                        <a-checkbox 
                                            v-for="(item, index) in question.options" 
                                            :value="index" 
                                            :key="index"
                                            style="font-size: 16px;line-height: 40px;"
                                            >
                                            {{ item }}
                                        </a-checkbox>
                                    </div>
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
                                v-model:value="answerData[answerData.length-2].pz"
                                readonly="true"
                            />
                        </a-form-item>
                        <!-- 死亡时间 -->
                        <a-form-item
                        >
                            是否死亡：
                            <a-input 
                                v-model:value="answerData[answerData.length-1].diedate" 
                                style="width: 200px;"
                                readonly="true"
                                >
                            </a-input>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import {useRouter} from "vue-router"

// 患者信息
const patientInfo = ref({
    id:'1',
    name: '刘岚芝',
    sex: '女',
    age: '25',
    tel: '13800000000',
    disease: '乳腺癌-轻症'
})

// 跳转到随访列表
const router = useRouter()
const jumpToList = () => {
    router.push({
        path:'/progressManage'
    })
}

// 页面初始化时，调用接口，展示第一周期的问卷(后面调接口)
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
    {
        id: '3',
        question: '您是否在近3个月内患过Breast Cancer？',
        type: 0,  // 0:单选，1：多选
        options: ['是', '否']
    },
    {
        id: '4',
        question: '请问在过去的一个月里，您有以下哪些症状？',
        type: 1,  // 0:单选，1：多选
        options: ['头痛', '耳鸣', '听力下降', '鼻塞', '其他', '无明显症状']
    }
])

// 时间轴数据
const current = ref(0);
const timeLineData = ref([])
const cycle = ref(5) // 调用接口获取现在数据库中所有的随访周期
const getTimeLineData = () => {
    for(let i=0;i<cycle.value;i++){
        timeLineData.value.push({
            title: '第'+(i+1)+'周期',
            description:'刘怡-2019.01.01'
        })
    }
}

// 点击时间轴，调转到对应周期
const timeLineClick = (index) => {
    console.log('当前周期：', index+1)
    const cycleIndex = index;
    const patientId = patientInfo.value.id
    console.log(cycleIndex, patientId)
    // 后面调用接口，获取问卷数据（参数：患者patientId和周期数cycleIndex）
    questionnaireData.value = [
        {
            id: '1',
            question: `您是否在近3个月内患过Breast Cancer？(第${index+1}周期)`,
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
        },
        {
            id: '2',
            question: '请问在过去的一个月里，您有以下哪些症状？',
            type: 1,  // 0:单选，1：多选
            options: ['头痛', '耳鸣', '听力下降', '鼻塞', '其他', '无明显症状']
        }
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

// 调用接口获取问卷答案
let answerData = ref([
    // 在这里调用接口，默认获取id=1的问卷内容
    {
        id: '1',
        question: '您是否在近3个月内患过Breast Cancer？',
        type: 0,  // 0:单选，1：多选
        ans: 0
    },
    {
        id: '2',
        question: '请问在过去的一个月里，您有以下哪些症状？',
        type: 1,  // 0:单选，1：多选
        // options: ['头痛', '耳鸣', '听力下降', '鼻塞', '其他', '无明显症状']
        ans: [0,1]
    },
    {
        id: '3',
        question: '您是否在近3个月内患过Breast Cancer？',
        type: 0,  // 0:单选，1：多选
        // options: ['是', '否']
        ans: 1
    },
    {
        id: '4',
        question: '请问在过去的一个月里，您有以下哪些症状？',
        type: 1,  // 0:单选，1：多选
        // options: ['头痛', '耳鸣', '听力下降', '鼻塞', '其他', '无明显症状']
        ans: [0, 2]
    },
    {
        pz:'该患者状态一切正常'
    },
    {
        diedate:'null'
    }
])

// 阻止鼠标点击事件
const isReadOnly = ref(false)
const onContainerClick = (event) => {
    if (isReadOnly.value) {
        event.stopPropagation();
        event.preventDefault();
    }
}

onMounted(() => {
    getTimeLineData()
})
</script>

<style lang="less" scoped>
.followLog {
      display: flex;
      flex-direction: column;
      height: 100%;
    // 患者基本信息
    .patientInfo {
        // height: 40px;
        // border: 1px solid blue;
        border-bottom: 1px dashed #ccc;
        margin: 10px 10px 0px 10px;
        display: flex;
        justify-content: space-between;
        span {
            margin-right: 10px;
            font-size: 16px;
        }
        .disease {
          background-color: rgba(8, 109, 91, 0.5);
          padding: 5px;
          border-radius: 8px;
          font-weight: bold;
          color: white;
          cursor: pointer;
        }
    }
    // 随访记录查看
    .quesnaireDetail {
        flex:1;
        display: flex;
        flex-direction: column;
        .timeLine {
            box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
            margin: 5px 10px 0px 10px;
            padding-top: 20px;
            height: 50%;
        }
        .quesnaireContent {
            flex: 1;
            border-top: 1px dashed rgba(154, 154, 154, 0.5);
            background-color: rgba(225, 246, 226, 0.7);
            margin: 10px;
            max-height: 62vh;
            min-height: 62vh;
            overflow-y: auto;
            .abnormalCondition {
                margin-left: 50px;
                margin-top: 10px;
                margin-bottom: 5px;
                span {
                    font-weight: bold;
                    font-size: 16px;
                    color: #EE3B3B
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
            }
        }
    }
}
</style>
