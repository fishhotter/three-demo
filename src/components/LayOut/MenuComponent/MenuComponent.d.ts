import {InterRouteConfig} from './../../../router/router.d';

export interface InterStateType {
    collapsed : boolean;
    router: InterRouteConfig[];
    defalutKeyArray: string[];
    defalutOpenKeyArray: string[];
}

export interface InterPropsType {
    router: InterRouteConfig[];
    collapsed: boolean;
}

export interface InterSelectedType {
    domEvent:any;
    item:any;
    key:string;
    keyPath:string[];
    selectedKeys:string[];
}