import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { reducer as form, FormStateMap } from 'redux-form';
import { History } from 'history';

import { NAME as miniCalculatorName } from './mini-calculator/constants';
import { reducer as miniCalculatorReducer, MiniCalculatorState } from './mini-calculator/reducer';

export interface RootState {
    router?: RouterState;
    form: FormStateMap;
    [miniCalculatorName]: MiniCalculatorState;
}

export default (history: History) => combineReducers<RootState>({
    form,
    router: connectRouter(history),
    [miniCalculatorName]: miniCalculatorReducer,
});
