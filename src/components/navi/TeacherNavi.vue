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
    { label: '工作台', key: 'teacherIndex', path: '/teacherIndex'},
    { label: '智能教案生成', key: 'teacherExecute', path: '/teacherExecute' },
    { label: '智能评价', key: 'follow', path: '/follow' },
    { label: '职业生涯指导', key: 'notifications', path: '/notifications' },
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