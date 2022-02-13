<template>
    <div>
        <el-table stripe
                  border
                  max-height="250"
                  style="width: 100%"
                  :data="tableData">
            <el-table-column
                    prop="name"
                    label="课程名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="classAddress"
                    label="上课地址"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="classTime"
                    label="上课时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="numPeople"
                    label="课程人数"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="statusCn"
                    label="课程状态"
                    width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleAdd">添加
                    </el-button>
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--弹窗，用于添加和修改-->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="course">
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                    <el-input v-model="course.name" clearable autocomplete="off"/>
                </el-form-item>
                <el-form-item label="上课地址" :label-width="formLabelWidth">
                    <el-input v-model="course.classAddress" clearable autocomplete="off"/>
                </el-form-item>
                <el-form-item label="上课时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="course.classTime"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="课程人数" :label-width="formLabelWidth">
                    <el-input-number v-model="course.numPeople" :min="0" :max="60" label="描述文字"/>
                </el-form-item>
                <el-form-item label="课程状态" :label-width="formLabelWidth">
                    <el-switch
                            v-model="course.status"
                            active-color="#13ce66"
                            inactive-color="#dcdfe6"
                            active-text="已结课"
                            inactive-text="未结课">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Courses",
        data() {
            return {
                tableData: [], // 表格数据
                pageInfo: { // 页码和显示数据量
                    pageNumber: 1,
                    pageSize: 10
                },
                dialogFormVisible: true,
                course: {
                    name: '',
                    classAddress: '',
                    classTime: '',
                    numPeople: 0,
                    status: false
                }, // 课程对象
                formLabelWidth: '120px',
            }
        },
        mounted() {
            this.initData();
        },
        methods: {
            /**
             * 查询所有未删除的课程
             */
            initData() {
                this.getRequest('/course/', this.pageInfo).then(resp => {
                    if (resp) {
                        let data = resp.data;
                        this.tableData = data.list;
                    }
                });
            },
            /**
             * 添加课程
             */
            handleAdd() {
                this.dialogFormVisible = false;
                // 拿到管理员信息
                let user = window.sessionStorage.getItem("user");
                this.course.creator = user.username;
                this.postRequest('/course/', this.course).then(resp => {
                    // 添加成功，再次查询所有课程
                    if (resp) {
                        this.initData();
                    }
                });
            }
        }
    }
</script>

<style>

</style>
