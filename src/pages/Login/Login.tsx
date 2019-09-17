import * as React from "react";
import { Memo, useState, useEffect, Fragment } from "utils/declare";

import LoginForm from "./LoginForm/LoginForm"

import logoIcon from "assets/image/login/logo.png";
import qrcodeIcon from "assets/image/login/qrcode.png";
import bakPic0 from "assets/image/login/login-bak.png";
import bakPic1 from "assets/image/login/login-bak2.png";

import "./Login.less";

function Login(): JSX.Element {
  const [picIndex, setPicIndex] = useState(0);
  let timer: any;

  useEffect(() => {
    setInterval(() => {
      timer = setPicIndex((prevState: number) => {
        return (prevState + 1) % 2
      })
    }, 6000);
    return () => {
      if (timer) { clearInterval(timer); }
    }
  }, [])


  return (
    <div className="login-container animated fadeIn slow">
      {
        picIndex === 0 ? <img key="pic0" id="pic0" className="login-bak animated fadeIn slow" src={bakPic0} alt="" />
          : <img key="pic1" id="pic1" className="login-bak animated fadeIn slow" src={bakPic1} alt="" />
      }
      <img className="login-bak pic-shadow" src={picIndex === 0 ? bakPic1 : bakPic0} alt="" />
      <div className="login-log">
        <img src={logoIcon} alt="" />
        <span>XXXXXX系统</span>
      </div>
      <div className="right-loat-container">
        {
          picIndex === 0 ? <Fragment key="pic0">
            <div className={`bak-blur0 animated fadeIn slow`} />
            <div className={`bak-blur-mask0 animated fadeIn slow`} />
          </Fragment> : <Fragment key="pic1">
              <div className={`bak-blur1 animated fadeIn slow`} />
              <div className={`bak-blur-mask1 animated fadeIn slow`} />
            </Fragment>
        }
        <Fragment>
          <div className={`bak-blur${picIndex === 0 ? 1 : 0} mask-shadow`} />
          <div className={`bak-blur-mask${picIndex === 0 ? 1 : 0} mask-shadow`} />
        </Fragment>
      
        <div className="login-form">
          <div className="login-form-title">用户登录</div>
          <LoginForm />
        </div>

        <div className="app-qrcode">
          <img src={qrcodeIcon} alt="" />
          <span>APP下载</span>
        </div>
      </div>
      <div className="login-footer">
        技术支持单位：XXXXXXXXXXXX
      </div>
    </div>
  )
}

export default Memo(Login);