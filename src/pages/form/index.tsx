
import React, { useEffect, useState } from 'react'
import Rowform from './Rowform'
import './index.less'
import {RowinfoType,OptionType} from './filtrateType.d'
import { Form, Input, Button, Select,DatePicker } from 'antd';
function A1({keys,onChange}:OptionType){
  const [selectdata,setSelectdata]=useState([])
  const children = [];
  const { Option } = Select;
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i} value={i}>{i.toString(36) + i}</Option>);
  }
  
  function handleChange(value:any) {
    console.log(value,typeof(value),22222222);
    setSelectdata(value)
    
  }
  useEffect(()=>{
    onChange(keys,{pname:selectdata})
  },[selectdata,selectdata.length])
  return (
    <>
      <div style={{width:'200px'}}>
        <Select mode="tags" style={{ width: '100%' }} placeholder="请输入姓名" onChange={handleChange}>{children}</Select>
      </div>
      <p style={{color:'blue',margin:'0 25px' }}>只看自己的</p>
    </>
  )
  
}

function A2({keys,onChange}:OptionType){
  const { RangePicker } = DatePicker;
  useEffect(()=>{
    onChange(keys,{pname:'selectdata'})//todo
  },[])
 return (
   <>
      <div style={{display:'flex' ,alignItems:'center'}}>
        <Form layout={'inline'}>
          <Form.Item name="note" label="搜索" style={{margin:'0 15px 0 0'}}>
            <Input placeholder='输入内容'/>
          </Form.Item>
          <Form.Item name="note" label="发布时间" style={{margin:'0'}}>
            <RangePicker placeholder={['开始时间','结束时间']}/>
          </Form.Item>
        </Form>
      </div>
      <div style={{display:'flex' ,marginLeft:'400px'}}>
        <p style={{margin:'0',lineHeight:'32px',marginRight:'25px'}}>共计：10条</p>
          <Button htmlType="button">
            重置
          </Button>
          <Button type="primary" style={{marginLeft:'15px'}}>
            查询
          </Button>
      </div>
   </>
 )
}
function Filtratebox(){
 const [state,setState]=useState<RowinfoType[]>([
  {
   key:'sslm',
   label: '所属类目',
   info:[
     {value:1,aname:'政策法规'},
     {value:2,aname:'社区活动'},
     {value:3,aname:'医保社保'},
     {value:4,aname:'家政服务'},
   ],
   selectKeys:[]
 },
 {
   key:'fbsq',
   label: '发布社区',
   info:[
     {value:16,aname:'政策法规'},
     {value:15,aname:'社区活动'},
     {value:14,aname:'医保社保'},
     {value:13,aname:'家政服务'},
     {value:5,aname:'政策法规'},
     {value:6,aname:'社区活动'},
     {value:7,aname:'医保社保'},
     {value:8,aname:'家政服务'},
     {value:9,aname:'政策法规'},
     {value:10,aname:'社区活动'},
     {value:11,aname:'医保社保'},
     {value:12,aname:'家政服务'},
   ],
   selectKeys:[]
 },
 {
   key:'fbz',
   label: '发布者',
   info:[],
   filtrateinfo:{},
   components:<A1 keys={'fbz'} onChange={onchange}></A1>
 },
 {
   key:'other',
   label: '其他选项',
   info:[],
   filtrateinfo:{},
   components: <A2 keys={'other'} onChange={onchange}></A2>
 },
])
 useEffect(()=>{
  console.log(state,151515151515)
  console.log('我查询了一次')
 },[state])
 function onchange(key:string,option:any){
  let data=state
  const dataAll=data.map((item)=>{
    if(item.key===key){
      console.log(item.selectKeys,2222222)
      item.selectKeys?item.selectKeys=option:item.filtrateinfo=option
    }
    return item
  })
  setState(dataAll)
}
  return (
    <Rowform datasource={state} onChange={onchange}></Rowform>
  )
}
export default Filtratebox;