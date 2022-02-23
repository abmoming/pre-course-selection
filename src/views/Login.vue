<template>
    <div>
        <el-form
                ref="loginForm"
                :model="ruleForm"
                :rules="rules"
                class="loginForm"
                v-loading="loading"
                element-loading-text="正在登录..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input size="normal" type="text" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input size="normal" type="password" v-model="ruleForm.password"
                          @keydown.enter.native="loginSubmit"></el-input>
            </el-form-item>
            <el-button size="normal" type="primary" @click="loginSubmit" style="width: 100%">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    /*
    * this.$refs.loginForm：找到名为loginForm的表单，ref定义了表单名；你也可以定义id，使用js的getElementid获取表单；
    * then：
    *   resp：是服务端返回的参数(响应结构)；这里在response拦截器里面做过处理了success.data，这里实则就是json数据;
    *       这里只需要处理成功就行了，判断是否为空；失败情况在response拦截器里面做过处理了，失败的话resp是没有数据的；
    *       return为空：一会在请求调用的时候，什么数据都拿不到，那就说明这个请求是失败的；如果有数据，就说明请求是成功的。
    * window.sessionStorage.setItem：用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。
    * this.$route：表示当前正在用于跳转的路由器对象，可以调用其name、params、path、query、等属性；
    *   name 和 params 一组：使用this.$route.params接收参数，刷新会无效（类似于post，url中不会显示参数）
    *   path 和 query 一组：使用this.$route.params接收参数，query会保存传递过来的值，刷新不变（类似于get，url中会显示参数）
    * this.$router：实际上就是全局路由对象，获取到main.js里面Vue定义的router对象；任何页面都可以调用以下方法等；
    *   replace：进行页面跳转，跳转后是会覆盖掉当前的页面，也就是浏览器左上角的←回退按钮是禁止点击的，不能回退到上一个界面
    *   push：进行页面跳转，往栈里面去压，可以回退到上一个界面
    * then：发送请求成功的回调函数
    *   resp：回调参数
    * */
    export default {
        name: "Login",
        data() {
            return {
                ruleForm: {
                    username: '111',
                    password: '123'
                },
                checked: true,
                rules: {
                    username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                    password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
                },
                loading: false
            }
        },
        methods: {
            loginSubmit() {
                this.loading = true;
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.postKeyValueRequest('/user/login', this.ruleForm).then(resp => {
                            this.loading = false;
                            if (resp) {
                                // 登录成功，将用户信息保存到本地，方便别的界面使用
                                window.sessionStorage.setItem('user', JSON.stringify(resp.data));
                                // 获取到重定向的地址，作页面跳转
                                // let path = this.$route.query.redirect
                                this.$router.replace('/home');

                                console.log(resp);
                            }

                            /*if (resp) {
                                this.$store.commit('initCurrentHr', resp.object);
                                window.sessionStorage.setItem('user', JSON.stringify(resp.object));
                                let path = this.$route.query.redirect;
                                this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
                            }*/
                        });
                    } else {
                        this.$message.error('请输入所有字段');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .loginForm {
        width: 350px;
        margin: 180px auto;
        border-radius: 15px;
        background-clip: padding-box;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }

    .loginRemember {
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
</style>
