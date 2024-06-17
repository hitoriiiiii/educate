<!-- 教师-个人中心 -->
<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" @activated="saveActive">
      <a-tab-pane key="1" tab="修改个人信息">
        <NurseInfo></NurseInfo>
      </a-tab-pane>
      <a-tab-pane key="2" tab="修改密码" force-render>
        <NursePassword></NursePassword>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NurseInfo from './AccountSteps/NurseInfo.vue';
import NursePassword from './AccountSteps/NursePassword.vue';

//activeKey初始值为null
const activeKey = ref(null);

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
:deep(.ant-tabs .ant-tabs-tab) {
    font-size: 20px !important; /* 调整为您需要的大小 */
    height: 30px;
  }
</style>