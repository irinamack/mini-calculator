import { handleActions } from 'redux-actions';
import { assocPath } from 'ramda';

import {
    MULTIPLY_TWO_VALUES_SUCCESS,
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
        [MULTIPLY_TWO_VALUES_SUCCESS]: (state, { payload }) => assocPath(['answer'], payload, state),
    },
    getInitialState(),
);
