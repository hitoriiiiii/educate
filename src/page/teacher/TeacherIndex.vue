<!-- 教师首页 -->
<template>
    <div class="TeacherIndex">
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
            <!-- 评价 -->
            <WaitFollowList></WaitFollowList>
        </div>
    </div>
</template>

<script setup>
import TodayFollowInfo from './teacherWorkBench/TodayFollowInfo.vue'
import MonthExecuteInfo from './teacherWorkBench/MonthExecuteInfo.vue'
import NewsNotice from './teacherWorkBench/NewsNotice.vue'
import WaitFollowList from './teacherWorkBench/WaitFollowList.vue'
</script>

<style lang="less" scoped>
.TeacherIndex {
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
