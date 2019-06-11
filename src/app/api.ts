import { AxiosPromise } from 'axios';

import RestService from 'app/rest-service';

export default class ApiClient {
    restService: RestService = null;

    constructor(restService: RestService) {
        this.restService = restService;
    }

    getValues(inputValue: number): AxiosPromise<any> {
        return this.restService.get(`/person/${inputValue}`);
    }

    getFacilityValues(val1: number): AxiosPromise<any> {
        return this.restService.get(`/facility/${val1}`);
    }

    getExposureValues(val2: number): AxiosPromise<any> {
        return this.restService.get(`/exposure/${val2}`);
    }
}
