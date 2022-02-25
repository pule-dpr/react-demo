import React, { useEffect, useState } from 'react';
import { useToggle } from 'ahooks';
import {Groupinfo} from './filtrateType.d'
import './index.less';

function Formdemo({keys,datasource, labelSize = 100,selectKeys, onChange,components }: Groupinfo) {
    const [stateAll, { toggle, setLeft, setRight }] = useToggle();
    const [statebadge, { toggle:togglebadge }] = useToggle();
    const [state, setState] = useState({ visible: false,selectKeys: selectKeys || []});
    useEffect(()=>{
        datasource.info.length>8?setState((old) => ({ ...old, visible: true })):setState((old) => ({ ...old, visible: false }))
    },[])
    useEffect(()=>{
        onChange(keys,state.selectKeys)
    },[state.selectKeys,state.selectKeys.length])
    function togglestatus(e:any){
        const target=e.target
        if(target.innerHTML==='全部'){
            toggle()
            setState({...state, selectKeys: []})
        }else{
            setLeft()
            const value=Number(target.dataset.value) 
            const list=state.selectKeys
            list.includes(value)?list.splice(list.indexOf(value),1):list.push(value)
            setState({...state, selectKeys: list})
        }
    }
    return(
        <div className="group-layout" >
            <div className='label-layout' style={{width:labelSize}}>{datasource.label}:</div>
            {datasource.info.length>0?
                <div className='info-layout' onClick={(e)=>{togglestatus(e)}}>
                <div className={stateAll?'active': ''}>全部</div>
                {datasource.info.map((o,index)=>{
                    if(state.visible){
                        if(statebadge){
                            return <div data-value={o.value} className={state.selectKeys.includes(o.value)?'active': ''}>{o.aname}</div>
                        }else{
                            if(index<8){
                                return <div data-value={o.value} className={state.selectKeys.includes(o.value)?'active': ''}>{o.aname}</div>
                            }  
                        }
                    }else{
                        return <div data-value={o.value} className={state.selectKeys.includes(o.value)?'active': ''}>{o.aname}</div>
                    }  
                })}
                {state.visible && (
                    statebadge ? <div className='badge' onClick={togglebadge}>收起</div>:<div className='badge' onClick={togglebadge}>展开</div>
                )}
                </div>
                :<div className='children-layout'>{components}</div>
            }
        </div>
    )
}

export default Formdemo;
