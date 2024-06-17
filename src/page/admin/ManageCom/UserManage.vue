<template>
    <div class="adminLayout">
        <a-layout>
            <!-- 管理员页面内容区域 -->
            <a-layout-content class="content">
                <!-- 搜索表单 -->
                <a-form class="searchForm">
                    <a-form-item label="姓名" style="margin-right: 25px;margin-left: 40px;">
                        <a-input placeholder="请输入姓名" v-model:value="serchInfo.name" allowClear="true"/>
                    </a-form-item>
                    <a-form-item label="角色" style="margin-right: 25px">
                        <a-select placeholder="请选择角色" v-model:value="serchInfo.role" style="width: 200px;" allowClear="true">
                            <a-select-option value="3">护士长</a-select-option>
                            <a-select-option value="2">护士</a-select-option>
                            <a-select-option value="1">管理员</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item style="margin-right: 25px">
                        <a-button type="primary" @click.prevent="handleSubmit" style="background-color: #388B7C;">查询</a-button>
                    </a-form-item>
                </a-form>
                <!-- 表格区域 -->
                <div class="userTable">
                    <!-- 按钮 -->
                    <div>
                        <a-button type="primary" class="opsAllBtn" @click="showModal">
                            <template #icon><PlusSquareOutlined /></template>
                            新增
                        </a-button>
                        <!-- 新增对话框 -->
                        <a-modal 
                            v-model:open="open" 
                            title="新增" 
                            @ok="handleOk"
                            :okButtonProps="{ hidden: true }"  
                            :cancelButtonProps="{ hidden: true }"
                            >
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
                                <a-form-item label="ID" name="id" :rules="[{ required: true, message: '请填写工号!' }]">
                                    <a-input v-model:value="formState.id" />
                                </a-form-item>
                                <a-form-item label="姓名" name="name" :rules="[{ required: true, message: '请填写姓名!' }]">
                                    <a-input v-model:value="formState.name" />
                                </a-form-item>
                                <a-form-item label="角色" name="role" :rules="[{ required: true, message: '请选择角色!' }]">
                                    <a-select placeholder="请选择角色" v-model:value="formState.role">
                                        <a-select-option value="3">护士长</a-select-option>
                                        <a-select-option value="2">护士</a-select-option>
                                        <a-select-option value="1">管理员</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="账户状态" name="account" :rules="[{ required: true, message: '请选择账户状态!' }]">
                                    <a-select placeholder="请选择账户状态" v-model:value="formState.account">
                                        <a-select-option value="1">启用</a-select-option>
                                        <a-select-option value="0">禁用</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="注册时间" name="registerTime" :rules="[{ required: true, message: '请确认注册时间!' }]">
                                    <a-date-picker v-model:value="formState.registerTime" style="width: 100%" />
                                </a-form-item>
                                <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请设置登录密码!' }]">
                                    <a-input-password v-model:value="formState.password" />
                                </a-form-item>

                                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                                    <a-button type="primary" html-type="submit" style="margin-right: 10px;">确定</a-button>
                                    <a-button @click="closeModel">取消</a-button>
                                </a-form-item>
                            </a-form>
                        </a-modal>
                        <a-popconfirm
                            title="是否批量禁用?"
                            ok-text="确认"
                            cancel-text="取消"
                            @confirm="batchBan"
                        >
                            <a-button type="primary" style="background-color: #9A9A9A;" class="opsAllBtn">
                                <template #icon><StopOutlined /></template>
                                批量禁用
                            </a-button>
                        </a-popconfirm>
                        <a-popconfirm
                            title="是否批量启用?"
                            ok-text="确认"
                            cancel-text="取消"
                            @confirm="batchEnable"
                        >
                            <a-button type="primary" class="opsAllBtn">
                                <template #icon><CheckOutlined /></template>
                                批量启用
                            </a-button>
                        </a-popconfirm>
                        <a-popconfirm
                            title="是否批量删除?"
                            ok-text="确认"
                            cancel-text="取消"
                            @confirm="batchDel"
                        >
                            <a-button type="primary" danger class="opsAllBtn">
                                <template #icon><DeleteOutlined /></template>
                                批量删除
                            </a-button>
                        </a-popconfirm>
                    </div>
                    <!-- 表格 -->
                    <a-table 
                        :row-selection="rowSelection" 
                        :columns="columns" 
                        :data-source="data"
                        :pagination="ipagination1"
                        @change="handleTableChange"
                        :scroll="{ y: '55vh' }"
                        :bordered="true"
                        >
                        <template #bodyCell="{ column, text }">
                            <!-- 根据role的数值类型，显示护士、管理员、护士长 -->
                            <template v-if="column.dataIndex === 'role'">
                                    {{ roleSelection[text] }}
                            </template>
                            <!-- 根据account的布尔类型，显示“启用”或“禁用” -->
                            <template v-if="column.dataIndex === 'account'">
                                {{ text===true ? '启用' : '禁用' }}
                                <!-- <template v-if="text === true">
                                    <span style="color: green;">启用</span>
                                </template>
                                <template v-else>
                                    <span style="color: red;">禁用</span>
                                </template> -->
                            </template>
                            <template v-if="column.dataIndex === 'operation'">
                                <div class="operationBtn">
                                    <a-button type="primary" size="small" style="background-color: #388B7C;">查看</a-button>
                                    <a-popconfirm title="是否删除?" ok-text="确认" cancel-text="取消" @confirm="oneDel">
                                        <a-button type="primary" danger size="small">删除</a-button>
                                    </a-popconfirm>
                                    <a-popconfirm title="是否禁用?" ok-text="确认" cancel-text="取消" @confirm="oneBan">
                                        <a-button type="primary" size="small" style="background-color: #9A9A9A;">禁用</a-button>
                                    </a-popconfirm>
                                    <a-popconfirm title="是否启用?" ok-text="确认" cancel-text="取消" @confirm="oneEnable">
                                        <a-button type="primary" size="small">启用</a-button>
                                    </a-popconfirm>
                                </div>
                            </template>
                        </template>
                    </a-table>
                </div>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script setup>
