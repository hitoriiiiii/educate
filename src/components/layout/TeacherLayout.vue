<template>
    <a-config-provider
        :theme="{
            token: {
            colorPrimary: '#c2ddfd',
            },
        }"
    >
        <div class="teacherLayout">
            <a-layout>
                <!-- 教师顶部导航栏 -->
                <a-layout-header class="header">
                    <div class="header-content">
                        <!-- logo -->
                        <div class="logo" />
                        <!-- 教师导航标签 -->
                        <TeacherNavi></TeacherNavi>
                        <!-- 头像信息 -->
                        <div class="user-info" @click="jumpToPersonal">
                            <a-avatar class="user-avatar">
                                <template #icon><UserOutlined /></template>
                            </a-avatar>
                            {{name}}
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
import TeacherNavi from '../navi/TeacherNavi.vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';
import {getTeacherInfoApi} from '@/api/teacher/teacherWorkbench'
import {ref ,onMounted} from "vue"

const name = ref('')

const getTeacherInfo = () => {
  getTeacherInfoApi().then(res => {
    console.log(res)
    if(res.data.success === true){
    name.value = res.data.data[0].name;

    }else{
      message.error("获取失败！" + res.data.msg)
    }
    }).catch((err) => {
      console.log(err)
  })
}

onMounted(() => {
  getTeacherInfo()

})


const router = useRouter()
// 跳转到“个人中心”页面
const jumpToPersonal = () => {
    router.push({ path: '/teacherPersonal'})
}
</script>

<style lang="less" scoped>
.teacherLayout {
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