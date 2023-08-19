import {
    Reducer,
    useCallback,
    useEffect,
    useReducer,
    useRef,
} from 'react';

type ClassicStateUpdate<State> = Partial<State> | ((state: State) => State);

export function useClassicState<State extends Record<string, unknown>>(
    initialState: State,
  ) {
    return useReducer<Reducer<State, ClassicStateUpdate<State>>>(
      (state, action) => {
        if (typeof action === 'function') {
          return action(state);
        }
        return { ...state, ...action };
      },
      initialState,
    );
  }