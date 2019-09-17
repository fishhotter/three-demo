import * as React from "react";
import { InterPropsType, InterDataType }  from './SelectComponent.d';

import { MySelect, MyOption, Memo } from "utils/declare";

import "./SelectComponent.less";

const defaultProps: InterPropsType = {
  mode: "multiple",
  value: [],
  chooseData: [],
  showArrow: true,
  title: "选择框",
  defaultValue: []
}

SelecComponent.defaultProps = JSON.parse(JSON.stringify(defaultProps));

function SelecComponent(props: InterPropsType): JSX.Element {

  const handleSelect = (e: string[]) => {
    if(props.getData){
      props.getData(e);
    }
  }
  
  const prevRender = (): JSX.Element => {
    const { value, chooseData, disabled, mode, title, showArrow, defaultValue } = props;
    let defalutlist: any = []

    if (typeof defaultValue !== undefined) {
      defalutlist = defaultValue
    }

    return (
      <div className="search-select search-common">
        <span className="label-name">{title}</span>
        <MySelect mode={mode} onChange={handleSelect} showArrow={showArrow} value={value} disabled={disabled} defaultValue={defaultValue}>
          {
            chooseData.map((item: InterDataType) => {
              const name = item.name ? item.name : item.areaName;
              const code = item.code ? item.code : item.areaCode;
              return (
                <MyOption value={name} key={code} title={name}>{name}</MyOption>
              )
            })
          }
        </MySelect>
        <div className="select-valuebox">
          {
            value.length > 0 ? <div className="select-value">{value.join(",")}</div>
              : defalutlist.length > 0 ? "" : <div className="select-place">请选择</div>
          }
        </div>
        <div className="select-valuebox">
          {
            defalutlist.length > 0 ? <div className="select-value">{defalutlist.join(",")}</div>
            : <div className="select-place" />
          }
        </div>
      </div>
    );
  }

  return prevRender();      
}

export default Memo(SelecComponent); 