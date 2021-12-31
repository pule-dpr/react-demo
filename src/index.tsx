import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/index';
import {Provider} from 'mobx-react';
import {store} from "./store/index";
import './mock'
import "antd/dist/antd.css";

const App = () => {
  return (
    <div>
      <AppRouter store={store}/>
    </div>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

