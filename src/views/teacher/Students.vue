<template>
    <div>
        <div style="margin: 10px 0px;">
            <el-input v-model="search.studentName" clearable autocomplete="off"/>
            <el-button
                    size="mini"
                    @click="handleSearch">搜索
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
                    studentName: ''
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
            initStudents(studentName) {
                let params = {};
                if (studentName) {
                    params = {roleName: "ROLE_student", username: studentName};
                } else {
                    params = {roleName: "ROLE_student"};
                }

                this.getRequest('/user/query', params).then(resp => {
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
                this.initStudents(this.search.studentName);
            }
        }
    }
</script>

<style scoped>

</style>
