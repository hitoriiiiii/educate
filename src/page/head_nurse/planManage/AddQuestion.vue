<!-- 护士长--计划管理--随访问卷制作 -->
<template>
    <div class="addQuestionLayout">
        <!-- 问卷参数 -->
        <paramter></paramter>
        <DiseaseTitle></DiseaseTitle>
        <Content></Content>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue"
import Paramter from '@/components/head_nurse/questionnaire/Paramter.vue'
import DiseaseTitle from '@/components/head_nurse/questionnaire/DiseaseTitle.vue'
import Content from '@/components/head_nurse/questionnaire/Content.vue'

</script>

<style lang="less" scoped>
.addQuestionLayout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 新增的样式 */

    
}
</style>
