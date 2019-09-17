import * as React from 'react';
import * as ReactRouter from "react-router-dom";
import * as ReactRedux from "react-redux";
import { Icon, Radio, Spin, Table, Input, Button, Select, Pagination, DatePicker, Modal, message, Menu } from "antd";

export const ReduxConnect: any = ReactRedux.connect;

export const Route: any = ReactRouter.Route;
export const BrowserRouter: any = ReactRouter.BrowserRouter;
export const Switch: any = ReactRouter.Switch;
export const Redirect: any = ReactRouter.Redirect;
export const withRouter: any = ReactRouter.withRouter;
export const Link: any = ReactRouter.Link;

export const Fragment: any = React.Fragment;
export const Memo: any = React.memo;

export const useState: any = React.useState;
export const useEffect: any = React.useEffect;
export const useReducer: any = React.useReducer;
export const useCallback: any = React.useCallback;
export const lazy: any = React.lazy;

export const MyIcon: any = Icon;
export const MyModal: any = Modal;
export const MyRadio: any = Radio;
export const MySpin: any = Spin;
export const MyTable: any = Table;
export const MyInput: any = Input;
export const MyButton: any = Button;
export const MySelect: any = Select;
export const MyPagination: any = Pagination;
export const MyDatePicker: any = DatePicker;
export const MyOption: any = Select.Option;
export const MyMessage: any = message;
export const MyMenu: any = Menu;
export const MySubMenu: any = Menu.SubMenu;

interface ITarget {
    type?: string,
    value?: string | boolean,
    checked?: string | boolean,
}

interface IBaseSyntheticEvent<E = object, C = any, T = any> {
    nativeEvent: E;
    currentTarget: C;
    target: T;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    timeStamp: number;
    type: string;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
}

export interface ISyntheticEvent<T = Element, E = Event> extends IBaseSyntheticEvent<E, EventTarget & T, EventTarget & ITarget> { }
export interface IFormEvent<T = Element> extends ISyntheticEvent<T> { }

type NativeMouseEvent = MouseEvent;

export interface IMouseEvent<T = Element, E = NativeMouseEvent> extends ISyntheticEvent<T, E> {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
     */
    metaKey: boolean;
    movementX: number;
    movementY: number;
    pageX: number;
    pageY: number;
    relatedTarget: EventTarget;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
    getModifierState(key: string): boolean;
}

export interface IResLoginData {
    tkUserToken?: string | null,
    expireTimestamp?: string | null,
    id?: number | null | null,
    realName?: string | null,
    showUserName?: string | null,
    showStarUserName?: string | null,
    userType?: number | string | null,
    bindMobile?: string,
    distinct?: string | null,
    imageUrl?: string | null,
    position?: string | null,
    sex?: string | null,
}
export interface IResponse<T = IResLoginData> {
    _success?: boolean,
    data?: T | undefined | null,
    status?: string | number,
    statusText?: string,
    code?: string | undefined |number,
    message?: string | undefined | null,
    getContent?: object | null,
};

export interface IRouterProps {
    history: any,
    collapsed: boolean,
}