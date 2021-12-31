import React from 'react'
import { inject, observer } from 'mobx-react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Index from '../pages/home'
import Login from '../pages/Login'
import Bwl from '../pages/bwl/bwl'
import Jsq from '../pages/jsq/jsq'
import Rl from '../pages/rl/rl'
import Dhcd from '../pages/dhcd/dhcd'
import { StoreInstance } from '../store'

function AppRouter({ store }: { store: StoreInstance }) {
    
    return (
        <BrowserRouter>
            {/* 
                react-router-dom v6 变更：
                    1.Switch变为Routes 
                    2.component={Index}变为element={<Index/>}
            */}
            <Routes>
                <Route path="/" element={<Index store={store} />} />
                <Route path="/login" element={<Login store={store} />} />
                {store.isLogin === true ?
                    <>
                        <Route path="/bwl/:id" element={<Bwl />} />
                        <Route path="/jsq" element={<Jsq />} />
                        <Route path="/rl" element={<Rl />} />
                        <Route path="/dhcd" element={<Dhcd />} />
                    </>

                    : <Route path="*" element={<Navigate to="/login" />} />}


            </Routes>
        </BrowserRouter>
    )
}
export default inject('store')(observer(AppRouter));