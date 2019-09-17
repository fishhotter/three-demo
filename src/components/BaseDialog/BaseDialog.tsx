import * as React from "react";
import { IProps } from "./base-dialog";
import { MyIcon, Memo } from "utils/declare";

import BaseDialogBody from "./BaseDialogBody";
import BaseDialogFooter from "./BaseDialogFooter";

import "./BaseDialog.less";

const defaultProps: IProps = {
  isShowPop: false,
  isBackIcon: false,
  isVisible: "visible",
  title: "",
  size: {
    width: "10.96rem",
    height: "6.04rem",
  },
  modal: true,
  customClass: "",
  // tslint:disable-next-line:no-null-keyword
  children: null
}

BaseDialog.defaultProps = JSON.parse(JSON.stringify(defaultProps));
BaseDialog.Body = BaseDialogBody;
BaseDialog.Footer = BaseDialogFooter

function BaseDialog(props: IProps): JSX.Element {


  const dialogClose = () => {
    if (props.onCancel) { props.onCancel(); }
  }

  const handleWrapperClick = (e: any) => {
    if (e.target instanceof HTMLDivElement) {
      if (e.target === e.currentTarget) {
        dialogClose();
      }
    }
  }

  const preRender = () => {
    const { isShowPop, title, size, modal, customClass, isVisible, isBackIcon } = props;
    let width = "10.96rem";
    let height = "6.04rem";
    if (size) {
      width = size.width;
      height = size.height;
    }
    const display = isShowPop ? "block" : "none";
    const backgroundColor = modal ? "rgba(0, 0, 0, .5)" : "rgba(0, 0, 0, 0)"

    return (
      <div className={`baseDialog ${customClass}`} style={{ display, backgroundColor, visibility: isVisible }} onClick={handleWrapperClick}>
        <div className="pop-dialog-container" style={{ width, height }}>
          <span className="close-container" onClick={dialogClose} title={!isBackIcon ? "关闭" : "返回"}>
            {
              !isBackIcon ? <MyIcon type="close" style={{ color: "#999999", fontSize: ".16rem" }} /> :
              <span className="back-icon">
                <MyIcon type="rollback" style={{ color: "#999999", fontSize: ".24rem", marginRight: ".1rem" }} />
                返回
              </span>
            }
          </span>
          {
            // tslint:disable-next-line:no-null-keyword
            title !== "" ? <div className="pop-dialog-title">{title}</div> : null
          }
          {props.children}
        </div>
      </div>
    )
  }

  return preRender()
}

export default Memo(BaseDialog); 