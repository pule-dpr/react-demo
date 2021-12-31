import './bwl.module.less'
import React from 'react'
import { Layout, Button, Card, Empty, Modal, Input, message} from 'antd';
import Loading from '../../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { bwldata, addbwl, bwlclear } from '../../api/api'
import { useRequest,useMount,useSetState,useBoolean,useSafeState  } from 'ahooks';
import {things} from '../../mock'
interface cardInterface{
    title:string,
    content:string
}
function Bwl() {
    const { Header, Content } = Layout;
    const [newdata, setNewdata] = useSafeState<things[]>([])
    const [cardinfo, setcardinfo] = useSetState<cardInterface>({
        title:'',
        content:''
    })
    const [isModalVisible, {setTrue, setFalse }] = useBoolean (false)
    let uid: string = useParams().id as string
    const { run,loading } = useRequest(bwldata,{
        manual: true,
        onSuccess: (res) => {
            setNewdata(res as things[])
        },
        onError: (error) => {
          message.error(error.message);
        },
      });
      const { run:runadd } = useRequest(addbwl,{
        manual: true,
        onSuccess: (res) => {
            setNewdata(res)
            message.success('添加成功')
        },
        onError: (error) => {
          message.error(error.message);
        },
      });
      useMount(() => {
        run(uid)
        setNewdata([
            {
                tid: 'string',
                title: 'string',
                content: 'string'
            }
        ])
    });
    function add() {
        setcardinfo({
            title:'',
            content:''
        })
        setTrue()
    }
    function handleOk() {
        let tid
        if(newdata.length > 0){
            let num=Number(newdata[newdata.length - 1].tid)+1
            tid=num.toString()
        }else{
            tid="0"
        }
        
        var params = {
            tid: tid,
            title: cardinfo.title,
            content: cardinfo.content
        }
        runadd(uid,params)
        setFalse()
    }
    function handleCancel() {
        setFalse()
    }
        return (
            <div className='bwl'>
                <Layout>
                    <Header>
                        <div className='top'><Link to='/'>返回首页</Link></div>
                        <div className='title'>备忘录</div>
                        <Button className='icon' onClick={add}>+添加</Button>
                        <Modal title="添加任务" cancelText='取消' okText='确定' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <div>
                                <p>标题：</p>
                                <Input placeholder="请输入标题" value={cardinfo.title} onChange={e => setcardinfo({
                                    title:e.target.value,
                                    content:cardinfo.content
                                })} />
                            </div>
                            <div>
                                <p>详情：</p>
                                <Input placeholder="请输入任务详情" value={cardinfo.content} onChange={e => setcardinfo({
                                    title:cardinfo.title,
                                    content:e.target.value
                                })} />
                            </div>
                        </Modal>
                    </Header>      
                    <Content>
                    {loading?<Loading />:
                    newdata.length < 1 ? <Empty /> : <Cards newdata={newdata} uid={uid} stedata={(data:things[]) => setNewdata(data)} />
                    } 
                    </Content>      
                </Layout>
            </div>
        )
    }
//卡片组件
function Cards({ newdata, uid, stedata }: { newdata: things[], uid: string, stedata: (data: things[]) => void }): any {
    const { run:runclear } = useRequest(bwlclear,{
        manual: true,
        onSuccess: (res) => {
            stedata(res)
            message.success('删除成功')
        },
        onError: (error) => {
          message.error(error.message);
        },
      });
    function clear(tid: string) {
        runclear(uid,tid)
        
    }
    return (
        newdata.map((item:things) => {
            return (
                <Card key={item.tid} title={item.title} extra={<a href="#" onClick={() => { clear(item.tid) }}>完成</a>} style={{ width: 300 }}>
                    <p>{item.content}</p>
                </Card>
            )
        }
        )
    )
}
export default Bwl;