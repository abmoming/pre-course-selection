import axios from 'axios';
import {Message} from 'element-ui';
import router from '../router';

/*
* 添加响应拦截器；将错误信息都封装到这里
*   success：http状态码为200会进入到该方法；就算进了success方法，它就一定是访问成功吗？不一定，业务代码出错，返回错误信息给前端，http的响应状态依旧是200
*   error：http状态码除200以外都会进入到这里
*   这两个都是方法
* */
axios.interceptors.response.use(
    success => {
        if (success.status && success.status == 200 && success.data.code == 500) {
            Message.error({message: success.data.message});
            return;
        }

        if (success.data.message) {
            Message.success({message: success.data.message});
        }

        // 得到的是RespBean对象转换成JSON的数据
        return success.data;
        // return success;
    }, error => {
        console.log(error)
        /*if (error.response.status == 504 || error.response.status == 404) {
            Message.error({message: '服务器被吃掉了( ╯□╰ )'});
        } else if (error.response.status == 403) {
            Message.error({message: '权限不足，请联系管理员!'});
        } else if (error.response.status == 401) {
            Message.error({message: '用户尚未登录，请登录!'});
            router.replace('/');
        } else {
            console.log(error)
            if (error.response.data.message) {
                Message.error({message: error.response.data.message});
            } else {
                Message.error({message: '未知错误!请联系管理员!'});
            }
        }*/
        return;
    }
);

/*
* 封装请求，表单的提交以key-value形式提交数据
*   base：请求路径的前缀(随时可以修改)
*   export：模块是独立的文件，该文件内部的所有的变量外部都无法获取。一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。
*       如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。
*       如果希望获取某个变量，必须通过export输出，或者用更好的方式：用大括号指定要输出的一组变量export {};
*   const：相当于java的final，可以用于声明常量；修饰的方法，方法将不能被修改；
*   url：注意引用变量要使用`${}`，而不是单引号，是1按钮的符号;
*   data：是作为请求主体被发送的数据；在没有设置 `transformRequest` 时，必须是以下类型之一：
*       string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
*   transformRequest：允许在向服务器发送前，修改请求数据；后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
*   encodeURIComponent：对字符 ;/?:@&=+$,# 或者中文由一个或多个十六进制的转义序列替换，避免乱码情况；
*   headers：是即将被发送的自定义请求头
* */
let base = '';

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

/*
* 使用json数据类型参数的post提交
* */
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        // responseType:'arraybuffer'
    });
};

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    });
};

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    });
};

export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    });
};
