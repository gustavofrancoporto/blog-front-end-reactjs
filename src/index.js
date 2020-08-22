import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './configureStore'
import App from "./components/App";

const store = configureStore()

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App} />
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));