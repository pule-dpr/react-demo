import './index.module.less'
import React from 'react'
import { inject, observer } from 'mobx-react';
import { useState } from 'react';
//react-router-dom  @v6 中 useNavigate替换useHistory
import { Link, useNavigate } from 'react-router-dom';
import {Button,Input,message} from 'antd'
import {login,register} from '../../api/api'
import { StoreInstance } from '../../store'
import { useRequest,useSetState,useBoolean } from 'ahooks';
function Login({ store }:{ store:StoreInstance }){
    let history = useNavigate();
    const [user, setUser] = useSetState({
        uname:'',
        pwd:''
    });
    const { run:log } = useRequest(login,{
        manual: true,
        onSuccess: (res) => {
            if(res!=undefined){
                store.login()
                store.setuser(res)
                history('/');
                return (
                    message.success('登录成功')
                    
                )
            }else{
                return (
                    message.success('用户名或密码错误')
                )
            }
        },
        onError: (error) => {
            message.error(error.message);
        },
      });
    //注册
    const [ready, { setTrue, setFalse }] = useBoolean(false);
    function check(){
        setFalse()
        let reg=new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$","ig"); 
        let zq=reg.test(user.pwd);
        if(zq){
            setTrue()
        }else{
            return (
                message.success('请输入符合规范的用户名密码')
            )
        }
    }
    const { data,params } = useRequest(register,{
        ready,
        defaultParams:[{id:Math.floor(Math.random()*100).toString() ,...user}],   
        onSuccess: () => {
            return message.success('注册成功')
        }    
      });
  return (
        <div className='login'>
            <div className='header'>登录</div>
            <div className='content'>
                <label>
                    <p>用户名:</p>
                    <Input placeholder="请输入用户名" value={user.uname} onChange={e => setUser({
                        uname:e.target.value,
                        pwd:user.pwd
                    })} />
                    </label>
                <label>
                    <p>密码:</p>
                    <Input.Password placeholder="请输入密码" value={user.pwd} onChange={e => setUser({
                        uname:user.uname,
                        pwd:e.target.value
                    })} />
                </label>
            </div>
            <div className='btn'>
                <Button type="primary" onClick={()=>log(user)}>登录</Button>
                <Button type="primary" onClick={()=>check()}>注册</Button>
            </div>
            <div className='look'>
                <Link to='/'>暂不登录</Link>
            </div>
        </div>
  );
};
//等同于类组件中@inject()和@observer的写法
export default inject("store")(observer(Login));