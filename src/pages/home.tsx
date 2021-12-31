//一般以这个页面的写法为标准
import React from 'react'
import { Link } from 'react-router-dom';
import { inject, observer, } from 'mobx-react';
import './home.module.less'
import { Layout, Button, Avatar } from 'antd';
import { StoreInstance } from '../store'

function Index({store}:{store:StoreInstance}){
  let jsarr:string[] = ['react', 'react-router', 'mobx', 'less', 'axios', 'ant-design'];
  const { Header, Footer, Sider, Content } = Layout;
  return (
    <div className='home'>
      <Layout>
        <Sider>                                     
          {/*                                               传参给组件 */}
          {store.isLogin === false ? <Nologin /> : <Logined time={store.time} store={store} />}
        </Sider>
        <Layout>
          <Header>
            <div className='titlename'>
              我的第一个react Demo
            </div>
          </Header>
          <Content>
            <div className='content'>
              <div><Link to={'/bwl/' + store.userinfo.id}>备忘录</Link></div>
              <div><Link to='/jsq'>计算器</Link></div>
              <div><Link to='rl'>Hooks记录</Link></div>
              <div><Link to='dhcd'>我的百度</Link></div>
            </div>
          </Content>
          <Footer>
            <ul>
              <li>使用技术：</li>
              {jsarr.map((item, index) => {
                return <li key={index}>{item}</li>
              })}
            </ul>
            <ul>
              <li>创建人：蒲乐</li>
              <li>创建时间：2021.12.21</li>
              <li>vx:pl-8721</li>
            </ul>
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

  //未登录状态
function Nologin() {
  return (
    <div className='Nologin'>
      <Link to='/login'>去登陆</Link>
    </div>
  )
}
  //登录状态
function Logined({time,store}:{time:string,store:StoreInstance}){
  function logout():void {
    store.logout()
    store.setuser({})
  }
  return(
    <div className='logined'>
      <div className='tou'>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
        <div className='time'>当前时间：{time}</div>
      </div>
      <div className='info'>
        <ul>
          <li>用户名：{store.userinfo.uname || '未知'}</li>
          <li>姓名：{store.userinfo.name || '未知'}</li>
          <li>年龄：{store.userinfo.age || '未知'}</li>
          <li>性别:{store.userinfo.sex === '1' ? '男' : store.userinfo.sex === '2' ? '女' : '未知' || '未知'}</li>
          <li>爱好：{store.userinfo.hobby === undefined ? '未知' : store.userinfo.hobby.join('、')}</li>
        </ul>
      </div>
      <div className='logout'>
        <Button type='primary' onClick={logout}>退出登录</Button>
      </div>
    </div>
  )
}

export default inject('store')(observer(Index));