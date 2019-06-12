import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import ApiClient from 'app/api';

import { MiniCalculatorFormData } from 'app/pages/mini-calculator/mini-calculator-form';
import { MULTIPLY_TWO_VALUES_SUCCESS } from './constants';

const multipliedValuesSuccess = createAction<any>(MULTIPLY_TWO_VALUES_SUCCESS);

export const multipliedValue = (value: MiniCalculatorFormData) =>
    async (dispatch: Dispatch, getState: any, api: ApiClient) => {
        try {
            await api.getValues(value.amount).then(response =>
                Promise.all([
                    api.getFacilityValues(response.data.val1),
                    api.getExposureValues(response.data.val2),
                ])).then(response => {
                    const facility = response[0].data.val3;
                    const exposure = response[1].data.val5;
                    const data = facility * exposure;
                    dispatch(multipliedValuesSuccess(data));
                });
        } catch (error) {
            console.log(error);
        }
    };
