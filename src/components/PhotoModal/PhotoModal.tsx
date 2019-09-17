import * as React from "react";
import { Memo, MyIcon, useState, IMouseEvent } from "utils/declare";
import { IProp } from "./photo-modal.d";

import BaseDialog from "components/BaseDialog/BaseDialog";

import "./PhotoModal.less";

const defaultProps: IProp = {
  isShowPop: false,
  picInfo: [],
}

const MARGIN_LEFT = 7.62; // rem

PhotoModal.defaultProps = JSON.parse(JSON.stringify(defaultProps));

function PhotoModal(props: IProp): JSX.Element | null {
  const [picIndex, setPicIndex] = useState(0);
  const [picArrowOpacity, setPicArrowOpacity] = useState(0);

  const onPicPopCancel = () => {
    if (props.onPicPopCancel) { props.onPicPopCancel(); }
  }

  const handlePicShow = (isLeft: boolean = true) => {
    if (isLeft) {
      setPicIndex((prevState: number) => Math.max(0, prevState - 1));
    } else {
      setPicIndex((prevState: number) => Math.min(props.picInfo.length - 1, prevState + 1));
    }
  }

  const onPicMouseEnter = (e: IMouseEvent) => {
    e.preventDefault();
    if (picArrowOpacity !== 1 && props.picInfo.length > 1) {
      setPicArrowOpacity(1);
    }
  }

  const onPicMouseLeave = (e: IMouseEvent) => {
    e.preventDefault();
    if (picArrowOpacity !== 0) {
      setPicArrowOpacity(0);
    }
  }

  return (
    <BaseDialog isShowPop={props.isShowPop} onCancel={onPicPopCancel} size={{ width: "8rem", height: "5.64rem" }} isBackIcon={true}>
      <div className="pic-pop-container">
        <div className="pop-header">
          <span className="header-title">现场照片</span>
        </div>
        <div className="pop-tips">
          <div className="pic-time">拍摄时间：
            <span>{"--"}</span>
          </div>
          <div className="pic-lat">{`北纬 --`}</div>
          <div className="pic-lon">{`东经 --`}</div>
        </div>
        <div className="pic-container" onMouseEnter={onPicMouseEnter} onMouseLeave={onPicMouseLeave}>
          <div className="arrow-container" style={{ opacity: picArrowOpacity }}>
            <div className="pic-arrow left" onClick={() => handlePicShow(true)}>
              <MyIcon type="left" style={{ color: "#FFF", fontSize: ".3rem" }} />
            </div>
            <div className="pic-arrow right" onClick={() => handlePicShow(false)}>
              <MyIcon type="right" style={{ color: "#FFF", fontSize: ".3rem" }} />
            </div>
          </div>
          <div className="pic-move-ctrl" style={{ marginLeft: `${-picIndex * MARGIN_LEFT}rem` }}>
            {
              props.picInfo.length <= 0 ? "暂无数据" :
                props.picInfo.map((item: any) => <div className="pic-content" key={item}>
                  <img src={item} alt="" />
                  </div>
                )
            }
          </div>
        </div>
      </div>
      {/*tslint:disable-next-line:no-null-keyword*/}
    </BaseDialog>
  );
}

export default Memo(PhotoModal); 