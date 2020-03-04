import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import { api } from './middlewares/api'
import { logger } from './middlewares/logger'
import { thunk } from './middlewares/thunk'
import reducers from './reducers';

const store = createStore(reducers,
    composeWithDevTools(applyMiddleware(
        thunk,
        // logger,
        api
    )));
export default store;