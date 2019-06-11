import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { History } from 'history';

import createRootReducer from 'app/reducers';
import RestService from 'app/rest-service';
import ApiClient from 'app/api';

const api = new ApiClient(new RestService());

export function configureStore(history: History) {
    const historyMiddleware = routerMiddleware(history);
    const mainMiddleware = composeWithDevTools(applyMiddleware(thunkMiddleware.withExtraArgument(api), historyMiddleware));

    return createStore(createRootReducer(history), {}, mainMiddleware);
}
