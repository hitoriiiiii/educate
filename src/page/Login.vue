<template>

      <BorderTopOutlined />
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
                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="login-button" @click="handleSubmit">
                            登录
                        </a-button>
                    </a-form-item>
                    <a-form-item>
                        <!-- <a-button type="primary" html-type="submit" class="login-button" @click="sign">
                            注册
                        </a-button> -->
                    
                        <a-button type="primary" html-type="submit" class="login-button" @click="showDrawer">
                        <template #icon><PlusOutlined /></template>
                        注册
                    </a-button>
                    <a-drawer
                        title="注册一个新账户"
                        :width="720"
                        :open="open"
                        :body-style="{ paddingBottom: '80px' }"
                        :footer-style="{ textAlign: 'right' }"
                        @close="onClose"
                    >
                        <a-form :model="form" :rules="rules" layout="vertical">
                        <a-row :gutter="16">
                            <a-col :span="12">
                            <a-form-item label="姓名" name="name">
                                <a-input v-model:value="form.name" placeholder="请输入真实姓名" />
                            </a-form-item>
                            </a-col>
                            <a-col :span="12">
                            <a-form-item label="昵称" name="nickname">
                                <a-input v-model:value="form.nickname" placeholder="请输入您的昵称" />
                            </a-form-item>
                            </a-col>
                            <a-col :span="12">
                            <a-form-item label="邮箱" name="url">
                                <a-input
                                v-model:value="form.email"
                                style="width: 100%"
                                
                                placeholder="请输入您的邮箱"
                                />
                                <!-- addon-after=".com" -->
                            </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16">
                            <!-- 密码输入确认 -->
                            <a-col :span="12">
                            <a-form-item label="请输入密码" name="Password1">
                                <a-input-password 
                                    v-model:value="form.password1" 
                                    placeholder="请输入密码"
                                    allowClear 
                                    style="width: 100%"
                                >
                                    <template #prefix><LockOutlined /></template>
                                </a-input-password>
                            </a-form-item>

                            <a-form-item label="请确认您的密码" name="Password2">
                                <a-input-password 
                                    v-model:value="form.password2" 
                                    placeholder="请确认您的密码"
                                    allowClear 
                                    style="width: 100%"
                                >
                                    <template #prefix><LockOutlined /></template>
                                </a-input-password>
                            </a-form-item>
                            </a-col>
                        </a-row>
                        <!-- <a-row :gutter="16">
                            <a-col :span="12">
                            <a-form-item label="Type" name="type">
                                <a-select v-model:value="form.type" placeholder="Please choose the type">
                                <a-select-option value="private">教师</a-select-option>
                                <a-select-option value="public">学生</a-select-option>
                                </a-select>
                            </a-form-item>
                            </a-col>
                        </a-row> -->
                        </a-form>
                        <template #extra>
                        <a-space>
                            <a-button @click="onClose">取消</a-button>
                            <a-button type="primary" @click="register('top')">提交</a-button>
                        </a-space>
                        </template>
                    </a-drawer>
                </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, computed} from "vue"
import { UserOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons-vue'
import { notification,message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { loginApi,registerApi } from '../api/login'
import {config} from '@/config/config'



const form = ref({
  name: '',
  email: '',
  type: '1',
  password1:'',
  password2:'',
  nickname:''
});

const rules = {
  name: [
    {
      required: true,
      message: '请输入您的真实姓名',
    },
  ],
  type: [
    {
      required: true,
    },
  ],
  nickname: [
    {
      required: true,
      message: '请输入您的昵称',
    },
  ],
  email: [
    {
      required: true,
      message: '请输入您的邮箱',
    },
  ],
  password1: [
    {
      required: true,
      message: '请输入您的密码',
    },
  ],
  password2: [
    {
      required: true,
      message: '请确认您的密码',
    },
  ],
};
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};


const register = (placement) => {
  console.log(form.value.password1)
  //开弹窗
  if (form.value.password1 !== form.value.password2) {
  notification.open({
    message: `请输入相同的密码`,
    description:
      '两次输入的密码需保持一致，请仔细检查',
    placement,
  });
    } else if(form.value.name==='' ||form.value.nickname==='' || form.value.email===''||form.value.password1===''||form.value.password2==='') {
        notification.open({
            message: `姓名/昵称/邮箱 不能为空`,
            description:
            '请仔细检查',
            placement,
        });
        console.log(form.value)
  }else{
    let registerform = {
        "name":form.value.name,
        "password": form.value.password1,
        "user_type": 1,
        "admin": false,
        "email": form.value.email,
        "nickname": form.value.nickname
    }
    // console.log('+++++++'+registerform.name)
    // {
    //     "name": "{{$randomLastName}}",
    //     "password": "{{$randomPassword}}",
    //     "user_type": 0,
    //     "admin": false,
    //     "email": "{{$randomEmail}}",
    //     "nickname": "{{$randomUserName}}"
    // }
    // console.log('+++++++'+form.value)
    registerApi(registerform).then((res) => {
            console.log(res)
            if(res.data.success === true) {
                message.success("注册成功！")
                setTimeout(() => {
                    open.value = false;
                    form.value={
                        name: '',
                        email: '',
                        type: '1',
                        password1:'',
                        password2:'',
                        nickname:''
                        }
                 }, 600)
                
            } else {
                message.error("注册失败！" + res.data.error_message)   
            }
        }).catch(err => {
            console.log(err)
        })
  }
};



const router = useRouter()
const loginForm = reactive({
    loginBtn: false,
    username: '',
    password: '',
})
const formRef = ref(null) //创建对表单的引用

const handleSubmit = (e) => {
    console.log(loginForm.username,loginForm.password)
    if (loginForm.password===''||loginForm.username==='') {
        notification.open({
            message: `昵称/密码 不能为空`,
            description:
            '请检查您的输入',
            top,
        });

    }else{
    e.preventDefault()
    formRef.value.validate().then(() => {
        // 验证成功
        console.log(loginForm.username,loginForm.password)
        // 调用后端登录接口
        console.log('Request URL:', config.url); 
        loginApi(loginForm).then((res) => {
            console.log(res)
            if(res.data.success === true) {
                message.success("登陆成功！")
                let userToken = res.data.data[0].token
                let userUid = res.data.data[0].uid
                console.log(userToken)
                // 设置用户登录信息
                localStorage.setItem(config.userInfo, loginForm.username)    
                // 设置token
                localStorage.setItem(config.userToken, userToken)
                localStorage.setItem(config.userUid, userUid)
                // 设置用户登录时间戳
                localStorage.setItem(config.userLoginTimestamp, Date.now().toString())
                 setTimeout(() => {
                        router.replace({path: '/teacher'})
                 }, 100)
            } else {
                message.error("登录失败！" + res.data.msg)
            }
        }).catch(err => {
            console.log(err)
            // message.error("登录失败！" + err.data.msg)
        })
    })}
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
