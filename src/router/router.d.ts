
export interface InterRouteConfig {
    path : string;
    name : string;
    exact : boolean;
    components : any;
    children : InterRouteConfig[];
    show: boolean;
    redirect? : string;
    meta? : InterMetaConfig;
    icon?: string;
}

interface InterMetaConfig {
    [extra:string] : string;
}

export interface ICheckAuthResult {
    success: boolean,
}

export interface IProps {
    history?: any
}