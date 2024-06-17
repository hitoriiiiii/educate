<!-- 护士长首页 -->
<template>
    <div class="headNurseIndex">
        <div class="left">
            <div class="left-top">
                <!-- 今日随访信息 -->
                <NowFollowInfo></NowFollowInfo>
                <!-- 本月护士执行情况 -->
                <NurseExecuteInfo></NurseExecuteInfo>
            </div>
            <!-- 计划管理 -->
            <PlanInfo></PlanInfo>
        </div>
        <div class="right">
            <!-- 今日异常提醒 -->
            <NowNotification></NowNotification>
            <!-- 历史异常提醒 -->
            <HistoryNotification></HistoryNotification>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive} from "vue"
import NowFollowInfo from './workbench/NowFollowInfo.vue'
import NurseExecuteInfo from './workbench/NurseExecuteInfo.vue'
import PlanInfo from './workbench/PlanInfo.vue'
import NowNotification from './workbench/NowNotification.vue'
import HistoryNotification from './workbench/HistoryNotification.vue'
</script>

<style lang="less" scoped>
.headNurseIndex {
    display: flex;
    height: 100%;

    .left {
        flex: 2; /* 占据页面宽度的2/3 */
        display: flex;
        flex-direction: column;
        .left-top {
            flex: 2; /* 占据左侧高度的2/5 */
            display: flex;
            padding-bottom: 10px;
            .nowFollowInfo{
                flex: 1; /* 占据左侧宽度度的1/3 */
            }
            .executeStatistics{
                flex: 2; /* 占据左侧宽度度的2/3 */
                margin-left: 15px;
            }
        }
        .planInfo {
            flex: 3; /* 占据左侧高度的3/5 */
            margin-top: 10px;
        }
    }

    .right {
        flex: 1; /* 占据页面宽度的1/3 */
        display: flex;
        flex-direction: column;
        padding-left: 20px;
        margin-bottom: 10px;
        .nowNotification {
            flex: 1; /* 占据右侧高度的1/2 */
            margin-bottom: 5px;
        }
        .historyNotification {
            flex: 1; /* 占据右侧高度的1/2 */
            margin-top: 5px;
        }
    }
}
</style>
