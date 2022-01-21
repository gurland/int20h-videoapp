import React, { createContext, useReducer } from 'react';
import { GlobalStore } from '../../types/GlobalStore';
import { Actions } from './actions';

const initialStore: GlobalStore = {};
export const store = createContext<GlobalStore>(initialStore);

interface StoreProviderProps {
    children: React.ReactNode;
}

interface Action {
    type: Actions;
    payload: unknown;
}

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
