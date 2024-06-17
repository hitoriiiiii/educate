<!-- 护士长--个人中心--修改个人信息 -->
<template>
  <div class="bg">
    <div class="content">
      <!-- 展示个人信息 -->
      <a-form 
        class="Info"
        :model="formState"
        :label-col="{ span: 8 }" 
        :wrapper-col="{ span: 8 }"
      >
          <a-form-item label="用户名">
            <a-input
            :disabled="true" 
            class="input"
            v-model:value="formState.username"
            />
          </a-form-item>
          <a-form-item label="姓名" v-bind="validateInfos.name">
            <a-input
            class="cinput" 
            v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="性别"  v-bind="validateInfos.sex">
            <a-select class="cinput" v-model:value="formState.sex" >
              <a-select-option value="male">男</a-select-option>
              <a-select-option value="female">女</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="联系方式" v-bind="validateInfos.phone">
            <a-input
            class="cinput"
            v-model:value="formState.phone" />
          </a-form-item>
          <a-form-item label="科室" v-bind="validateInfos.department">
            <a-input
            class="cinput"
            v-model:value="formState.department" />
          </a-form-item>
          <a-form-item label="角色" >
            <a-input 
            :disabled="true"
            class="input"
            v-model:value="formState.role" />
          </a-form-item>
          <a-button type="primary" class="login-button" @click="handleOk">保存</a-button>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive,toRaw} from "vue"
import { Form } from 'ant-design-vue';
import { useRouter } from 'vue-router';
const useForm = Form.useForm;
//存储表单字段的值 
const formState = reactive({
  // layout: 'horizontal',
  username: 'user2',
  name:'麦麦提娅',
  sex:'女',
  phone:'12345678900',
  department:'外科',
  role:'护士长',
});

//创建表单验证规则
const {validate, validateInfos } = useForm(
  formState,
  reactive({
    name: [
      {
        required: true,
        message: '请输入姓名',
      },
    ],
    sex: [
      {
        required: true,
        message: '请选择性别',
      },
    ],
    phone: [
      {
        required: true,
        message: '请输入联系方式',
      },
    ],
    department: [
      {
        required: true,
        message: '请输入科室',
      },
    ],
  })
)

let initialFormState = { ...formState }
let isNavigationConfirmed = false;

const router = useRouter();
console.log(initialFormState)

//点击保存按钮，验证表单
const handleOk = e => {
  //若验证成功
  validate()
  .then(() => {
    //将性别字段的值从 'male'/'female' 转换为 '男'/'女'
    if (formState.sex === 'male') {
      formState.sex = '男';
    } else if (formState.sex === 'female') {
      formState.sex = '女';
    }
    console.log('验证成功，表单数据：', toRaw(formState));
    alert('修改成功')
    
    isNavigationConfirmed = true;// 标记为已确认导航
  })

  //若验证失败
  .catch(err => {
    console.log(e, err);
  });
};

const confirmNavigation = () => {
  return new Promise((resolve, reject) => {
    if (isFormModified() && !isNavigationConfirmed) {
      const confirmation = window.confirm('修改信息未保存，是否放弃修改？');
      if (confirmation) {
        console.log('放弃修改')
        isNavigationConfirmed = true
        resolve();// 解决 Promise，继续导航
      } else {
        reject();// 拒绝 Promise，取消导航
        console.log('继续修改')
        // isNavigationConfirmed = true
      }
    } else {
      resolve();
    }
  });
};

const isFormModified = () => {
// 检查表单是否被修改
const isModified = JSON.stringify(formState) !== JSON.stringify(initialFormState);
return isModified;
};

// 在路由导航守卫中使用 confirmNavigation 函数
router.beforeEach(async (to, from, next) => {
  try {
    await confirmNavigation();
    next();
  } catch {
    next(false); // 取消导航
  }
});
</script>

<style lang="less" scoped>
.bg{
  width: 750px;
  height: 550px;
  border-radius: 20px;
  background-color: #c1ddd8;
  margin:0 auto;
  margin-top: 30px;
  box-shadow:2px 2px 5px #535252;
  .content{
    width: 100%;
    height:400px;
    margin-left:40px;
    display:inline-block;
    .Info{
      width: 100%;
      height: 100%;
      align-items: center;
      margin-top: 60px;
      :deep(.ant-form-item-label >label) {
        font-size: 19px !important;
      }
      .input{
          color:rgba(0, 0, 0, 0.88);
          font-family: '思源宋体', '宋体', Arial, Helvetica, sans-serif;
          background-color: #edebeb;
          border-radius: 6px;
          font-size: 19px;
      }
      .cinput{
        color:rgba(0, 0, 0, 0.88);
        font-family: '思源宋体', '宋体', Arial, Helvetica, sans-serif;
        background-color:white;
        border-radius: 6px;
        font-size: 19px;
      }
      .login-button{
          font-size: 19px;
          border-radius: 6px;
          height: auto;
          margin-left: 300px;
          margin-top:15px
      }
    }
  }
}
:deep(.ant-select-single .ant-select-selector){
  font-size: 19px !important;
  font-family: '思源宋体', '宋体', Arial, Helvetica, sans-serif;
}
:deep(.ant-select-selector){
  height: 34px;
}
</style>
