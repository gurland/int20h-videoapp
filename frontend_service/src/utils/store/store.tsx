import React, { createContext, useReducer } from 'react';
import { GlobalStore } from '../../types/GlobalStore';
import { Actions } from './actions';

interface StoreProviderProps {
    children: React.ReactNode;
}

interface Action {
    type: Actions;
    payload: unknown;
}

interface StoreWithDispatch<Store> {
    dispatch?: React.Dispatch<Action>;
    state: Store;
}

const initialStore: GlobalStore = {
    accessToken: localStorage.getItem('accessToken'),
};
export const store = createContext<StoreWithDispatch<GlobalStore>>({ state: initialStore });

function StoreProvider({ children }: StoreProviderProps) {
    const { Provider } = store;
    const [state, dispatch] = useReducer((state: GlobalStore, action: Action) => {
        switch (action.type) {
            default:
                return state;
        }
    }, initialStore);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export default StoreProvider;
