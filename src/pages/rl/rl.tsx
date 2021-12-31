import './rl.module.less'
import React from 'react'
import { useAntdTable } from 'ahooks';
import {tableName} from '../../api/api'
import { Form, Input, Table, Select } from 'antd';
import {Result} from '../../mock/index'
import { Link} from 'react-router-dom'
const { Option } = Select;
function Rl(){
    const [form] = Form.useForm();
      const getTableData = ({ current, pageSize }:{ current:number, pageSize:number}, formData: Object): Promise<Result> => {
        let params:any={
            page:current,
            size:pageSize,  
        }
        Object.entries(formData).forEach(([key, value]) => {
            params[key]=value
        });
        
        return tableName(params).then((res)=>res).then((res)=>({
                total: res.total,
                list: res.list,
              }))
      };
      const { tableProps, search} = useAntdTable(getTableData, {
        form,
        defaultParams: [
          { current: 1, pageSize: 8 },
          { name: 'useRequest', what: 'useRequest' },
        ],
        defaultType: 'advance',
      });
    
      const { submit } = search;
    

    const columns = [
        {
        title: '使用场景',
        dataIndex: 'where',
        },
        {
        title: 'Hooks名称',
        dataIndex: 'what',
        },
        {
        title: '使用的方法',
        dataIndex: 'whichone',
        },
        {
        title: '备注',
        dataIndex: 'info',
        },
    ];
    // console.log(data,7777)
    return (
    <div className='hooks'>
        <div style={{ marginBottom: 16,marginTop:25 }}>
        <div className='top'><Link to='/'>返回首页</Link></div>
        <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item name="gender" initialValue="">
            <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
                <Option value="">all</Option>
                <Option value="useRequest">useRequest</Option>
                <Option value="useSetState">useSetState</Option>
                <Option value="useMount">useMount</Option>
                <Option value="useBoolean">useBoolean</Option>
                <Option value="useSafeState">useSafeState</Option>
                <Option value="useVirtualList">useVirtualList</Option>
                <Option value="useRef">useRef</Option>
                <Option value="useUpdateEffect">useUpdateEffect</Option>
                <Option value="useKeyPress">useKeyPress</Option>
                <Option value="useFocusWithin">useFocusWithin</Option>
                <Option value="useToggle">useToggle</Option>
                <Option value="useFocusWithin">useFocusWithin</Option>
                <Option value="useFocusWithin">useFocusWithin</Option>
            </Select>
            </Form.Item>
            <Form.Item name="name">
            <Input.Search placeholder="enter name" style={{ width: 240 }} onSearch={submit} />
            </Form.Item>
        </Form>
        </div>
        <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
    )
}
export default Rl;