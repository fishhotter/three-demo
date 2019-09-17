import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { store, StoreContext } from "./store/store";
import registerServiceWorker from './registerServiceWorker';
// import "antd/dist/antd.css";
import "./assets/css/reset.css";
import "./assets/css/animate.css";
import { LocaleProvider } from 'antd';

import zhCN from 'antd/lib/locale-provider/zh_CN';


ReactDOM.render(
  <StoreContext.Provider value={store} >
    <LocaleProvider locale={zhCN}><App /></LocaleProvider>
  </StoreContext.Provider>, 
  document.getElementById('root') as HTMLElement
);
registerServiceWorker(); 