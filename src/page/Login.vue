<template>
    <div class="main">
        <div class="bg">
            <!-- 名称 -->
            <div class="top">
                <div class="title">欢迎使用智能教育系统</div>
            </div>
            <!-- 登录框 -->
            <div class="content">
                <a-form
                    :model="loginForm"
                    class="loginBox"
                    ref="formRef"
                >
                    <!-- 用户名输入框 -->
                    <a-form-item
                        name="username"
                        :rules="[{ required: true, message: '请输入用户名！' }]"
                    >
                        <a-input 
                            v-model:value="loginForm.username" 
                            placeholder="请输入用户名" 
                            class="input" 
                            allowClear
                            size="large"
                        >
                            <template #prefix><UserOutlined /></template>
                        </a-input>
                    </a-form-item>
                    <!-- 密码输入框 -->
                    <a-form-item
                        name="password"
                        :rules="[{ required: true, message: '请输入密码!' }]"
                    >
                        <a-input-password 
                            v-model:value="loginForm.password" 
                            placeholder="请输入密码" 
                            class="input" 
                            allowClear 
                            size="large"
                        >
                            <template #prefix><LockOutlined /></template>
                        </a-input-password>
                    </a-form-item>
                    <!-- 角色输入框 -->
                    <!-- <a-form-item 
                        name="role"
                        :rules="[{ required: true, message: '请选择登录角色！' }]"
                    >
                        <a-select
                            size="large"
                            placeholder="请选择登录角色"
                            v-model:value="loginForm.role"
                            class="input"
                            allowClear
                        >
                            <a-select-option v-for="(role, roleName) in loginForm.roleSelection" :key="role" :value="role">
                                {{ roleName }}
                            </a-select-option>
                        </a-select>
                    </a-form-item> -->
                    <!-- 登录按钮 -->
                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="login-button" @click="handleSubmit">
                            登录
                        </a-button>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="login-button" @click="sign">
                            注册
                        </a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, computed} from "vue"
import { UserOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { loginApi } from '../api/login'
import {config} from '@/config/config'

const router = useRouter()
const loginForm = reactive({
    loginBtn: false,
    // roleSelection: {
    //     '管理员': 'admin',
    //     '护士': 'nurse',
    //     '护士长': 'headNurse',
    // },
    // role: null,
    username: '',
    password: '',
})
const formRef = ref(null) //创建对表单的引用
const handleSubmit = (e) => {
    // e.preventDefault()
    // formRef.value.validate().then(() => {
    //     // 验证成功
    //     console.log(loginForm.username,loginForm.password)
    //     // 调用后端登录接口
    //     loginApi(loginForm).then((res) => {
    //         // console.log(res)
    //         if(res.data.success === true) {
    //             message.success("登陆成功！")
    //             let userToken = res.data.data.token
    //             // 设置用户登录信息
    //             localStorage.setItem(config.userInfo, loginForm.username)
    //             // 设置token
    //             localStorage.setItem(config.userToken, userToken)
    //             // 设置用户登录时间戳
    //             localStorage.setItem(config.userLoginTimestamp, Date.now().toString())
    //             // setTimeout(() => {
    //             //     if(loginForm.role === 'admin') {
    //             //         // 跳转到管理员页面
    //                     // router.replace({path: '/adminIndex'})
    //             //     }else if(loginForm.role === 'nurse') {
    //             //         // 跳转到护士页面
                        router.replace({path: '/nurse'})
    //             //     }else {
    //             //         // 跳转到护士长页面
    //             //         router.replace({path: '/headNurse'})
    //             //     }
    //             // }, 100)
    //         } else {
    //             message.error("登录失败！" + res.data.msg)
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //         // message.error("登录失败！" + err.data.msg)
    //     })
    //     // setTimeout(() => {
    //     //     if(loginForm.role === 'admin'){
    //     //         router.replace({ path: '/AdminIndex' })
    //     //     }else if(loginForm.role === 'nurse'){
    //     //         router.replace({ path: '/nurse' })
    //     //     }else {
    //     //         router.replace({ path: '/headNurse' })
    //     //     }
    //     // }, 100)
    // }).catch(err => {
    //     // 验证失败
    //     console.log("验证失败:", err)
    // })
}
</script>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: flex-end; //水平靠右
    align-items: center; //垂直居中
    background: url(~@/assets/background.png) center center no-repeat;
    background-size: 100% 100%;
    // &::before {
    //     content: '';
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 100vh;
    //     background: url(~@/assets/loginBg1.png) center center no-repeat;
    //     // filter: blur(5px) brightness(110%);
    //     background-size: 100% 100%;
    //     position: fixed;
    //     z-index: 0;
    // }
    .bg {
        width: 400px;
        height: 456px;
        background-color: #fff;
        border-radius: 10px;
        margin-right: 100px;
        /*  logo和名称 */
        .top {
            width: 100%;
            height: auto;
            // margin: 5px auto;
            .title {
                padding: 35px 0 0;
                color: #141414;
                font-size: 24px;
                line-height: 32px;
                text-align: center;
            }
        }
        // 登录表单
        .content {
            width: 100%;
            height: 350px;
            margin-top: 20px;
            .loginBox {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                // opacity: 0.9;
                label {
                    font-size: 16px;
                }
                .input {
                    width: 300px;
                    margin-top: 20px;
                    font-family: '思源宋体', '宋体', Arial, Helvetica, sans-serif;
                    border-color: #B7BCC7;
                    border-radius: 6px;
                }
                .login-button {
                    padding: 0 15px;
                    font-size: 16px;
                    height: 40px;
                    width: 300px;
                    margin-top: 20px;
                    border-radius: 6px;
                }
                .ant-select-selection__placeholder,
                .ant-select-search__field__placeholder {
                    margin-left: 10px;
                }
                .ant-input-affix-wrapper .ant-input:not(:first-child) {
                    border-radius: 10px;
                }
                .ant-select-lg .ant-select-selection--single {
                    border-radius: 10px;
                }
            }
        }
    }
}
</style>
