
import React from 'react'
import './index.less'
// 引入 wangEditor
import E from 'wangeditor' // npm 安装
import { useEffect } from 'react';
function G2char()  {
  useEffect(()=>{
    const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E
    const editor = new E("#div1");
    editor.config.menus = [
    'undo',
    'redo',
    'head',
    'fontSize',
    'bold',
    'italic',
    'underline',
    'strikeThrough',
    'fontName',
    'indent',
    'lineHeight',
    'foreColor',
    'backColor',
    'link',
    'list',
    'justify',
    // 'quote',
    // 'emoticon',
    'image',
    // 'video',
    'table',
    // 'code',
  ]
  editor.config.showFullScreen = false
    editor.create()
  },[])
  return (
    <div>
      <div id="div1"></div>
    </div>
  )
}
export default G2char;