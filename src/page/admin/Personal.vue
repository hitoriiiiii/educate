<!-- 护士-个人中心 -->
<template>
  <div class="container">
    <span @click="jumpToIndex" class="icon"><LeftOutlined /></span>
    <div class="tabs">
      <a-tabs v-model:activeKey="activeKey" @activated="saveActive">
        <a-tab-pane key="1" tab="修改个人信息">
          <AdminInfo></AdminInfo>
        </a-tab-pane>
        <a-tab-pane key="2" tab="修改密码" force-render>
          <AdminPassword></AdminPassword>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdminInfo from './AccountSteps/AdminInfo.vue';
import AdminPassword from './AccountSteps/AdminPassword.vue';
import { LeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';

//activeKey初始值为null
const activeKey = ref(null);

const router = useRouter()
const jumpToIndex = () =>{
  router.push({path:'/adminIndex'})
}

onMounted(() => {
  //获取激活选项卡的值
  const savedActive = localStorage.getItem('activeTab');
  // console.log(savedActive)
  if (savedActive && (savedActive === '1' || savedActive === '2')) {
    activeKey.value = savedActive;
  } else {
    activeKey.value = '1'; // 默认为 key='1'
  }
});

//更新激活选项卡的值
const saveActive = (key) => {
  activeKey.value = key;
  localStorage.setItem('activeTab', key);
};

// 监听页面刷新事件
window.addEventListener('beforeunload', () => {
  localStorage.setItem('activeTab', activeKey.value);
});
</script>

<style lang="less" scoped>
.container{
  display: flex;
  flex-direction: space-between;
  .icon{
    width: 32px;
    height: 20px;
    margin:5px 10px 0px 3px;
    font-size: 18px;
    text-align: center;
  }
}

:deep(.ant-tabs .ant-tabs-tab) {
    font-size: 20px !important; /* 调整为您需要的大小 */
    height: 30px;
  }
</style>