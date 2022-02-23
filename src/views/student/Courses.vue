<template>
    <div>
        <div style="margin: 10px 0px;">
            <el-input v-model="userOrCouName" placeholder="请输入课程名称或教师名称..." clearable autocomplete="off" style="width: 230px; margin-right: 10px;"/>
            <el-button
                    size="mini"
                    @click="handleSearch">搜索
            </el-button>
        </div>
        <el-table stripe
                  border
                  max-height="600"
                  style="width: 70%"
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
                    prop="classStartTime"
                    label="上课时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="classEndTime"
                    label="下课时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="numPeople"
                    label="课程人数"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="statusCn"
                    label="课程状态"
                    width="150">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                            :disabled="scope.row.isDisabled"
                            size="mini"
                            @click="handleSelectCourse(scope.$index, scope.row)"
                    >{{scope.row.isDisabled ? '已选课': '选课'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "SCourses",
        data() {
            return {
                tableData: [],
                myCourses: [],
                pageInfo: {
                    pageNumber: 1,
                    pageSize: 10
                },
                userOrCouName: '',
                formLabelWidth: '120px',
                user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        mounted() {
            this.initData();
        },
        methods: {
            initData() {
                // 并发多个请求
                this.allRequest(this.getRequest('/course/', this.pageInfo),
                    this.getRequest('/course/my_courses', {
                        pageNumber: this.pageInfo.pageNumber,
                        pageSize: this.pageInfo.pageSize,
                        userId: this.user.id
                    })).then((resp) => {
                    // 查询所有课程
                    this.tableData = resp[0].data.list;
                    // 查询本人的课程
                    this.myCourses = resp[1].data.list;
                    // 已选的课程将无法再次选课
                    this.tableData.forEach(item1 => {
                        this.myCourses.forEach(item2 => {
                            if (item1.id === item2.id) {
                                item1 = item1.isDisabled = true;
                            }
                        });
                    });
                });
            },
            initMyCourse() {
                if (this.user) {
                    let params = {
                        pageNumber: this.pageInfo.pageNumber,
                        pageSize: this.pageInfo.pageSize,
                        userId: this.user.id
                    };
                    this.getRequest('/course/my_courses', params).then(resp => {
                        if (resp) {
                            this.myCourses = resp.data.list;
                        }
                    });
                }
            },
            handleSelectCourse(index, rowData) {
                this.postRequest('/course/select_course', {userId: this.user.id, couId: rowData.id}).then(resp => {
                    if(resp){
                        this.initData();
                    }
                });
            },
            handleSearch() {
                this.getRequest('/course/', {
                    pageNumber: this.pageInfo.pageNumber,
                    pageSize: this.pageInfo.pageSize,
                    userOrCouName: this.userOrCouName}).then(resp => {
                    if(resp) {
                        this.tableData = resp.data.list;
                        this.userOrCouName = '';
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
