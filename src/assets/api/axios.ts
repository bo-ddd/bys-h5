import axios from "axios";
const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


instance.interceptors.request.use(function (config: any) {
    // 在发送请求之前做些什么,一般配置一些请求头的公共信息；
    config.headers.token = sessionStorage.getItem('token');
    return config;
})

// 添加响应拦截器  概念：每次调用接口之后都会走到此方法中，服务端返回数据后优先走到此方法，之后才会走到 // // // //axiox.get()/axios.post() 的then方法中；
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么，一般可以把登录失效后的逻辑添加到此处，所有需要登录接口的判断都可以写到此处，这样就不用每个接口都判断用户是否登录，如果没有登录就跳转到登录页面去的逻辑；抽离业务逻辑的好地方；
    if (response.data.code == 401) {
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    console.log('get error:', error)
    return {
        code: -1,
        msg: '网络异常'
    }
});


export default instance;