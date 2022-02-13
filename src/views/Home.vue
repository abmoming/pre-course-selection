<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">选课系统</div>
                <!--<div>
                    &lt;!&ndash;<el-button type="text" icon="el-icon-bell" style="margin-right: 8px; color: #000000;" size="normal"
                               @click="goChat"></el-button>&ndash;&gt;
                    <el-dropdown class="userInfo" @command="commandHandler">
                    <span class="el-dropdown-link">
                        {{user.name}}<i><img :src="user.userface"/></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>
                            <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>-->
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router>
                        <!--通过角色给出不同的左侧菜单-->
                        <template v-if="user.roleName == 'ROLE_admin'">
                            <!--<el-submenu index="1">
                                <template slot="title">
                                    <span>课程资料管理</span>
                                </template>
                                <el-menu-item index="1-1">课程录入</el-menu-item>
                            </el-submenu>-->
                            <el-menu-item index="/operate/Courses">课程资料管理</el-menu-item>
                            <el-menu-item index="2">教师资料管理</el-menu-item>
                            <el-menu-item index="3">学生资料管理</el-menu-item>
                        </template>
                        <template v-if="user.roleName == 'ROLE_teacher'">
                            <el-menu-item index="2">课程资料管理</el-menu-item>
                            <el-menu-item index="3">学生资料管理</el-menu-item>
                        </template>
                        <template v-if="user.roleName == 'ROLE_student'">
                            <el-menu-item index="3">学生资料管理</el-menu-item>
                        </template>
                    </el-menu>
                </el-aside>
                <el-main>
                    <h3>内容</h3>
                    <!--<el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div v-if="this.$router.currentRoute.path=='/home'" class="homeWelcome">欢迎来到微人事!</div>
                    <router-view class="homeRouterView"/>-->
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
