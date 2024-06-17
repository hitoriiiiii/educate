<template>
    <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="horizontal"
        :style="{ lineHeight: '60px' }"
    >
        <a-space :size="60">
            <a-menu-item v-for="item in menuItems" :key="item.key">            
                <router-link :to="{path: item.path}">{{ item.label }}</router-link>
            </a-menu-item>
        </a-space>
    </a-menu>
</template>

<script setup>
import {ref, onMounted, watch } from "vue"
import { useRoute } from 'vue-router'

const route = useRoute()
const selectedKeys = ref([])
const menuItems = ref([
    { label: '工作台', key: 'nurseIndex', path: '/nurseIndex'},
    { label: '执行情况', key: 'nurseExecute', path: '/nurseExecute' },
    { label: '随访列表', key: 'follow', path: '/follow' },
    { label: '消息通知', key: 'notifications', path: '/notifications' },
])

onMounted(() => { 
    selectedKeys.value = [route.name]
})
watch(() => route.name, (newName) => {
    selectedKeys.value = [newName]
}, { immediate: true })
</script>

<style lang="less" scoped>
.ant-menu-item a {
    font-size: 18px !important;
}
</style>