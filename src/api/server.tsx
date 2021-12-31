import axios from 'axios'
//根据项目自己更改
axios.defaults.baseURL = '/api'  
//一些配置，发起请求和响应可以打印出来查看
axios.interceptors.request.use((config:any)=>{
    //这里是用户登录的时候，将token写入了sessionStorage中了，之后进行其他的接口操作时，进行身份验证。
    config.headers.token = localStorage.getItem("cookie");
    return config;
})
//在response中
axios.interceptors.response.use(config =>{
    return config;
})
// type PromiseInterface=typeof Promise
interface http{
    post:any,
    get:any,
    getParams:any
}
const http: http= {
    post:'',
    get:'',
    getParams:''
}

http.post = function (api:string, data:object):Promise<object>{  // post请求
    return axios.post(api,data).then(response=>{
            return Promise.resolve(response)
        })
}
http.get = function (api:string, data:object):Promise<object>{ // get请求
    return axios.get(api,data).then(response=>{
            return Promise.resolve(response)
    })
}
http.getParams = function (api:string, param:object):Promise<object>{ //get请求 需要传参
    return  axios.get(api, {params: param}).then(response => {
        return Promise.resolve(response.data)
    }, err => {
        Promise.reject(err)
    }).catch((error) => {
        Promise.reject(error)
    })
       
}

export default http
