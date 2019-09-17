import * as React from "react";

import "./Home.less";
import { useDispatch } from "store/store";
import { useState } from "utils/declare";
import { InterPropsType } from './Home.d';
import HeaderComponent from 'components/LayOut/HeaderComponent/Header';
import MenuComponent from 'components/LayOut/MenuComponent/MenuComponent';
import { CHANGE_SLIDER_INFO } from "store/UI/reducer";

import { Layout } from 'antd';
import asyncRouter from '../../router/router';
import TIcon from '../../assets/fonts/font';
const { Sider, Content } = Layout;


function Home(props: InterPropsType): JSX.Element {
  const [collapsed, setCollapsed] = useState(false)
  const dispatch = useDispatch();

  const toggle = (isSelect: boolean) => {
    dispatch({ type: CHANGE_SLIDER_INFO, collapsed: !collapsed });
    setCollapsed(!collapsed);
  }

  return (
    <div className="home-container">
      <div className="header">
        <HeaderComponent />
      </div>
      
      <Layout >
        <Sider
          collapsible={true}
          collapsed={collapsed}
          theme="light"
          width={"2rem"}
          collapsedWidth={".8rem"}
          trigger={
            <div className={`trigger-box ${collapsed ? "active" : ""}`} >
              <div className="icon-box">
                <TIcon type={"icon-cebianlanzhankai"} />
              </div>
              <div className="text-box"> 隐藏 </div>
            </div>
          }
          onCollapse={(isSelect: boolean) => { toggle(isSelect) }}
        >
          <MenuComponent router={asyncRouter} collapsed={collapsed} />
        </Sider>
        <Layout>
          <Content style={{ position: "relative" }}>
            <div className="home-children">{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Home; 