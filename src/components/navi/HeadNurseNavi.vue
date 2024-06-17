<template>
    <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="horizontal"
        :style="{ lineHeight: '60px', fontSize: '18px'}"
    >
        <a-space :size="60">
            <a-menu-item v-for="item in menuItems" :key="item.key">            
                <router-link :to="{path: item.path}">{{ item.label }}</router-link>
            </a-menu-item>
        </a-space>
    </a-menu>
</template>

<script setup>
import {ref, reactive, onMounted, watch} from "vue"
import { useRoute } from 'vue-router'

const route = useRoute()
const selectedKeys = ref([])
const menuItems = ref([
    { label: '工作台', key: 'index', path: '/index'},
    { label: '计划管理', key: 'planManage', path: '/planManage' },
    { label: '执行情况', key: 'execute', path: '/execute' },
    { label: '异常提醒', key: 'alert', path: '/alert' },
])
// 计划管理页面下的子页面路径
const planManageChildren = ['allotTask', 'progressManage', 'survivalDia', 'questionnaire', 'addQuestion', 'questionDetail', 'patientFollow']
onMounted(() => {
    if(planManageChildren.includes(route.name)) {
        selectedKeys.value = ['planManage']
    } else {
        selectedKeys.value = [route.name]
    }
})
watch(() => route.name, (newName) => {
    if(planManageChildren.includes(newName)) {
        selectedKeys.value = ['planManage']
    } else {
        selectedKeys.value = [newName]
    }
}, { immediate: true })
</script>

<style lang="less" scoped>
.ant-menu-item a {
    font-size: 18px !important;
}
</style>
