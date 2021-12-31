import './jsq.module.less'
import React from 'react'
//react中的事件类型
// ClipboardEvent<T = Element> 剪切板事件对象

// DragEvent<T =Element> 拖拽事件对象

// ChangeEvent<T = Element> Change 事件对象

// KeyboardEvent<T = Element> 键盘事件对象

// MouseEvent<T = Element> 鼠标事件对象

// TouchEvent<T = Element> 触摸事件对象

// WheelEvent<T = Element> 滚轮时间对象

// AnimationEvent<T = Element> 动画事件对象

// TransitionEvent<T = Element> 过渡事件对象

import type { MouseEvent } from 'react';
import { useState} from 'react';
import { Link} from 'react-router-dom'

function Jsq(){
    const [number,setNumber]=useState('')
    function calc() {
        var result=eval(number);
        setNumber(result)
    }
    function js(e:MouseEvent) {
        //类型断言  否则MouseEvent类型无法使用 innerText 或 innerHTML 等函数
        let target = e.target as HTMLElement
        if(target!==e.currentTarget){
            if(target.innerText==='='){
                number?calc():console.log(number)
            }else if(target.innerText==='清空'){
                setNumber('')
            }else{                                      
                var text=number+target.innerText;
                setNumber(text)
            } 
        }
    }
    return (
        <div className='jsqsty'>
            <div className='look'>{number}</div>
            <div className='jsq' onClick={e=>js(e)}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>+</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>-</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>*</div>
                <div>/</div>
                <div>%</div>
                <div>清空</div>
                <div>=</div>
            </div>
            <div className='top'><Link to='/'>返回首页</Link></div>
        </div>
    )
}
export default Jsq;