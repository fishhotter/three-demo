import * as React from "react";
import { IBodyFooterProps } from "./base-dialog";

export default function BaseDialogFooter(props: IBodyFooterProps): JSX.Element {

  return (
    <div className="baseDialog-footer" style={props.style}>
      {props.children}
    </div>
  )
}