import { IResLoginData } from "utils/declare";

export const CHANGE_LOGIN_INFO = "CHANGE_LOGIN_INFO";
export const CHANGE_TOKEN = "CHANGE_TOKEN"

interface IChangeLoginInfoAction {
    type: typeof CHANGE_LOGIN_INFO,
    data: IResLoginData,
}

interface IChangeTokenAction {
    type: typeof CHANGE_TOKEN,
    token: string,
}

interface ILoginState {
    data?: IResLoginData,
    token?: string,
}

const defaultState: ILoginState = {
    data: {},
    token: ""
}

export type LoginActionTypes = IChangeLoginInfoAction | IChangeTokenAction;
export type ILoginReducer = ILoginState;

export const LoginReducer = (state: ILoginState = defaultState, action: LoginActionTypes): ILoginState => {
    switch (action.type) {
        case CHANGE_LOGIN_INFO:
            return { ...state, ...{ data: action.data } };
        case CHANGE_TOKEN:
            return { ...state, ...{ token: action.token } };
        default:
            return state;
    }
} 