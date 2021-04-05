import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import crashReporter from '../middlewares/logger';


import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line import/no-extraneous-dependencies

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    trace: true,
});

export default createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk, createLogger(), crashReporter)
    ),
);
