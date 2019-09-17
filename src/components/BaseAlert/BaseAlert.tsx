import * as React from "react"
import "./BaseAlert.less"
import { IProps } from './base-alert.d';

const Notification = require('rc-notification');
let notification:any = "";
Notification.newInstance({}, (n:any) => notification = n);
const  BaseAlert: IProps = {};

BaseAlert.message = (obj) =>{
  const key = Date.now();
  notification.notice({
    content: <div className ={` BaseAlert ${obj.className} `}>
      <div className={ `type ${obj.type}`} />
      <div className="content">{obj.content}</div>
    </div>,
    key,
    duration: obj.duration || 1,
  });  
}


export default BaseAlert; 