import { PlusSquareOutlined, StopOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue'; 

// 搜索框表单数据
const serchInfo = reactive({
    name: null,
    role: null,
});
// 定义提交函数
const handleSubmit = () => {
    console.log(serchInfo);
};
// 表格数据
const columns = [
{ title: 'ID', dataIndex: 'id', width:'12%', align: 'center'},
  { title: '姓名', dataIndex: 'name', width:'15%', align: 'center'},
  { title: '角色', dataIndex: 'role', width:'15%', align: 'center'},
  { title: '账户状态', dataIndex: 'account', width:'8%', align: 'center'},
  { title: '注册时间', dataIndex: 'registertime', width:'15%', align: 'center'},
  { title: '操作', dataIndex: 'operation', align: 'center'},  
];
const data = [
  {
    key: 'P0000000001',
    id:'P0000000001',
    name: '李维嘉',
    role: 2,
    account: true,
    registertime: '2021-05-01',
  },
  {
    key: 'P0000000002',
    id:'P0000000002',
    name: '孙逊',
    role: 1,
    account: false,
    registertime: '2021-05-01',
  },
];
// 随机生成表格数据
for (let i = 3; i < 20; i++) {
  data.push({
    key: i.toString(),
    id: i.toString(),
    name: `人物 ${i}`,
    role: `${i%4===0 ? '3' : '2'}`,
    account: true,
    registertime: '2021-05-01',
  });
}
const roleSelection = {
        1: '管理员',
        2: '护士',
        3: '护士长',
    }
const selectedUser = reactive([])  // 存储已经选择的信息
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    selectedUser.value = selectedRows  // 将已选中的表格信息
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }), 
};
// 分页数据
const ipagination1 = reactive({
    current:1,
    pageSize:7,
    pageSizeOptions:['7','15','20','25'],
    showTotal:(total) => {
        return '共'+total+'条'
    },
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0,
})
// 分页逻辑
const handleTableChange = (pagination) => {
    ipagination1.current = pagination.current;
    ipagination1.pageSize = pagination.pageSize;
};
// “新增”对话框数据
const open = ref(false)
const showModal = () => {
  open.value = true;
};
const closeModel = () => {
    open.value = false;
}
const formState = reactive({
  id: '',
  name:'',
  role:'',
  account:'',
  registerTime: '',
  password: '',
});
// 提交表单且数据验证成功后回调事件
const onFinish = values => {
    // 调用新增接口，将values传给后台
    // --（待调用接口）
    // 弹窗提示，添加成功
    message.success({
    content: () => '添加成功！',
    style: {
      marginTop: '20vh',
    },
    });
    // 清空表单数据
    for(let val in values){
        formState[val] = '';
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
// 批量禁用逻辑
const batchBan = () => {
    // 1、获取已选择的数据（已经获取到的数据在selectedUser.value中）
    console.log('测试',selectedUser.value) 
    // 2、调用批量禁用接口，进行禁用

    // 3、弹窗提示，禁用成功
    if(selectedUser.value!==undefined){
        message.success({
            content: () => '批量禁用成功！',
            style: {
            marginTop: '20vh',
            },
        });
    }
    // 4、调用接口，刷新table

}
// 批量启用逻辑
const batchEnable = () => {
    // 1、获取已选择的数据
    console.log('测试',selectedUser.value) 
    // 2、调用批量启用接口，进行启用

    // 3、弹窗提示，启用成功
    if(selectedUser.value!==undefined){
        message.success({
            content: () => '批量启用成功！',
            style: {
            marginTop: '20vh',
            },
        });
    }
    // 4、调用接口，刷新table

}
// 批量删除逻辑
const batchDel = () => {
    // 1、获取已选择的数据
    console.log('测试',selectedUser.value) 
    // 2、调用批量删除接口，进行删除

    // 3、弹窗提示，删除成功
    if(selectedUser.value!==undefined){
        message.success({
            content: () => '批量删除成功！',
            style: {
            marginTop: '20vh',
            },
        });
    }
    // 4、调用接口，刷新table

}
// 单个删除(写到这里了)
const oneDel = () => {

}
</script>

<style lang="less" scoped>
.adminLayout {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    .content {
        width: 100%;
        height: 100%;
        .searchForm {
            width: 700px;
            display: flex;
            justify-content: space-between;
            margin:0 auto;
        }
        .userTable {
            background-color: #fff;
            // height: 88%;
            // height: 81vh;
            width: 100%;
            margin:0 auto;
            box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
            padding: 20px;
            .operationBtn * {
                margin-right: 10px;
            }
            .opsAllBtn {
                margin-bottom: 10px;
                margin-right: 25px;
            }
            .addForm {
                padding-top: 20px !important;
            }
        }
    }
}
</style>