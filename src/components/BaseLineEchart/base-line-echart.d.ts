export interface IProps {
    domId?: string,
    title?: string,
    chartData?: any,
    option?: any,
    noneDataTips?: string,
    dataZoomEnd?: number,
  }
  
  export interface IBaseValue {
    name: string,
    color: string,
    value: number
  }