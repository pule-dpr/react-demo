import http from './server';  // 首先引入server文件
import {things,userList,Result,bddata} from '../mock'
interface HttpResult<T> {
    status: number;
    data: T;
}
function bdudata(keyword:string): Promise<bddata[]> {
    return http.post('/bddata',{
        keyword
    }).then((res:HttpResult<bddata[]>) => {
            return res.data
    })
}
function baidu(keyword:string): Promise<string[]> {
    return http.post('/baidu',{
        keyword
    }).then((res:HttpResult<string[]>) => {
            return res.data
    })
}
//请求登录
function login(params: object): Promise<userList | undefined> {
    return http.post('/login', {
        params
    }).then((res:HttpResult<userList[]>) => {
        if (res.data.length > 0) {
            return res.data[0]
        }else{
            return undefined
        }
    })
}
//请求注册
function register(params: object):Promise<Boolean> {
    return http.post('/register', {
        params
    }).then((res: HttpResult<Boolean[]>) => {
        return Promise.resolve(res.data)
    })
}
//请求备忘录数据
function bwldata(params: string):Promise<things[]> {
    return http.post('/bwl', {
        params
    }).then((res: HttpResult<things[]>) => {
        return Promise.resolve(res.data)
    })
}
//添加备忘录数据
function addbwl(id: string, params: object):Promise<things[]> {
    return http.post('/bwl/add', {
        id,
        params
    }).then((res: HttpResult<things[]>) => {
        return Promise.resolve(res.data)
    })
}
//删除备忘录数据
function bwlclear(id: string, tid: string):Promise<things[]> {
    return http.post('/bwl/clear', {
        id,
        tid
    }).then((res: HttpResult<things[]>) => {
        return Promise.resolve(res.data)
    })
}
function tableName(params:object):Promise<Result> {
    return http.post('/tablename', {
        params
    }).then((res: HttpResult<Result>) => {
        return Promise.resolve(res.data)
    })
}
export { login, register, bwldata, addbwl, bwlclear,tableName,baidu,bdudata }