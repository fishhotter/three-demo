import * as React from "react"
import { Fragment } from "utils/declare";
import { IProps } from "./base-input";
import { ISyntheticEvent, useEffect } from "utils/declare";

import "./BaseInput.less";

const defaultProps: IProps = {
  value: "",
  type: "text",
  name: "",
  placeholder: "",
  userClass: "",
}

const focusColor: string = "#427AFF";
const blurColor: string = "#9B9B9B";

BaseInput.defaultProps = JSON.parse(JSON.stringify(defaultProps));

function BaseInput(props: IProps): JSX.Element {
  let iconDom: HTMLElement;

  useEffect(() => {
    iconDom = document.getElementsByClassName("anticon-user")[0] as HTMLElement;
  }, [])

  const handleInputChange = (ev: ISyntheticEvent): void => {
    const { name, onChange } = props
    const target = ev.target
    const value: string | boolean | undefined = target.type === "checkbox" ? target.checked : target.value

    if (onChange) { onChange(name, value) }
  }
  
  const onFocus = () => {
    const { iconClassName } = props;
    if (!iconClassName) { return; }
    if (!iconDom) { iconDom = document.getElementsByClassName(iconClassName)[0] as HTMLElement; }
    iconDom.style.color = focusColor;
  }

  const onBlur = () => {
    const { iconClassName } = props;
    if (!iconClassName) { return; }
    if (!iconDom) { iconDom = document.getElementsByClassName(iconClassName)[0] as HTMLElement; }
    iconDom.style.color = blurColor;
  }

  const renderInput = (): JSX.Element => {
    const { type, label, name, value, placeholder, userClass } = props;
    if (typeof value === "string") {
      return <span className={`field-container ${userClass}`}>
        {label && <label className="field-label">{label}</label>}
        {props.children}
        <input className="field-input" type={type} name={name} value={value} placeholder={placeholder} 
          onChange={handleInputChange} onFocus={onFocus} onBlur={onBlur}
        />
      </span>
    }

    return <Fragment />
  }

  const renderCheckbox = (): JSX.Element =>  {
    const { label, name, value, userClass } = props
    if (typeof value === "boolean") {
      return <label className={`field-checkbox ${userClass}`}>
        <input type="checkbox" name={name} checked={value} onChange={handleInputChange} />
        <span className={`checkbox ${value ? "checked" : ""}`} />
        <span className="checkbox-label">{label}</span>
      </label>
    }

    return <Fragment />
  }

  switch (props.type) {
    case "text":
    case "password":
      return renderInput();
    case "checkbox":
      return renderCheckbox();
    default:
      return renderInput();
  }
}



export default BaseInput