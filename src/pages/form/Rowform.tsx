
import React, { useState } from 'react'
import Formdemo from './form'
import './index.less'
import {RowinfoType,Rowformtype} from './filtrateType.d'
function Rowform({datasource,onChange}:Rowformtype){
  return (
    <div style={{width:'1400px',backgroundColor:'rgb(209, 236, 255)',margin:'0 auto'}}>
      {datasource.map((item:RowinfoType)=>{
        return <Formdemo
          datasource={item}
          keys={item.key}
          selectKeys={item.selectKeys}
          onChange={onChange}
          components={item.components||''}
      ></Formdemo>
      })}
    </div>
  )
}
export default Rowform;