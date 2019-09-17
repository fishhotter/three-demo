import * as React from "react"
import "./BaseSpin.less";

interface IPropsType {
  userClass?: string;
  tips: string;
}

const defaultProps = {
  tips: "正在加载...",
}

BaseSpin.defaultProps = JSON.parse(JSON.stringify(defaultProps));

function BaseSpin(props: IPropsType) {
  const { userClass ,tips} = props;
        
  return (
    <div className={`spin-contain ${userClass}`}>
      <div className="spin-pic">
        <i/>
        <i/>
        <i/>
        <i/>
      </div>
      <div className="loading-tips">{tips}</div>
    </div>
  )
}


export default BaseSpin; 