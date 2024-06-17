<!-- 护士长--个人中心--修改密码 -->
<template>
    <div class="bg">
      <div class="content">
        <!-- 展示表单 -->
        <a-form 
          class="Password"
          :model="formState"
          :rules="rules"
          ref="formRef"
          :label-col="{ span: 8 }" 
          :wrapper-col="{ span: 8 }"
        >
            <a-form-item label="原始密码" name="oldPassword">
              <a-input-password v-model:value="formState.oldPassword" class="input"/>
            </a-form-item>

            <a-form-item label="新密码" name="newPassword"  >
              <a-input-password v-model:value="formState.newPassword" class="input"/>
            </a-form-item>

            <a-form-item label="确认密码" name="confirmPassword" >
              <a-input-password v-model:value="formState.confirmPassword" class="input"/>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
              <a-button type="primary" class="login-button" @click="handleSubmit">保存</a-button>
            </a-form-item>
        </a-form>
      </div>
    </div>
</template>
  
<script setup>
import {ref, reactive,toRaw} from "vue";

const formRef = ref(null)

//响应式对象，存储表单数据
const formState = reactive({
  oldPassword:'',
  newPassword:'',
  confirmPassword:'',
});

//定义表单验证规则
const rules = {
  oldPassword:[
    { required: true, message: '请输入原始密码', trigger: 'blur'},
  ],
  newPassword:[
    { required: true, message: '请输入新密码', trigger: 'blur'},
  ],
  confirmPassword:[
    { required: true, message: '请再次输入新密码', trigger: 'blur'},

    //自定义验证器：两次密码输入一致
    { validator:(rule, value) => {
      if(value !== formState.newPassword){
        return Promise.reject('两次密码输入不一致');
      }
      return Promise.resolve();
    },trigger:'blur'}, 
  ]
};

//处理表单提交
const handleSubmit = () =>{
  formRef.value.validate().then(() =>{
    console.log('提交成功', toRaw(formState));
    alert('保存成功')
  }).catch(err =>{
    console.log('验证失败',err);
  });
};
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
    .Password{
      width: 100%;
      height: 100%;
      align-items: center;
      margin-top: 150px;
      :deep(.ant-form-item-label >label) {
        font-size: 19px !important;
      }
      .input{
          color:rgba(0, 0, 0, 0.88);
          border-radius: 6px;
          font-size: 19px;
      }
      .login-button{
          font-size: 19px;
          border-radius: 6px;
          height: auto;
          margin-left: 85px;
          margin-top:80px
      }
    }
  }
}

</style>
  