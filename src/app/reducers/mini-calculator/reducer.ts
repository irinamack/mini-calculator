import { handleActions } from 'redux-actions';
import { assocPath } from 'ramda';

import {
    FETCH_FIRST_TWO_VALUES_SUCCESS,
} from './constants';

export interface MiniCalculatorState {
    answer: number,
}

function getInitialState(): MiniCalculatorState {
    return {
        answer: null,
    };
}

export const reducer = handleActions<MiniCalculatorState>(
    {
        [FETCH_FIRST_TWO_VALUES_SUCCESS]: (state, { payload }) => assocPath(['answer'], payload, state),
    },
    getInitialState(),
);
