import * as React from "react";

import TIcon from 'assets/fonts/font';
import { withRouter, Memo } from "utils/declare";

import "./Header.less";

function HeaderComponent(props: any): JSX.Element {

  const goHome = () => {
    window.open("http://30.99.142.117:3005/platform", "_self")
  }
  const goBack = () => {
    window.open("http://30.99.142.117:3005/login", "_self")
  }
        
  return (
    <header className="header-component-container">
      <div className="left-box">
        <div className="log-box">
          <h1 className="title">XXXXXXXX系统</h1>
        </div>
        <div className="menu-box">暂无</div>
      </div>
      <div className="right-box">
        <div className="user-center">暂无</div>
        <div className="exit-box">
          <TIcon onClick={goHome} className="home-icon" type="icon-home" />
          <TIcon onClick={goBack} type="icon-exit" />
        </div>
      </div>
    </header>
  );
}

export default Memo(withRouter(HeaderComponent)); 