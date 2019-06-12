import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';
import MockAdapter from 'axios-mock-adapter';

const randomNumber = Math.floor((Math.random() * 100) + 1);

class RestService {
    private readonly axiosInstance: AxiosInstance;
    public readonly baseURL = '/';

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
        });

        const mock = new MockAdapter(this.axiosInstance);

        mock.onGet(/\/person\/\d+/).reply(200, {
            val1: randomNumber,
            val2: randomNumber,
        });

        mock.onGet(/\/facility\/\d+/).reply(200, {
            val3: randomNumber,
            val4: randomNumber,
        });

        mock.onGet(/\/exposure\/\d+/).reply(200, {
            val5: randomNumber,
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
