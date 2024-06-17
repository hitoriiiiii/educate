<template>
    <a-config-provider
        :theme="{
            token: {
            colorPrimary: '#c2ddfd',
            },
        }"
    >
        <div class="headNurseLayout">
            <a-layout>
                <!-- 护士长顶部导航栏 -->
                <a-layout-header class="header">
                    <div class="header-content">
                        <!-- logo -->
                        <div class="logo"></div>
                        <!-- 护士长导航标签 -->
                        <HeadNurseNavi></HeadNurseNavi>
                        <!-- 头像信息 -->
                        <div class="user-info" @click="jumpToPersonal">
                            <a-avatar class="user-avatar">
                                <template #icon><UserOutlined /></template>
                            </a-avatar>
                            xxx护士长
                        </div>
                    </div>
                </a-layout-header>
                <!-- 每页具体内容 -->
                <a-layout-content class="content">
                    <router-view></router-view>
                </a-layout-content>
            </a-layout>
        </div>
    </a-config-provider>
</template>

<script setup>
import {ref, reactive} from "vue"
import HeadNurseNavi from '../navi/HeadNurseNavi.vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter()
// 跳转到“个人中心”页面
const jumpToPersonal = () => {
    router.push({ path: '/personal'})
}
</script>

<style lang="less" scoped>
.headNurseLayout {
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
        // margin: 24px 16px;
        // padding: 24px;
        // background-color: #fff;
        height: 91vh;
        padding: 20px;
    }
    
}
</style>
