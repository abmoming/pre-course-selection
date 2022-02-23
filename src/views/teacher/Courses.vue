<template>
    <div>
        <div style="margin: 10px 0px;">
            <el-select v-model="selectType" placeholder="请选择" @change="handleSelectChange">
                <el-option
                        v-for="item in selectTypes"
                        :key="item.key"
                        :label="item.key"
                        :value="item.value">
                </el-option>
            </el-select>
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
        </el-table>

        <!--详情页-->
        <!--<el-dialog title="添加课程资料" :visible.sync="dialogFormVisible">
            <el-form :model="course">
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                    <el-input v-model="course.name" clearable autocomplete="off"/>
                </el-form-item>
                <el-form-item label="上课地址" :label-width="formLabelWidth">
                    <el-input v-model="course.classAddress" clearable autocomplete="off"/>
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
        </el-dialog>-->
    </div>
</template>

<script>
    export default {
        name: "TCourses",
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
                selectType: 'all',
                selectTypes: [{key: '全部课程', value: 'all'}, {key: '我的课程', value: 'mine'}]
            }
        },
        created() {

        },
        mounted() {
            this.initData();
        },
        methods: {
            /**
             * 根据条件selectType查询课程
             */
            initData(type) {
                if (type === 'mine') {
                    let user = JSON.parse(window.sessionStorage.getItem("user"));
                    this.pageInfo.userId = user.id;
                }
                this.selectType = type;
                this.getRequest('/course/', this.pageInfo).then(resp => {
                    if (resp) {
                        let data = resp.data;
                        this.tableData = data.list;
                        // 清空，还原数据
                        this.pageInfo = {
                            pageNumber: 1,
                            pageSize: 10
                        };
                        this.selectType = type ? type : 'all';
                    }
                });
            },
            /**
             * 通过选择类型选出对应的课程
             */
            handleSelectChange() {
                this.initData(this.selectType);
            },
            /**
             * 取消弹窗
             */
            handleCancel() {
                this.dialogFormVisible = false;
                this.clearData();
            }
        }
    }
</script>

<style>

</style>
