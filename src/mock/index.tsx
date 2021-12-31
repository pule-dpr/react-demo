import { List } from 'antd/lib/form/Form';
import Mock from 'mockjs';
Mock . setup ({
    timeout: '200 - 400'
})
function usedata(params:reqInterface){
    let data=JSON.parse(params.body) 
    return data.params
}
interface reqInterface{
    url:string,
    type:string,
    body:string
}
export interface userList{
    id:string,
    uname:string,
    sex:string,
    name:string,
    age:string,
    pwd:string,  
    hobby:string[]
}
//默认用户数据
export interface tab{
    where:string,
    what:string,
    whichone:string,
    info:string
}
export interface Result {
    total: number;
    list: tab[];
  }
export interface bddata{
    title:string,
    list:string[]
}
let baidu:string[]=['项目','项目人','项目大','项目看看','项目顶顶顶','项目啦啦啦啦啦','项目大得到的','项目看看嗡嗡嗡','项目都是对的','项目顶顶顶撒大大','项目大多数','项目都是对的啊','项目大大看看','看看','顶顶顶暗色点']
let bddata:bddata[]=baidu.map((item)=>{
    let listdata=[]
    for(let i=0;i<200;i++){
        listdata.push(item+'00'+i)
    }
    return {
        title:item,
        list:listdata
    }
})
let tabledata:tab[]=[
    {
        where:'百度页面',
        what:' useVirtualList',
        whichone:'虚拟列表hooks',
        info:'用于展示大量数据，提升性能'
    },
    {
        where:'百度页面',
        what:' useRef',
        whichone:'绑定dom元素',
        info:'设置触发事件的焦点范围'
    },
    {
        where:'百度页面',
        what:' useUpdateEffect',
        whichone:'监听 keydown 事件',
        info:'简单监听一下回车键'
    },
    {
        where:'百度页面',
        what:' useKeyPress',
        whichone:'监听各种组合，长按，等按键',
        info:'可以进行自己的逻辑梳理'
    },
    {
        where:'百度页面',
        what:'useFocusWithin',
        whichone:'监听当前焦点是否在某个区域之内',
        info:'监听当前焦点是否搜索框内，以方便显示modol框'
    },
    {
        where:'百度页面',
        what:'useToggle',
        whichone:'切换状态：toggle, setLeft, setRightdebounceWait',
        info:'是否显示联想词汇modal框'
    },
    {
        where:'百度页面',
        what:'useRequest',
        whichone:'防抖:debounceWait',
        info:'用户输入一秒后无操作再请求联想词汇'
    },
    {
        where:'登录页面',
        what:'useRequest',
        whichone:'手动请求:run',
        info:'点击登录按钮，run请求登录接口'
    },
    {
        where:'备忘录页面',
        what:'useRequest',
        whichone:'自动请求:ready',
        info:'点击注册按钮，检查通过ready：true，自动带着默认参数请求注册接口' 
    },
    {
        where:'备忘录页面',
        what:'useRequest',
        whichone:'手动请求：loading',
        info:'loading 为true时显示loading动画'    
    },
    {
        where:'登录页面',
        what:'useSetState',
        whichone:'修改对象',
        info:'基础用法'
    },
    {
        where:'备忘录页面',
        what:'useSetState',
        whichone:'修改对象',
        info:'基础用法'
    },  
    {
        where:'备忘录页面',
        what:'useMount',
        whichone:'组件初始化时执行',
        info:'组件初始化时请求备忘录数据'
    },
    {
        where:'备忘录页面',
        what:'useBoolean',
        whichone:'修改布尔值：setTrue, setFalse',
        info:'基础用法'
    },
    {
        where:'备忘录页面',
        what:'useSafeState',
        whichone:'修改数组值',
        info:'用法与 React.useState 完全一样，但是在组件卸载后异步回调内的 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏'
    },
    {
        where:'Hooks记录页面',
        what:'useAntdTable',
        whichone:'ant-table与表单的联动：tableProps, search',
        info:'ant-table与表单的联动，查看hooks使用记录'
    },
    
]
let userList:userList[]=[
    {
        id:'0',
        uname:'pule',
        sex:'1',
        name:'蒲乐',
        age:'23',
        pwd:'25802580plpl',  
        hobby:['篮球','唱歌']
    }
]
export interface things{
    tid:string,
    title:string,
    content:string
}
interface bwldata{
    id:string,
    things:things[]
}
let bwldata:bwldata[]=[
    {
        id:'0',
        things:[
            {
                tid:'0',
                title:'学习',
                content:'学习react'
            }
        ]
    }
]
export default
Mock.mock('/api/bddata','post',(req:reqInterface):bddata[]=>{
    let data=JSON.parse(req.body)
    let baidudata:bddata[]=[]
    bddata.forEach((item)=>{
        if(data.keyword===item.title){
            baidudata.push(item)
        }
    })
    return baidudata
})
Mock.mock('/api/baidu','post',(req:reqInterface):string[]=>{
    let data=JSON.parse(req.body)
    let baidudata:string[]=[]
    baidu.forEach((item)=>{
        if(data.keyword!==''&&item.includes(data.keyword)){
            baidudata.push(item)
        }
    })
    return baidudata
})
Mock.mock('/api/tablename','post',(req:reqInterface):Result=>{
    let data=usedata(req)
    let list:tab[]=[]
    if(data.gender===''){
        return {
            total: tabledata.length,
            list: tabledata
        }
    }
    tabledata.forEach((item)=>{
        if(item.what===data.gender||item.what===data.name){
            list.push(item)
        }
    })
    let result:Result={
        total: list.length,
        list: list
    }
    return result
 })
//登录接口
 Mock.mock('/api/login','post',(req:reqInterface):userList[]=>{
    let data=usedata(req) 
    let loginUser:userList[]=[]
    userList.forEach((item:userList)=>{
        if(data.uname===item.uname&&data.pwd===item.pwd){
            loginUser.push(item)
        }
    })
    return loginUser
})
//注册接口
 Mock.mock('/api/register','post',(req:reqInterface):Boolean=>{
    let data=usedata(req) 
    userList.push(data)
    return true
})
//请求备忘录数据接口
Mock.mock('/api/bwl','post',(req:reqInterface):things[]=>{
    let data=usedata(req) 
    let things:things[]=[]
    bwldata.forEach((item:bwldata)=>{
        if(item.id===data){
            things=item.things
        }
    })
    return things
})
//添加备忘录数据接口
Mock.mock('/api/bwl/add','post',(req:reqInterface):things[]=>{
    let data=JSON.parse(req.body) 
    let things:things[]=[]
    let exit=bwldata.some((item)=>{
        return item.id===data.id
    })
    if(exit){
        bwldata.forEach((item:bwldata)=>{
            if(item.id===data.id){
                item.things.push(data.params)
                things=item.things
            }
        })
    }else{
        bwldata.push({
            id:data.id,
            things:[data.params]
        }) 
        things=[data.params]
    }
   return things
})
//删除备忘录数据接口
Mock.mock('/api/bwl/clear','post',(req:reqInterface):things[]=>{
    let data=JSON.parse(req.body) 
    let things:things[]=[]
    bwldata.forEach((item:bwldata)=>{
        if(item.id===data.id){
            item.things.forEach((item1:things,index:number)=>{
                if(item1.tid===data.tid){
                    item.things.splice(index,1)
                    things=item.things
                }
            })
        }
    })
   return things
})