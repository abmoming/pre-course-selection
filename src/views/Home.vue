<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">选课系统</div>
                <el-button type="primary"  @click="logOut">注销</el-button>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router>
                        <!--通过角色给出不同的左侧菜单-->
                        <template v-if="user.roleName == 'ROLE_admin'">
                            <el-submenu index="1">
                                <template slot="title">管理员模块</template>
                                <el-menu-item index="/operator/courses">课程资料管理</el-menu-item>
                                <el-menu-item index="/operator/teachers">教师资料管理</el-menu-item>
                                <el-menu-item index="/operator/students">学生资料管理</el-menu-item>
                            </el-submenu>
                        </template>
                        <template v-if="user.roleName == 'ROLE_teacher'">
                            <el-submenu index="1">
                                <template slot="title">教师模块</template>
                                <el-menu-item index="/teacher/courses">课程查询</el-menu-item>
                                <el-menu-item index="/teacher/students">学生查询</el-menu-item>
                            </el-submenu>
                        </template>
                        <template v-if="user.roleName == 'ROLE_student'">
                            <el-submenu index="1">
                                <template slot="title">学生模块</template>
                                <el-menu-item index="/student/courses">课程查询</el-menu-item>
                                <el-menu-item index="/student/myCourses">我的课程</el-menu-item>
                            </el-submenu>
                        </template>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view class="homeRouterView"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    export default {
        name: 'Home',
        data() {
            return {
                // 获取临时保存的用户数据是字符串类型的，需要转换为JSON对象
                user: JSON.parse(window.sessionStorage.getItem("user")),
            }
        },
        methods: {
            logOut() {
                window.sessionStorage.removeItem("user");
                this.$router.replace('/');
                this.$message({
                    type: 'success',
                    message: '注销成功'
                });
            }
        }
    }

</script>

<style>
    .homeHeader {
        background-color: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: "仓耳天群行楷 W01";
        color: #ffffff;
    }
</style>
