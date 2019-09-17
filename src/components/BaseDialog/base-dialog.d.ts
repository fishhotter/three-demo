import * as React from 'react';

export interface IBodyFooterProps {
    style?: object,
    children?: React.ReactNode,
}

export interface IProps {
    isShowPop: boolean,
    isBackIcon?: boolean,
    isVisible?: "visible" | "hidden",
    onCancel?: () => void,
    title?: string,
    size?: {
        width: string,
        height: string,
    },
    modal?: boolean,
    customClass?: string,
    children?: React.ReactNode,
}

export interface IBodyOut {
    defaultProps?: any,
    Body?: React.ReactNode,
    Footer?: React.ReactNode,
}