import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import ApiClient from 'app/api';
import {
    FETCH_FIRST_TWO_VALUES_SUCCESS,
} from './constants';

const fetchFirstTwoValuesSuccess = createAction<any>(FETCH_FIRST_TWO_VALUES_SUCCESS);

interface AmountModel {
    amount: number
}

export const multipliedValue = (value: AmountModel) =>
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
                    dispatch(fetchFirstTwoValuesSuccess(data));
                });
        } catch (error) {
            console.log(error);
        }
    };
