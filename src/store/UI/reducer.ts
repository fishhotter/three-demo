import { IProjInfo } from "./reducer.d";

export const CHANGE_ROOT_FONT = "CHANGE_ROOT_FONT";
export const CHANGE_PROJ_INFO = "CHANGE_PROJ_INFO";
export const CHANGE_SLIDER_INFO = "CHANGE_SLIDER_INFO";

interface IChangeRootFontAction {
  type: typeof CHANGE_ROOT_FONT,
  value: number,
  height: string
}

interface IChangeProjIdAction {
  type: typeof CHANGE_PROJ_INFO,
  projInfo: IProjInfo
}

interface IChangeSliderAction {
  type: typeof CHANGE_SLIDER_INFO,
  collapsed: boolean,
}

interface IUiState {
  rootFontSize?: number,
  rootHeight?: string,
  projInfo?: IProjInfo
  collapsed?: boolean,
}

const defaultState: IUiState = {
  rootFontSize: 0,
  rootHeight: "",
  projInfo: {},
  collapsed: false,
}

export type UiActionTypes = IChangeRootFontAction | IChangeProjIdAction | IChangeSliderAction;
export type IUiReducer = IUiState;

export const UiReducer = (state: IUiState = defaultState, action: UiActionTypes): IUiReducer => {
  switch (action.type) {
  case CHANGE_ROOT_FONT:
    return { ...state, ...{ rootFontSize: action.value, rootHeight: action.height } };
  case CHANGE_PROJ_INFO:
      return { ...state, ...{ projInfo: action.projInfo } };
  case CHANGE_SLIDER_INFO:
    return { ...state, ...{ collapsed: action.collapsed } };
  default:
    return state;
  }
} 