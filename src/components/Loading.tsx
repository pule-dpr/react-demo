import * as React from "react";
import { Spin } from 'antd';
import './Loading.module.less'

function Loading(){
    return <Spin tip="Loading..."></Spin>
}
export default Loading