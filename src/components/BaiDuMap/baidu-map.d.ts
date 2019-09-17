export interface IProp {
    isShowPop: boolean,
    pointResult: number[],
    onCancel?: () => void,
    onConfirm?: (pointResult: number[]) => void
  }