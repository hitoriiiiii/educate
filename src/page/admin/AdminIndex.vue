<!-- 护士-个人中心 -->
<template>
  <div class="container">
    <div class="tabs">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="人员管理">
          <UserManage></UserManage>
        </a-tab-pane>
        <a-tab-pane key="2" tab="问答管理" force-render>
          <QuesManage></QuesManage>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserManage from './ManageCom/UserManage.vue';
import QuesManage from './ManageCom/QuesManage.vue';

//activeKey初始值为1
const activeKey = ref('1');
</script>

<style lang="less" scoped>


:deep(.ant-tabs .ant-tabs-tab) {
    font-size: 20px !important; /* 调整为您需要的大小 */
    height: 30px;
  }
</style>