<template>
    <a-config-provider
        :theme="{
            token: {
            colorPrimary: '#c2ddfd',
            },
        }"
    >
        <div class="nurseLayout">
            <a-layout>
                <!-- 教师顶部导航栏 -->
                <a-layout-header class="header">
                    <div class="header-content">
                        <!-- logo -->
                        <div class="logo" />
                        <!-- 教师导航标签 -->
                        <NurseNavi></NurseNavi>
                        <!-- 头像信息 -->
                        <div class="user-info" @click="jumpToPersonal">
                            <a-avatar class="user-avatar">
                                <template #icon><UserOutlined /></template>
                            </a-avatar>
                            xxx教师
                        </div>
                    </div>
                </a-layout-header>
                <a-layout-content class="content">
                    <router-view></router-view>
                </a-layout-content>
            </a-layout>
        </div>
    </a-config-provider>
</template>

<script setup>
import NurseNavi from '../navi/NurseNavi.vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter()
// 跳转到“个人中心”页面
const jumpToPersonal = () => {
    router.push({ path: '/nursePersonal'})
}
</script>

<style lang="less" scoped>
.nurseLayout {
    width: 100vw;
    height: 100vh;

    .header {
        position: 'fixed';
        z-index: 1;
        width: '100%';
        background-color: #c2ddfd;
        height: 9vh;
        font-size: 18px;
        .header-content {
            display: flex;
            justify-content: space-between; // 两端对齐
            align-items: center; // 垂直居中
            width: 100%; // 占满整个宽度
            .logo {
                width: 240px;
                height: 9vh;
                background: url('~@/assets/logo.png') no-repeat center/contain;
                margin: auto 0;
            }
            .user-info {
                display: flex;
                align-items: center;
                cursor: pointer;
                .user-avatar {
                    margin-left: auto; // 自动将头像推到右边
                }
            }
        }
    }

    .content {
        height: 91vh;
        padding: 20px;
    }
    
}
</style>