/*
    import { useMappedState, IStoreState, useDispatch } from "store/store";
    import { useCallback, Memo } from "utils/declare";

    // mapStateToProps
    const { data } = useMappedState(
        useCallback((state: IStoreState) => ({
            data: state.LoginReducer.data
        }), [])
    )

    // mapDispatch
    const dispatch = useDispatch();
    dispatch({ type: CHANGE_LOGIN_INFO, data: res.data})
*/

import { createStore, combineReducers } from "redux";
import { create } from "redux-react-hook";

import * as UI from "./UI/reducer";
import * as LoginInfo from "./LoginInfo/reducer";

export interface IStoreState {
  UiReducer: UI.IUiReducer,
  LoginReducer: LoginInfo.ILoginReducer,
}

export const store = createStore(
  combineReducers({ 
    UiReducer: UI.UiReducer,
    LoginReducer: LoginInfo.LoginReducer 
  })
);

export const { StoreContext, useDispatch, useMappedState } = create<any, any, any>(); 
