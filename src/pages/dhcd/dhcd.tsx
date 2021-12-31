import './dhcd.module.less'
import React, { useState } from 'react'
import {useRef} from 'react'
import { Input } from 'antd';
import { useRequest,useFocusWithin,useEventListener,useVirtualList,useMount,useClickAway, useBoolean } from 'ahooks';
import {baidu,bdudata} from '../../api/api'
import {bddata} from '../../mock/index'
function Dhcd() {
  let inputevent:any
  const inputfoucs = useRef(null);
  const modalfoucs = useRef(null);
  const [word,setWord]=useState<string>('')
  const [datalist,setDatalist]=useState<string[]>([])
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  useClickAway(() => {
    setFalse()
  }, [inputfoucs, modalfoucs]);
  const isshow = useFocusWithin(inputfoucs, {
    onFocus: () => {
      setTrue()
    }
  });
  const [isFocusWithin,{setTrue,setFalse}]=useBoolean()
  const { data, run } = useRequest(baidu, {
    debounceWait: 1000,
    manual: true,
  });
  useMount(() => {
    inputevent.focus()
    setTrue()
  });
  useEventListener('keydown', (ev) => {
    if(ev.code==='Enter'){
      inputevent.blur()
      setFalse()
      runbd(word)
    };
  });
  const { run:runbd } = useRequest(bdudata, {
    manual: true,
    onSuccess:(res:bddata[])=>{
      if(res.length>0){
        setDatalist(res[0].list)
      }else{
        setDatalist([])
      }
    }
  });
  const [list] = useVirtualList(datalist, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 60,
    overscan: 10,
  });
  function onchange(str:string){
    setWord(str)
    run(str)
  }
  function go(e:any){
    setWord(e.target.innerText)
    setFalse()
  }
    return(
     <div className='baidu'>
       <div className='header'>
         <img src="//www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" alt="" />
         <div className='search'>
           <div className='top'>
              <div className='input' ref={inputfoucs}>
                  <Input ref={(input) => inputevent = input} placeholder="请输入关键字..." value={word} onChange={e => onchange(e.target.value)} />
              </div>
              <div className='btn' onClick={()=>runbd(word)}>百度一下</div>
          </div>
          <div className='modal' ref={modalfoucs} style={{display:isFocusWithin && data && data.length>0? 'block':'none'}}>
            <ul >
              {data?.map((item,index)=>{
                return <li onClick={go} key={index}>{item}</li>
              })}
            </ul>
          </div>
         </div>
       </div>
       {
         isFocusWithin||datalist.length===0?<></>:
         <div className='result'>
          <div ref={containerRef} style={{ height: '400px', overflow: 'auto', border: '1px solid' }}>
            <div ref={wrapperRef}>
              {list.map((ele) => (
                <div
                  style={{
                    height: 52,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #e8e8e8',
                    marginBottom: 8,
                  }}
                  key={ele.index}
                >
                  查到啦！！！: {ele.data}
                </div>
              ))}
            </div>
          </div>
       </div>
       }
     </div>
    )
}
export default Dhcd;