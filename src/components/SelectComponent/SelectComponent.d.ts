export  interface InterPropsType {
    mode: string | boolean;
    value: any[];
    chooseData: any[];
    showArrow: boolean;
    title: string;
    disabled?: boolean;
    getData?: (e:string[])=> void;
    defaultValue?: string | string[];
  }
  export  interface InterDataType {
    code?: string;
    name?: string;
    areaCode?: string;
    areaName?: string;
  } 
  