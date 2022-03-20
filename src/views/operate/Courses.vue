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
                    prop="name"
                    label="课程名称">
            </el-table-column>
            <el-table-column
                    prop="classAddress"
                    label="上课地址">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="上课时间">
            </el-table-column>
            <el-table-column
                    prop="weekContent"
                    label="每周几(18周结束)">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="教师名称">
            </el-table-column>
            <el-table-column
                    prop="numPeople"
                    label="课程人数">
            </el-table-column>
            <el-table-column
                    prop="statusCn"
                    label="课程状态">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
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

        <!--弹窗，用于添加和修改-->
        <el-dialog title="添加课程资料" :visible.sync="dialogFormVisible">
            <el-form :model="course">
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                    <el-input v-model="course.name" clearable autocomplete="off" style="width: 230px;"/>
                </el-form-item>
                <el-form-item label="上课地址" :label-width="formLabelWidth">
                    <el-input v-model="course.classAddress" clearable autocomplete="off" style="width: 230px;"/>
                </el-form-item>
                <el-form-item label="任课老师" :label-width="formLabelWidth">
                    <el-select v-model="course.userId" placeholder="请选择">
                        <el-option
                                v-for="item in teachers"
                                :key="item.userId"
                                :label="item.label"
                                :value="item.userId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上课时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="course.classStartTime"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="下课时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="course.classEndTime"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
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
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleCommit">确 定</el-button>
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
                dialogFormVisible: false,
                course: { // 课程实体对象
                    id: '',
                    userId: '',
                    name: '',
                    classAddress: '',
                    classStartTime: '',
                    classEndTime: '',
                    numPeople: 0,
                    status: false,
                    creator: ''
                }, // 课程对象
                formLabelWidth: '120px',
                teachers: []
            }
        },
        created() {

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
                // 初始化教师数据
                this.initTeachers();
            },
            initTeachers() {
                this.getRequest('/user/query', {roleName: "ROLE_teacher"}).then(resp => {
                    if (resp) {
                        resp.data.forEach((item) => {
                            this.teachers.push({userId: item.id, label: item.username});
                        });
                    }
                });
            },
            /**
             * 处理弹窗
             */
            handleAddOrModify(index, data) {
                // 判断当前行数据是否为空，不为空则回填显示显示数据
                if (data) {
                    this.$nextTick(() => {
                        this.course = data;
                    })
                }
                this.dialogFormVisible = true;
            },
            /**
             * 处理删除行数据
             */
            handleDelete(index, data) {

                this.$confirm('此操作将永久删除该【' + data.name + '】课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/course/' + data.id).then(resp => {
                        if (resp) {
                            this.initData();
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
             * 处理添加或修改课程
             */
            handleCommit(index, data) {
                // 关闭弹窗
                this.dialogFormVisible = false;
                // 拿到管理员信息
                let user = JSON.parse(window.sessionStorage.getItem("user"));
                this.course.creator = user.username;
                this.postRequest('/course/', this.course).then(resp => {
                    // 判断添加或修改的课程是否发生冲突
                    if (resp.data && resp.data.isConflict) {
                        this.$confirm(resp.data.conflictMsg, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            console.log(this.course)
                            this.postRequest('/course/confirm_coverage', this.course).then(resp => {
                                if (resp) {
                                    this.clearData();
                                    this.initData();
                                }
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                    } else {
                        this.clearData();
                        this.initData();
                    }
                });
            },
            /**
             * 取消弹窗
             */
            handleCancel() {
                this.dialogFormVisible = false;
                this.clearData();
            },
            /**
             * 清空实体数据
             */
            clearData() {
                this.course = {
                    id: '',
                    name: '',
                    classAddress: '',
                    classStartTime: '',
                    classEndTime: '',
                    numPeople: 0,
                    status: false
                };
                this.teachers = [];
            }
        }
    }
</script>

<style>

</style>
