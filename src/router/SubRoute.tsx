import * as React from 'react';
import { Switch, Route, Redirect, Memo, IResponse, IResLoginData, useState, useCallback, withRouter, useEffect} from "utils/declare";
import CommonFunc from "utils/common-func";
import ApiFetch from "utils/api-fetch";
import { loginApi } from "utils/api-group";
import { CHANGE_LOGIN_INFO, CHANGE_TOKEN } from "store/LoginInfo/reducer";
import { useMappedState, IStoreState, useDispatch } from "store/store";
import { InterRouteConfig, ICheckAuthResult, IProps } from './router.d';

import withLazyLoad from "components/withLazyLoad/withLazyLoad";
import asyncRouter from './router';
import Home from 'pages/Home/Home';


function SubRoute(props: IProps): JSX.Element | null {
  const [hasAuth, setHasAuth] = useState(true);
  const dispatch = useDispatch();
  const { loginToken } = useMappedState(
    useCallback((state: IStoreState) => ({
      loginToken: state.LoginReducer.token
    }), [])
  )

  const checkAuth = async (): Promise<ICheckAuthResult> => {
    const res: IResponse<IResLoginData> = await ApiFetch.post(loginApi.checkAuth);
    dispatch({ type: CHANGE_LOGIN_INFO, data: res.data })
    return { success: res._success || false};
  }

  const isHasAuth = ():void => {
    const token: string | undefined = CommonFunc.getCookie("token");
    if (!token) { 
      setHasAuth(false);
      props.history.push("/");
      return;
    }
    if (loginToken === token) { 
      setHasAuth(true);
      return; 
    }
    checkAuth().then((res: ICheckAuthResult) => {
      if (!res.success) { 
        props.history.push("/"); 
        return;
      }
      if (loginToken !== token) { dispatch({ type: CHANGE_TOKEN, token }) }
      setHasAuth(res.success);
    } );
  }

  // useEffect(() => isHasAuth(), [loginToken])
  console.log(isHasAuth, useEffect)

  return (
      // tslint:disable-next-line:no-null-keyword
      !hasAuth ? null :
        <Home>
          <Switch>
            {
              asyncRouter.map((item: InterRouteConfig, j: number) => {
                if (item.children && item.children.length > 0) {
                  return <Route path={item.path} key={item.name} render={() =>
                    <Switch>
                      {
                        item.children ?
                          item.children.map((child: any) =>
                            <Route path={child.path} exact={child.exact} key={child.name} component={withLazyLoad(child.components)} />
                          )
                          // tslint:disable-next-line:no-null-keyword
                          : null
                      }
                    </Switch>
                  }
                  />
                } else {
                  return <Route path={item.path} exact={item.exact} key={item.name} component={withLazyLoad(item.components)} />
                }
              })
            }
            <Redirect to="/" />
          </Switch>
        </Home>
  );
}

export default Memo(withRouter(SubRoute)); 