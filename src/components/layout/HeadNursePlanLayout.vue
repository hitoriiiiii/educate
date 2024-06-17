<template>
    <a-config-provider
        :theme="{
            token: {
                colorPrimary: '#c2ddfd',
            },
        }"
    >
        <div class="planLayout">
            <a-layout>
                <!-- 侧边导航栏 -->
                <a-layout-sider class="planSlider" >
                    <a-menu
                        v-model:openKeys="openKeys"
                        v-model:selectedKeys="selectedKeys"
                        mode="inline"
                        :items="menuItems"
                        @click="handleClick"
                        :style="{ fontSize: '16px'}"
                    >
                    </a-menu>
                </a-layout-sider>
                <a-layout style="padding: 0 24px">
                    <a-breadcrumb >
                        <a-breadcrumb-item>Home</a-breadcrumb-item>
                        <a-breadcrumb-item>App</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content :style="{ background: '#fff', minHeight: '75vh' }">
                        <router-view></router-view>
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </div>
    </a-config-provider>
</template>

<script setup>
import { reactive, ref, watch, h, onMounted } from 'vue';
import { TeamOutlined, MailOutlined, FormOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter(), route = useRoute()
const selectedKeys = ref([])
const openKeys = ref(['planDetails'])
const menuItems = reactive([
    {
        label: '患者详情',
        key: 'planDetails',
        icon: () => h(TeamOutlined),
        children: [
            { label: '随访任务分配', key: 'allotTask', path: '/allotTask',},
            { label: '随访进程管理', key: 'progressManage', path: '/progressManage',},
            { label: '生存分析图', key: 'survivalDia', path: '/survivalDia',},
        ]
    },
    { type: 'divider' },
    {
        label: '随访问卷列表',
        key: 'questionnaire',
        path: '/questionnaire',
        icon: () => h(MailOutlined),
    },
    {
        label: '随访问卷制作',
        key: 'addQuestion',
        path: '/addQuestion',
        icon: () => h(FormOutlined),
    },
])
// 随访问卷列表页面下的子页面路径
const questionnaireChildren = ['questionDetail']
// 随访进程管理页面下的子页面路径
const progressManageChildren = ['patientFollow',]
onMounted(() => {
    // 默认情况展示“随访任务分配”页面
    selectedKeys.value = [route.name]
    if(questionnaireChildren.includes(route.name)) {
        selectedKeys.value = ['questionnaire']
    } else if(progressManageChildren.includes(route.name)) {
        selectedKeys.value = ['progressManage']
    } else {
        selectedKeys.value = [route.name]
    }
})
watch(() => route.name, (newName) => {
    if(questionnaireChildren.includes(newName)) {
        selectedKeys.value = ['questionnaire']
    } else if(progressManageChildren.includes(newName)) {
        selectedKeys.value = ['progressManage']
    } else {
        selectedKeys.value = [newName]
    }
}, { immediate: true })
const handleClick = item => {
    router.push({ path: item.item.path });
}

</script>

<style lang="less" scoped>
.planLayout {
    width: '100%';
    height: '100%';

    .planSlider {
        background: #fff;
        height: 87vh;
        width: 200px;
        font-size: 16px;
    }
}
</style>