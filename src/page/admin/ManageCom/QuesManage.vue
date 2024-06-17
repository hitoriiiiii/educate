<template>
    <div class="content">
        <a-button type="primary" @click="showModal" style="margin-right:10px">
            <template #icon><PlusSquareOutlined /></template>
            新增
        </a-button>
        <!-- 新增对话框 -->
        <a-modal 
            v-model:open="open" 
            title="新增问答" 
            @ok="handleOk"
            :okButtonProps="{ hidden: true }"  
            :cancelButtonProps="{ hidden: true }"
            ><!-- :model="formState" -->
            <a-form 
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
                layout="vertical"
                style="padding: 30px 50px 0px 50px;"
                >
                <a-form-item  label="问题类型" name="type" :rules="[{ required: true, message: '请选择问题类型!' }]">
                    <a-select placeholder="请选择类型" v-model:value="formState.type">
                        <a-select-option value="0">单选</a-select-option>
                        <a-select-option value="1">多选</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item  label="问题题目" name="ques" :rules="[{ required: true, message: '请输入问题题目!' }]">
                    <a-input v-model:value="formState.ques"/>
                </a-form-item>
                <!-- 添加答案框 -->
                    <a-form-item
                    v-for="(ans, index) in formState.ans"
                    :key="index"
                    :label="index === 0 ? '问题答案' : ''"
                    style="display: flex; justify-content: flex-end;"
                    :name="['ans', index, 'value']"
                    :rules="[{ required: true, message: '请添加问题答案!' }]"
                    >
                    <a-input 
                        v-model:value="ans.value"
                        style="width: 88%; margin-right: 4px"
                    />
                    <!-- 减号 -->
                    <MinusCircleOutlined
                        style="color:#AF000082;"
                        class="dynamic-delete-button"
                        @click="removeDomain(ans)"
                    />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayoutWithOutLabel" style="display: flex; justify-content: flex-end;">
                    <a-button type="dashed" @click="addDomain" style="width: 88%; margin-right: 4px">
                        <PlusOutlined />
                        添加答案
                    </a-button>
                    </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit" style="margin-right: 10px;">添加</a-button>
                    <a-button style="margin-left: 70px; " @click="closeModel" >取消</a-button>
                </a-form-item>
            </a-form>
        </a-modal>




        <!-- 问答内容表格 :rowKey="record => record.number"-->
        <div class="quesTable">
            <a-table 
                :columns="columns"
                :data-source="dataSource"
                :scroll="{ y: '55vh' }"
                :pagination="pagination"
                :bordered="true"
                @change="handleTableChange"
                >
                <template v-for="col in ['ques', 'ans', 'type']" #[col]="{ text, record }" :key="col">
                    <div>
                        <a-input
                        v-if="editableData[record.key]"
                        v-model:value="editableData[record.key][col]"
                        style="margin: -5px 0"
                        />
                        <template v-else>
                        {{ text }}
                        </template>
                    </div>
                </template>


                <template #bodyCell="{ column , record }">
                    <!-- 如果答案是数组 -->
                    <!-- <template v-if="column.dataIndex === 'ans'">  
                        <div>{{ record.ans.join(', ') }}</div>  
                    </template>   -->

                    <template v-if="column.dataIndex === 'operation'">
                        <!-- <div class="operationBtn">

                            
                            <a-button @click="edit(record.key)" type="primary" size="small" style="background-color: #388B7C; margin-right:10px">编辑</a-button>                         
                            <a-popconfirm title="是否删除?" ok-text="确认" cancel-text="取消" @confirm="oneDel">
                                <a-button type="primary" danger size="small">删除</a-button>
                            </a-popconfirm>
                        </div> -->
                        <!-- <template #operation="{ record }"> -->
                        <div class="editable-row-operations">
                            <span v-if="editableData[record.key]">
                            <!-- <a @click="save(record.key)">Save</a> -->
                            <a-button @click="save(record.key)" type="primary" size="small" style="background-color: #388B7C; margin-right:10px">保存</a-button>
                            <a-popconfirm title="确认取消?" @confirm="cancel(record.key)">
                                <!-- <a>Cancel</a> -->
                                <a-button  type="primary" size="small" style="background-color: #388B7C; margin-right:10px">取消</a-button>
                            </a-popconfirm>
                            </span>
                            <span v-else>
                                <a-button @click="edit(record.key)" type="primary" size="small" style="background-color: #388B7C; margin-right:10px">编辑</a-button>
                            
                            <a-popconfirm title="是否删除?" ok-text="确认" cancel-text="取消" @confirm="oneDel">
                                <a-button type="primary" danger size="small">删除</a-button>
                            </a-popconfirm>
                        </span>
                        </div>
                    </template>
                    <!-- </template> -->
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup>
import { cloneDeep } from 'lodash-es';
import { message } from 'ant-design-vue';
import { MinusCircleOutlined,PlusSquareOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { defineComponent,ref, reactive, onMounted, watch} from "vue"
// 表头数据
const columns = [
    { title: '序号', dataIndex: 'key', width:'5%', align: 'center'},
    { title: '问题', dataIndex: 'ques', width:'30%', align: 'center',slots: {
      customRender: 'ques',
    },},
    { title: '答案', dataIndex: 'ans', width:'40%', align: 'center',slots: {
      customRender: 'ans',
    },},                         
    { title: '问题类型', dataIndex: 'type', width:'8%', align: 'center',slots: {
      customRender: 'type',
    },},
    { title: '操作', dataIndex: 'operation', align: 'center'},  
];
const dataSource = ref([])
const editableData = reactive({});
// 获取所有执行情况列表
const getDisplayList = () => {
    dataSource.value = [
        {
            key: '1',
            ques: '您目前的饮食状况如何',
            // ans:['头痛','耳鸣','听力下降','鼻塞','其他','无明显症状'],
            ans:'头痛,耳鸣,听力下降,鼻塞,其他,无明显症状',
            type: '单选'
        },
        {
            key: '2',
            ques: '您的睡眠质量如何',
            ans: '良好,一般,差',
            type: '单选'
        },
        {
            key: '3',
            ques: '在过去的一个月里，您有以下哪些症状',
            ans: '良好,一般,差',
            type: '多选'
        },
        {
            key: '4',
            ques: '您是否经历了以下治疗副作用',
            ans: '口腔炎,咽喉疼痛,皮肤红肿,头发脱落,无副作用',
            type: '多选'
        },
        {
            key: '5',
            ques: '您是否经历了以下治疗副作用',
            ans: '口腔炎,头发脱落,无副作用',
            type: '多选'
        }
    ]
        for (let i = 6; i < 55; i++) {
            dataSource.value.push({
            key: i,
            ques: 'this is the question' + i,
            ans: '口腔炎,头发脱落,ans3,ans4,答案'+i,
            type: '多选'
        });
        }
}
// 表格页码相关设置
const pagination = reactive({
    pageSize: 10, //每页最多条目数
    current: 1, //当前页码
    total: 55, //总条目数
    showTotal: (total, range) => `总共 ${total} 条数据`, // 在这里定义显示总数据量的格式
})
// 处理翻页
const handleTableChange = (e) => {
    pagination.current = Number(e.current)
    getDisplayList()
}
// “新增”对话框数据
const open = ref(false)
const showModal = () => {
  open.value = true;
  formState.ans.push({
        value: '',
      }); 
    console.log('formState:', formState, formState.ans)
};
const closeModel = () => {
    open.value = false;
}
//提交问题数据
const formState = reactive({
    type:'',
    ques:'',
    ans:[],
});
  //编辑逻辑
    const edit = key => {
      editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
      console.log(dataSource.value.filter(item => key === item.key)[0])
      console.log(editableData[key])
    };
    const save = key => {
      console.log(editableData[key])
      Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
      delete editableData[key];
      
    };
    const cancel = key => {
      delete editableData[key];
    };

//添加移除答案
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 16
      },  
    };
    const removeDomain = item => {
      let index = formState.ans.indexOf(item);
      if (index !== -1) {
        formState.ans.splice(index, 1);
      }
    };
    const addDomain = () => {
        formState.ans.push({
        value: '',
      }); 
      console.log('----------------------')
    };


// 提交表单且数据验证成功后回调事件
const onFinish = values => {
    // 调用新增接口，将values传给后台
    // --（待调用接口）
    // 弹窗提示，添加成功
    console.log('formState:', formState, formState.ans);
    message.success({
    content: () => '添加成功！',
    style: {
      marginTop: '20vh',
    },
    });
    // 清空表单数据
    for(let val in values){
        if (val !== 'ans') {
        formState[val] = '';
    }
    else if (val == 'ans') {
        formState[val] = [];
    }
    }
    // 关闭对话框
    open.value = false;
    // 调用查找接口，刷新表格数据
    // --（待调用接口）
};

// 提交新增表单且数据验证失败后回调事件
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

onMounted(() => {
    getDisplayList()
})
</script>

<style lang='less' scoped>
.content {
    background-color: white;
    padding: 10px;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
    .quesTable {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        min-height: 64vh;
        // background-color: aqua;
    }
}
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>