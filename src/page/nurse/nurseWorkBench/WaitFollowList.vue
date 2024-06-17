<!-- 教师--工作台--待批改列表 -->
<template>
  <div class="followListCard">
    <!-- 表格标题 -->
    <div class="tableTitle" >
      <ScheduleTwoTone two-tone-color="#44A997" style="margin-right: 8px" />
      <span class="tableTitleText" @click="jumpToFollow">待批改列表</span>
    </div>
    <!-- 表格内容 -->
    <div class="followTable">
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :columns="columns"
        :data-source="dataSource"
        :rowKey="(record) => record.type"
        :scroll="{ y: '35vh' }"
        :pagination="false"
        :bordered="true"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'todeadline'">
            <!-- 当本行的数据时负数时，显示“已逾期，且颜色是红色”；若数据为正数，显示获得的数据 -->
              <span v-if="record[column.key] < 0" style="color: red">已逾期</span>
              <span v-else>{{ record[column.key] }}</span>
          </template>
          <template v-if="column.key === 'operation'">
            <!-- 当状态为已批改时，操作栏的“去批改”变成灰色，且不能点击；否则“去批改”为绿色，且点击可以去批改 -->
              <span v-if="record['todeadline'] === null" style="color: grey">去批改</span>
              <span v-else><a @click="jumpToFollowDetail" style="color: #368467;font-weight:500">去批改</a></span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ScheduleTwoTone } from "@ant-design/icons-vue";
import { getFollowListApi } from '@/api/nurse/nurseWorkbench'
import { message } from 'ant-design-vue'

// 跳转到批改列表页面
const router = useRouter();
const jumpToFollow = () => {
    router.push({path: '/follow'})
}

const columns = [
  {
    title: "ID",
    width: "12%",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "姓名",
    width: "16%",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "电话",
    dataIndex: "tel",
    key: "tel",
    width: "12%",
    align: "center",
  },
  {
    title: "性别",
    dataIndex: "sex",
    key: "sex",
    width: "7%",
    align: "center",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    width: "7%",
    align: "center",
  },
  {
    title: "分组",
    dataIndex: "group",
    key: "group",
    width: "8%",
    align: "center",
  },
  {
    title: "截止日期",
    dataIndex: "deadline",
    key: "deadline",
    width: "10%",
    align: "center",
  },
  {
    title: "截止时限",
    dataIndex: "todeadline",
    key: "todeadline",
    width: "8%",
    align: "center",
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
    width: "10%",
    align: "center",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: "8%",
    align: "center",
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: "10%",
    align: "center",
  },
];
const dataSource = ref([]);

// 获取批改列表
const getFollowList = () => {
  // getFollowListApi().then(res => {
  //   if(res.data.code === 200){
  //       for (let i = 0; i < res.data.data.rows.length; i++) {
  //         dataSource.value.push(
  //           {
  //             id: res.data.data.rows[i].patientCode,
  //             name: res.data.data.rows[i].patientName,
  //             sex: res.data.data.rows[i].gender,
  //             age: res.data.data.rows[i].age,
  //             tel: res.data.data.rows[i].phonenumber,
  //             group: res.data.data.rows[i].cancerName,
  //             deadline: res.data.data.rows[i].latestFollowDue,
  //             todeadline: res.data.data.rows[i].days,
  //             remark: res.data.data.rows[i].note,
  //             status: res.data.data.rows[i].followUpSituation,
  //             operation: "操作",
  //           }
  //         );
  //       }
  //   }else{
  //     message.error("获取失败！" + res.data.msg)
  //   }
  //   }).catch((err) => {
  //     console.log(err)
  // })
  const genders = ['男', '女'];

  for (let i = 0; i < 35; i++) {
          dataSource.value.push(
            {
              id: i,
              name: "name"+i,
              sex: genders[Math.floor(Math.random() * genders.length)],
              age: Math.floor(Math.random() * 20) + 1,
              tel: '1300000000' + (Math.floor(Math.random() * 10000000) + 1),
              group: "chinese",
              deadline: "2024-06-18",
              todeadline: 8,
              remark:"XX",
              status: "未批改",
              operation: "操作",
            }
          );
        }
}

// 跳转到批改详情页
const jumpToFollowDetail = () => {
  router.push({
    path: "/followDetail",
  });
};

// 在mounted生命周期中调用"获取列表数据函数"
onMounted(() => {
  getFollowList();
});
</script>

<style lang="less" scoped>
.followListCard {
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  padding: 15px 15px 0px 15px;
  .tableTitle {
    font-size: 22px;
    cursor: pointer;
    margin-bottom: 10px;
    .tableTitleText {
      font-weight: bold;
      color: #033d32;
    }
  }
  .followTable {
    padding-bottom: 10px;
  }
}
// 设置表头背景色为绿色
:deep(.ant-table-thead) > tr > th {
  background: #d3ded8 !important;
}
</style>
