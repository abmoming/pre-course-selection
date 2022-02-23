<template>
    <div>
        <div style="margin: 10px 0px;">
            <el-button
                    type="primary"
                    size="mini"
                    @click="handleAddOrModify">添加
            </el-button>
        </div>
        <el-table stripe
                  border
                  max-height="600"
                  style="width: 50%"
                  :data="tableData">
            <el-table-column
                    prop="username"
                    label="学生名称"
                    width="260">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleAddOrModify(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加学生" :visible.sync="dialogFormVisible">
            <el-form :model="student">
                <el-form-item label="学生名称" :label-width="formLabelWidth">
                    <el-input v-model="student.username" clearable autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleCommit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Students",
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                student: {
                    id: '',
                    username: '',
                    roleName: 'ROLE_student',
                    creator: ''
                },
                formLabelWidth: '120px'
            }
        },
        mounted() {
            this.initStudents();
        },
        methods: {
            /**
             * 初始化所有教师
             */
            initStudents() {
                this.getRequest('/user/query', {roleName: "ROLE_student"}).then(resp => {
                    if (resp) {
                        this.tableData = resp.data;
                    }
                });
            },
            // 处理新增或修改
            handleAddOrModify(index, data) {
                // 判断当前行数据是否为空，不为空则回填显示显示数据
                if (data) {
                    this.student = data;
                }
                this.dialogFormVisible = true;
            },
            // 删除
            handleDelete(index, data) {

                this.$confirm('此操作将永久删除该【' + data.username + '】学生, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/user/" + data.id).then(resp => {
                        if (resp) {
                            this.initStudents();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /**
             * 取消，清空数据
             */
            handleCancel() {
                this.dialogFormVisible = false;
            },
            handleCommit() {
                let user = JSON.parse(window.sessionStorage.getItem("user"));
                this.student.creator = user.username;
                this.postRequest('/user/', this.student).then(resp => {
                    if (resp) {
                        this.dialogFormVisible = false;
                        this.clear();
                        this.initStudents();
                    }
                });
            },
            clear() {
                this.student = {
                    id: '',
                    username: '',
                    roleName: 'ROLE_student',
                    creator: ''
                };
            }
        }
    }
</script>

<style>

</style>
