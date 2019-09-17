import * as React from "react";
import { useState, useEffect, MyIcon, IResponse, Memo, IFormEvent, IRouterProps, withRouter } from "utils/declare";
import CommonFunc from "utils/common-func";
import ApiFetch from "utils/api-fetch";
import { loginApi } from "utils/api-group";
import { useDispatch } from "store/store";
import { CHANGE_PROJ_INFO } from "store/UI/reducer";
import { CHANGE_LOGIN_INFO } from "store/LoginInfo/reducer";
import { IProjInfo } from "store/UI/reducer.d";
import { ILoginParams } from "./login-form.d"

import BaseInput from "components/BaseInput/BaseInput";

import "./LoginForm.less";

const IMG_ADDR = "/bizunit1/api/user/validate/image?verifyUuid=";
const DEFAULT_LOGIN_PARAMS: ILoginParams = {
    fromAppType: 1,
    password: "",
    projectId: 0,
    userType: 2,
    username: "",
    verifyCode: "",
    verifyUuid: "",
}

let projInfo: IProjInfo;
let uuid: string;

function LoginForm(props: IRouterProps): JSX.Element {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [autoLogin, setAutoLogin] = useState(false);
    const [verifyCodeSrc, setVerifyCodeSrc] = useState("");
    const [errTips, setErrTips] = useState("");
    const changeFunc = {
        "userName": setUserName,
        "password": setPassword,
        "verifyCode": setVerifyCode,
        "autoLogin": setAutoLogin,
        "verifyCodeSrc": setVerifyCodeSrc
    }

    useEffect(() => {
      updateVerifyCode();
      getProjecId();
    }, [])

    const getProjecId = async (): Promise<{}> => {
      const res: IResponse<IProjInfo> = await ApiFetch.post(loginApi.projectId, { projectCodeTp: "EP-BWM" });
      projInfo = res.data as IProjInfo;
      dispatch({ type: CHANGE_PROJ_INFO, projInfo: res.data})

      return {};
    }

    const loginIn = async (params = DEFAULT_LOGIN_PARAMS): Promise<{}> => {
      try {
        const res: IResponse = await ApiFetch.post(loginApi.login, params);
        if (!res._success) {
          setErrTips(res.message || "登录失败，请重新登录");
          return {};
        }
        if (res.data) {
          CommonFunc.setCookie("token", res.data.tkUserToken);
          dispatch({ type: CHANGE_LOGIN_INFO, data: res.data})
          props.history.push("/gisshow");
        }
      } catch(e) {
        setErrTips("登录失败，请重新登录");
      }

      return {};
    }

    const judgeLoginInput = (): boolean => {
      if (userName === "" || password === "" || verifyCode === "") {
        setErrTips("请填写完整信息");
        return false;
      }
      
      return true;
    }

    const onChange = (name: string, value: string | boolean): void => {
        changeFunc[name](value);
    }

    const onSubmit = (ev: IFormEvent<HTMLFormElement>): void => {
      ev.preventDefault();
      if (!judgeLoginInput()) { return; }
      const passwordMd5: string = CommonFunc.getMd5(password);
      const params = {
        ...DEFAULT_LOGIN_PARAMS,
        password: passwordMd5,
        username: userName,
        verifyCode,
        verifyUuid: uuid,
      }
      if (!projInfo) {
          getProjecId().then(() => {
            loginIn({ ...params, projectId: projInfo.id })
          })
      } else {
        loginIn({ ...params, projectId: projInfo.id })
      }
    }

    const updateVerifyCode = () => {
      uuid = CommonFunc.uuid() as string;
      setVerifyCodeSrc(`${IMG_ADDR}${uuid}`);
    }

    return (
        <form className="login-form-container" onSubmit={onSubmit}>
            <BaseInput name="userName" value={userName} onChange={onChange} placeholder={"请输入用户名"} iconClassName="anticon-user">
                <MyIcon type="user" style={{color: "#9B9B9B", fontSize: ".3rem", marginLeft: ".3rem"}}/>
            </BaseInput>
            <BaseInput type="password" name={"password"} value={password} onChange={onChange} placeholder={"请输入密码"} iconClassName="anticon-lock">
                <MyIcon type="lock" style={{ color: "#9B9B9B", fontSize: ".3rem", marginLeft: ".3rem" }} />
            </BaseInput>
            <div className="verify-container">
                <BaseInput userClass="verify-class" name="verifyCode" value={verifyCode} onChange={onChange} placeholder={"请输验证码"} />
                <img src={verifyCodeSrc} alt="" onClick={updateVerifyCode} />
            </div>
            
            <div className="form-checkbox-block">
                <span className="auto-login">
                    <BaseInput type="checkbox" label={"记住密码"} name="autoLogin" value={autoLogin} onChange={onChange} />
                </span>
                <span className="forget-password">忘记密码？</span>
            </div>
            <button className="submit-btn" type="submit"> 登录 </button>
            <div className="err-tips" title={errTips}>{errTips}</div>
        </form>
    )
}

export default Memo(withRouter(LoginForm));