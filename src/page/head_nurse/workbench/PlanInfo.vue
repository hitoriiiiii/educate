<!-- 工作台中的计划管理 -->
<template>
    <div class="planInfo">
        <!-- 顶部信息 -->
        <div class="title">
            <ScheduleTwoTone class="schedult-two-tone" two-tone-color="#44A997" />
            <div class="planManange">
                计划管理
                <FullscreenOutlined class="fullscreen-icon" @click="jumpToPlanManage" />
            </div>
            <div class="progress">随访完成度：{{planInfo.progress}}</div>
        </div>
        <!-- 各疾病的列表信息 -->
        <div class="diseaseList">
            <div class="disease" v-for="(item, index) in planInfo.diseaseList" :key="item.id" :value="item.id">
                <!-- logo -->
                <ProfileTwoTone class="profile-two-tone" two-tone-color="#44A997" />
                <div class="diseaseInfo">
                    <!-- 疾病名称 -->
                    <div class="disaseTitle">
                        {{item.diseaseName}}
                        <a-button type="primary" class="enterBtn">进入</a-button>
                    </div>
                    <!-- 疾病的信息 -->
                    <div class="diseaseContent">
                        <!-- 统计类信息 -->
                        <div class="statistic">
                            <div class="number">
                                累计患者数量：{{item.totalPatitents}}
                                <span class="yesterdayAdd">昨日+{{item.addTotal}}</span>
                            </div>
                            <div class="number">
                                已完成数量：{{item.finished}}
                                <span class="yesterdayAdd">昨日+{{item.addFinished}}</span>
                            </div>
                        </div>
                        <a-divider type="vertical" style="height: 55px; background-color: #BBBBBB" />
                        <!-- 问卷调查信息 -->
                        <div class="questionnaire">
                            <a-button class="linkBtn" type="link">重症随访问卷<RightOutlined :style="{marginLeft: '2px'}" /></a-button>
                            <a-button class="linkBtn" type="link">轻症随访问卷<RightOutlined :style="{marginLeft: '2px'}" /></a-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue"
