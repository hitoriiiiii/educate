<!-- 护士长--计划管理--随访问卷制作--随访问卷的问卷参数 -->
<template>
    <div class="paramter">
        <div class="title">问卷参数</div>
        <div class="content">
            <a-row class="basicInfo">
                <a-col :span="10">
                    问卷名称：<a-input v-model:value="formData.questionName" placeholder="请输入问卷名" allowClear :style="{width: '350px'}"></a-input>
                </a-col>
                <a-col :span="7">
                    适用对象：
                    <a-select
                        ref="select"
                        v-model:value="formData.applicable"
                        style="width: 150px"
                        placeholder="请选择适用对象"
                        allowClear
                    >
                        <a-select-option v-for="item in paramterInfo.applicableType" :key="item.key">{{item.value}}</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="7">
                    随访周期：
                    <a-select
                        v-model:value="formData.followPeriod"
                        style="width: 150px"
                        placeholder="请选择随访周期"
                        allowClear
                    >
                        <a-select-option v-for="item in paramterInfo.followPeriod" :key="item.key">{{item.value}}</a-select-option>
                    </a-select>
                </a-col>
            </a-row>
            <!-- 备注 -->
            <div class="note">
                备注：
                <a-textarea
                    v-model:value="formData.note"
                    placeholder="请输入要备注的内容"
                    :auto-size="{ minRows: 2, maxRows: 2 }"
                    :style="{width: '87%'}"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue"

const paramterInfo = reactive({ // 问卷参数相关信息
    applicableType: [], // 适用对象
    followPeriod: [], // 随访周期
})

const formData = reactive({
    questionName: '', // 问卷名
    applicableType: '', // 适用对象
    followPeriod: '', // 随访周期
    note: '', // 备注
})

onMounted(() => {
    getQuestionInfo()
})
// 获取问卷的相关信息
const getQuestionInfo = () => {
    // 调用api，所成功则对相应数据进行赋值
    paramterInfo.applicableType = [
        { key: '0', value: '鼻咽癌重症' },
        { key: '1', value: '鼻咽癌轻症' },
    ]
    paramterInfo.followPeriod = [
        { key: '0', value: '一周期' },
        { key: '1', value: '两周期' },
        { key: '2', value: '三周期' },
        { key: '3', value: '四周期' },
        { key: '4', value: '五周期' },
    ]
}
</script>

<style lang="less" scoped>
.paramter {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    
    .title {
        font-size: 24px;
        margin: 2vh 0;
    }
    .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        .note {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 2vh 0;
        }
    }
    
}
</style>
