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
                  style="width: 100%"
                  :data="tableData">
            <el-table-column
                    prop="userCode"
                    label="教师工号">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="教师名称">
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

        <el-dialog title="添加任课老师" :visible.sync="dialogFormVisible">
            <el-form :model="teacher">
                <el-form-item label="教师工号" :label-width="formLabelWidth">
                    <el-input v-model="teacher.userCode" clearable autocomplete="off"/>
                </el-form-item>
                <el-form-item label="教师名称" :label-width="formLabelWidth">
                    <el-input v-model="teacher.username" clearable autocomplete="off"/>
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
        name: "Teachers",
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                teacher: {
                    id: '',
                    username: '',
                    userCode: '',
                    roleName: 'ROLE_teacher',
                    creator: ''
                },
                formLabelWidth: '120px'
            }
        },
        mounted() {
            this.initTeachers();
        },
        methods: {
            /**
             * 初始化所有教师
             */
            initTeachers() {
                this.getRequest('/user/query', {roleName: "ROLE_teacher"}).then(resp => {
                    if (resp) {
                        this.tableData = resp.data;
                    }
                });
            },
            // 处理新增或修改
            handleAddOrModify(index, data) {
                // 判断当前行数据是否为空，不为空则回填显示数据
                if (data) {
                    this.teacher = data;
                }
                this.dialogFormVisible = true;
            },
            // 删除
            handleDelete(index, data) {

                this.$confirm('此操作将永久删除该【' + data.username + '】教师, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/user/" + data.id).then(resp => {
                        if (resp) {
                            this.initTeachers();
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
                this.teacher.creator = user.username;
                this.postRequest('/user/', this.teacher).then(resp => {
                    if (resp) {
                        this.dialogFormVisible = false;
                        this.clear();
                        this.initTeachers();
                    }
                });
            },
            clear() {
                this.teacher = {
                    id: '',
                    username: '',
                    userCode: '',
                    roleName: 'ROLE_teacher',
                    creator: ''
                };
            }
        }
    }
</script>

<style>

</style>
