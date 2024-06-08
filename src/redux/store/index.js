import { applyMiddleware, legacy_createStore as createStore} from 'redux'
import rootReducer from '../reducers';
import { thunk } from 'redux-thunk';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    // window._REDUX_DEVTOOLS_EXTENSION && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;