import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';
import MockAdapter from 'axios-mock-adapter';

class RestService {
    private readonly axiosInstance: AxiosInstance;
    public readonly baseURL = '/';

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
        });

        const mock = new MockAdapter(this.axiosInstance);

        mock.onGet(/\/person\/\d+/).reply(() => {
            return [200, {
                val1: Math.floor((Math.random() * 100) + 1),
                val2: Math.floor((Math.random() * 100) + 1),
            }];
        });

        mock.onGet(/\/facility\/\d+/).reply(() => {
            return [200, {
                val3: Math.floor((Math.random() * 100) + 1),
                val4: Math.floor((Math.random() * 100) + 1),
            }];
        });

        mock.onGet(/\/exposure\/\d+/).reply(() => {
            return [200, {
                val5: Math.floor((Math.random() * 100) + 1),
            }];
        });

        this.axiosInstance.interceptors.response.use(response => {
            if (response && response.status !== 200) {
                return Promise.reject(response);
            }

            return response;
        }, error => {

            return Promise.reject(error.response);
        },
        );
    }

    public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.get(url, config);
    }
}

export default RestService;