import { ScheduleTwoTone, FullscreenOutlined, ProfileTwoTone, RightOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const planInfo = reactive({
    progress: null, //随访完成度
    diseaseList: [], //各个疾病的情况信息
})
onMounted(() => {
    planInfo.progress = "20%"
    planInfo.diseaseList = [
        {
            id: '001',
            diseaseName: '鼻咽癌随访',
            totalPatitents: 32, //累计患者数量
            finished: 12, //已完成随访数量
            addTotal: 4, //昨日新增患者数量
            addFinished: 4, //昨日完成随访数量
        },
        {
            id: '002',
            diseaseName: '乳腺癌随访',
            totalPatitents: 32, //累计患者数量
            finished: 12, //已完成随访数量
            addTotal: 4, //昨日新增患者数量
            addFinished: 4, //昨日完成随访数量
        },
        {
            id: '003',
            diseaseName: '甲状腺癌随访',
            totalPatitents: 32, //累计患者数量
            finished: 12, //已完成随访数量
            addTotal: 4, //昨日新增患者数量
            addFinished: 4, //昨日完成随访数量
        },
        {
            id: '004',
            diseaseName: '胃癌随访',
            totalPatitents: 32, //累计患者数量
            finished: 12, //已完成随访数量
            addTotal: 4, //昨日新增患者数量
            addFinished: 4, //昨日完成随访数量
        },
        {
            id: '005',
            diseaseName: '肝癌随访',
            totalPatitents: 32, //累计患者数量
            finished: 12, //已完成随访数量
            addTotal: 4, //昨日新增患者数量
            addFinished: 4, //昨日完成随访数量
        },
        {
            id: '006',
            diseaseName: '直肠癌随访',
            totalPatitents: 32, //累计患者数量
            finished: 12, //已完成随访数量
            addTotal: 4, //昨日新增患者数量
            addFinished: 4, //昨日完成随访数量
        },
        {
            id: '007',
            diseaseName: '鼻咽癌随访',
            totalPatitents: 32, //累计患者数量
            finished: 12, //已完成随访数量
            addTotal: 4, //昨日新增患者数量
            addFinished: 4, //昨日完成随访数量
        },
        {
            id: '008',
            diseaseName: '鼻咽癌随访',
            totalPatitents: 32, //累计患者数量
            finished: 12, //已完成随访数量
            addTotal: 4, //昨日新增患者数量
            addFinished: 4, //昨日完成随访数量
        },
        {
            id: '009',
            diseaseName: '鼻咽癌随访',
            totalPatitents: 32, //累计患者数量
            finished: 12, //已完成随访数量
            addTotal: 4, //昨日新增患者数量
            addFinished: 4, //昨日完成随访数量
        },
        {
            id: '010',
            diseaseName: '鼻咽癌随访',
            totalPatitents: 32, //累计患者数量
            finished: 12, //已完成随访数量
            addTotal: 4, //昨日新增患者数量
            addFinished: 4, //昨日完成随访数量
        },
        {
            id: '011',
            diseaseName: '鼻咽癌随访',
            totalPatitents: 32, //累计患者数量
            finished: 12, //已完成随访数量
            addTotal: 4, //昨日新增患者数量
            addFinished: 4, //昨日完成随访数量
        },
    ]
})
// 跳转到计划管理页面
const jumpToPlanManage = () => {
    router.push({path: '/planManage'})
}
</script>

<style lang="less" scoped>
.planInfo {
    width: 100%;
    height: 100%;
    .title {
        display: flex;
        height: 10%;
        margin-bottom: -5px;
        .schedult-two-tone {
            font-size: 35px;
            margin-bottom: 1.5vh;
        }
        .planManange {
            font-size: 22px;
            font-family: "思源黑体";
            font-weight: bold;
            color: #033D32;
            margin-left: 5px;
            margin-top: 1px;
            .fullscreen-icon {
                font-size: 22px; /* 图标大小，根据需要调整 */
                cursor: pointer; /* 鼠标移动到上面时显示手势 */
            }
        }
        .progress {
            font-size: 20px;
            font-family: "思源黑体";
            margin-left: auto; //居右显示
            height: 80%;
            margin-top: 5px;
        }
    }
    .diseaseList {
        box-shadow: 3px 3px 11px rgba(0, 0, 0, 0.2);
        width: 100%;
        height: 90%;
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* 每行显示2个div */
        max-height: calc(3 * 15vh); /* 假设每个div的高度为14vh，只显示三行 */
        overflow-y: auto;

        /* 每个疾病的具体设置 */
        .disease { 
            height: 14vh; /* 设置每个div的高度 */
            box-sizing: border-box;
            border: 1px dashed #ccc; /* 仅为了视觉效果 */
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 0.7vh;
            margin-left: 10px;

            .profile-two-tone {
                font-size: 40px;
            }
            .diseaseInfo {
                display: flex;
                flex-direction: column;
                justify-content: center; /* 水平居中 */
                align-items: center; /* 垂直居中 */
                height: 90%;
                width: 90%;
                // background-color: pink;

                .disaseTitle {
                    width: 95%;
                    flex: 2;  /* 占据右侧高度的2/5 */
                    display: flex;
                    justify-content: space-between; /* 子元素分布在起始边和结束边 */
                    font-size: 20px;
                    font-family: "思源黑体";
                    font-weight: bold;
                    color: #033D32;
                    margin-top: 1vh;

                    .enterBtn {
                        width: 60px;
                        height: 30px;
                        background-color: #388B7C;
                        display: flex;
                        text-align: center;
                        justify-content: center;
                        border-radius: 4px;
                    }
                }

                .diseaseContent {
                    display: flex;
                    flex: 3;   /* 占据右侧高度的3/5 */
                    width: 95%;
                    height: 60%;

                    .statistic {
                        flex: 3; /* 占据右侧宽度的3/5 */
                        font-size: 18px;
                        font-family: "思源黑体";
                        height: 100%;
                        // background-color: palevioletred;
                        .number {
                            margin-bottom: 1vh;
                            display: flex;
                            justify-content: space-between; /* 子元素分布在起始边和结束边 */
                            .yesterdayAdd {
                                font-size: 14px;
                                font-family: "思源黑体";
                                margin-top: 3px;
                            }
                        }
                    }
                    .questionnaire {
                        flex: 2; /* 占据右侧宽度的2/5 */
                        // background-color: #388B7C;
                        height: 90%;
                        display: flex;
                        flex-direction: column;
                        align-items: center; /* 垂直居中 */
                        .linkBtn {
                            height: 45%;
                            color: #6C6C6C;
                        } 
                    }
                }
            }
        }
    }
}
</style>
