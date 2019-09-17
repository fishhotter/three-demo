import * as React from "react";
import { RouteComponentProps, StaticContext } from "react-router";
import { InterPropsType, InterSelectedType } from "./MenuComponent.d";
import { InterRouteConfig } from "router/router.d";
import { Link, MySubMenu, MyMenu, withRouter, Memo } from "utils/declare";
import TIcon from "assets/fonts/font";

import "./MenuComponent.less";

function MenuComponent(props: InterPropsType & RouteComponentProps<any, StaticContext, any>): JSX.Element {
  let defalutKeyArray: any[] = [];
  let defalutOpenKeyArray: any[] = [];
  let defalutOpenKey: any = props.location;
  const defalutOKArray: string[] = [];
  const defalutKArray: string[] = [];
  defalutKArray.push(props.location.pathname);

  if (defalutOpenKey.pathname.match(/\/(\S*)\//) !== null) {
    defalutOpenKey = "/" + defalutOpenKey.pathname.match(/\/(\S*)\//)[1];
  } else {
    defalutOpenKey = ""
  }
  defalutOKArray.push(defalutOpenKey);
  defalutKeyArray = defalutKArray;
  defalutOpenKeyArray = defalutOKArray

  const seleted = (e: InterSelectedType) => {
    // TODO
  };

  const preRender = () => {
    const { collapsed, router } = props;

    return (
      <div className="Menu-component-container">
        <MyMenu theme="light" mode="inline" defaultSelectedKeys={defalutKeyArray} 
          defaultOpenKeys={defalutOpenKeyArray} inlineIndent={"20"} inlineCollapsed={collapsed}
          onSelect={(e: InterSelectedType) => seleted(e)}
        >
          {
            router.map((item: InterRouteConfig) => {
            if (item.children && item.show) {
              if (item.children.length === 0) {
                return (
                  <MyMenu.Item key={item.path}>
                    <TIcon type={item.icon} />
                    <div className="menu-link">
                      <Link className="link-box" to={item.path} >{item.name}</Link>
                    </div>
                  </MyMenu.Item>
                );
              } else {
                return (
                  <MySubMenu key={item.path} title={
                    <span>
                      <TIcon type={item.icon} />
                      <span className="title">{item.name}</span>
                    </span>} 
                  >
                    {
                      item.children.map( (child: InterRouteConfig, childeIndex: number) => {
                        if (child.show) {
                          return (
                            <MyMenu.Item key={child.path}>
                              <Link className="link-box" to={child.path} >{child.name}</Link>
                            </MyMenu.Item>
                          );
                        } else {
                          // tslint:disable-next-line:no-null-keyword
                          return null;
                        }
                      })
                    }
                  </MySubMenu>
                );
              }
            } else {
              return undefined;
            }
          })}
        </MyMenu>
      </div>
    );
  }

  return preRender();
}

export default Memo(withRouter(MenuComponent)); 