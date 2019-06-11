import '@babel/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { configureStore } from 'app/store';
import Index from 'app/index';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Index/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
);
