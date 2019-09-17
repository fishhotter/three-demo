import * as React from "react";
import { IBodyFooterProps } from "./base-dialog";

export default function BaseDialogBody(props: IBodyFooterProps): JSX.Element {

  return (
    <div className="baseDialog-body" style={props.style}>
      {props.children}
    </div>
  )
}