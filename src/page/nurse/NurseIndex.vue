<!-- 教师首页 -->
<template>
    <div class="NurseIndex">
        <div class="top">
            <!-- 今日批改信息 -->
            <div class="topfirst">
                <TodayFollowInfo ></TodayFollowInfo>
            </div>
            <!-- 本月执行情况 -->
            <div class="topsecond">
                <MonthExecuteInfo ></MonthExecuteInfo>
            </div>
            <!-- 消息通知 -->
            <div class="topthird">
                <NewsNotice ></NewsNotice>
            </div>
        </div>
        <div class="down">
            <!-- 待批改列表 -->
            <WaitFollowList></WaitFollowList>
        </div>
    </div>
</template>

<script setup>
import TodayFollowInfo from './nurseWorkBench/TodayFollowInfo.vue'
import MonthExecuteInfo from './nurseWorkBench/MonthExecuteInfo.vue'
import NewsNotice from './nurseWorkBench/NewsNotice.vue'
import WaitFollowList from './nurseWorkBench/WaitFollowList.vue'
</script>

<style lang="less" scoped>
.NurseIndex {
    display: flex;
    height: 100%;
    // overflow: hidden;
    flex-direction: column;
    .top {
        flex: 2; /* 占据页面高度的2/5 */
        display: flex;
        .topfirst {
            flex:2; /* 占据上侧宽度的2/7 */
            margin-right: 30px;
        }
        .topsecond {
            flex:3; /* 占据上侧宽度的3/7 */
            margin-right: 30px;
        }
        .topthird {
            flex:2; /* 占据上侧宽度的2/7 */
        }
    }
    .down {
        flex: 3;  /* 占据页面高度的3/5 */
        margin-top: 20px;
    }
}
</style>
