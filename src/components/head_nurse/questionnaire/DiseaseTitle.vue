<template>
    <div class="diseaseTitle">
        <div class="title">问卷制作</div>
        <!-- 问卷制作内容的小标题 -->
        <!-- <div class="disease">
            <div class="diseaseName">{{disease.name}}</div>
            <div class="diseaseContent">{{disease.content}}</div>
        </div> -->
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue"

const disease = reactive({
    name: '', //  疾病种类
    content: '', // 问卷注释
})
onMounted(() => {
    getDiseaseTitle()
})
// 获取问卷制作中的相关信息
const getDiseaseTitle = () => {
    disease.name = "鼻咽癌随访问卷"
    disease.content = "本问卷旨在收集您在我们医院接受治疗和护理过程中的体验和感受。我们关注您的健康状况、治疗效果以及对医院环境和服务的整体满意度。我们承诺，所有收集到的信息将仅用于改善我们的服务，并严格保密。问卷填写预计需要5-10分钟。请根据您的实际体验，尽可能详细地回答以下问题。您的每一条建议都将被我们认真考虑，并用于改进我们的服务流程和质量。"
}
</script>

<style lang="less" scoped>
.diseaseTitle {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .title {
        font-size: 24px;
        margin: 1vh 0;
        font-weight: bold;
    }
    .disease {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .diseaseName {
            width: 90%;
            border: 0.8px dashed #000;
            font-size: 18px;
            height: 4vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .diseaseContent {
            width: 90%;
            height: 12vh;
            padding: 5px;
            font-size: 18px;
            text-align: justify;
            border: 0.8px dashed #000;
            margin: 2vh 0;
            text-indent: 2em; /* 设置首行缩进为2em */
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
    
}
</style>
