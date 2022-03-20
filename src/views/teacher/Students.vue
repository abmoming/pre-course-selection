<template>
    <div>
        <div style="margin: 10px 0px;">
            <el-input v-model="search.studentName" placeholder="输入学生名称..." clearable autocomplete="off" style="width: 260px;margin-right: 10px;"/>
            <el-input v-model="search.couName" placeholder="输入课程名称..." clearable autocomplete="off" style="width: 260px;margin-right: 10px;"/>
            <el-button
                    size="mini"
                    @click="handleSearch">搜索
            </el-button>
        </div>
        <el-table stripe
                  border
                  max-height="600"
                  style="width: 90%"
                  :data="tableData">
            <el-table-column
                    prop="userCode"
                    label="学号">
            </el-table-column>
            <el-table-column
                    prop="classes"
                    label="班级">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="学生名称">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="课程名称">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "TStudents",
        data() {
            return {
                tableData: [],
                search: {
                    studentName: '',
                    couName: ''
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
            initStudents(studentName, couName) {
                let params = {};
                if (studentName || couName) {
                    params = {roleName: "ROLE_student", username: studentName, couName: couName};
                } else {
                    params = {roleName: "ROLE_student"};
                }

                this.getRequest('/user/query2', params).then(resp => {
                    if (resp) {
                        this.tableData = resp.data;
                        this.search.studentName = '';
                    }
                });
            },
            /**
             * 搜索
             */
            handleSearch() {
                this.initStudents(this.search.studentName, this.search.couName);
            }
        }
    }
</script>

<style scoped>

</style>
