<template>
    <div style="margin-top: 10px;">
        <el-table stripe
                  border
                  max-height="600"
                  style="width: 90%"
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
                    prop="time"
                    label="上课时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="weekContent"
                    label="每周几(18周结束)"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="numPeople"
                    label="课程人数">
            </el-table-column>
            <el-table-column
                    prop="statusCn"
                    label="课程状态">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "MyCourses",
        data() {
            return {
                tableData: [],
                pageInfo: {
                    pageNumber: 1,
                    pageSize: 10
                },
                formLabelWidth: '120px',
                user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        mounted() {
            this.initMyCourse();
        },
        methods: {
            initMyCourse() {
                if (this.user) {
                    let params = {
                        pageNumber: this.pageInfo.pageNumber,
                        pageSize: this.pageInfo.pageSize,
                        userId: this.user.id
                    };
                    this.getRequest('/course/my_courses', params).then(resp => {
                        if (resp) {
                            this.tableData = resp.data.list;
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
