<!-- 护士长-异常提醒 -->
<template>
    <div>
      <a-tabs v-model:activeKey="activeKey" >
        <a-tab-pane key="1" tab="今日异常" >
          <todayAlert></todayAlert>
        </a-tab-pane>
        <a-tab-pane key="2" tab="历史异常" force-render >
          <historyAlert></historyAlert>
          </a-tab-pane>
      </a-tabs>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import todayAlert from './todayAlert.vue'
  import historyAlert from './historyAlert.vue'
  const activeKey = ref('1');
  </script>
  
  <style lang="less" scoped>
  :deep(.ant-tabs .ant-tabs-tab) {
    font-size: 20px !important; /* 调整为您需要的大小 */
    height: 30px;
  }
  </style>