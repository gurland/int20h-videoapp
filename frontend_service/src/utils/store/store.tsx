import React, { createContext, useReducer } from 'react';
import { GlobalStore } from '../../types/GlobalStore';
import { Actions } from './actions';
import jwt_decode from 'jwt-decode';
import { User } from '../../types/User';

interface StoreProviderProps {
    children: React.ReactNode;
}

interface Action {
    type: Actions;
    payload: any;
}

interface StoreWithDispatch<Store> {
    dispatch: React.Dispatch<Action>;
    state: Store;
}

const initialStore: GlobalStore = {
    user: (() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return null;
        const { sub } = jwt_decode<{ sub: User }>(token);
        return sub;
    })(),
};
export const store = createContext<StoreWithDispatch<GlobalStore>>({ state: initialStore, dispatch: () => null });

function StoreProvider({ children }: StoreProviderProps) {
    const { Provider } = store;
    const [state, dispatch] = useReducer((state: GlobalStore, action: Action) => {
        switch (action.type) {
            case Actions.SetUser:
                return { ...state, user: action.payload };
            default:
                return state;
        }
    }, initialStore);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export default StoreProvider;
