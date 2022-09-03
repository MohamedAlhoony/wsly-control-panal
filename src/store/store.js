import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers/rootReducer'
import reduxThunk from 'redux-thunk'
let middleware = [reduxThunk]

if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger')
    const logger = createLogger({
        collapsed: true,
    })
    middleware = [...middleware, logger]
} else {
    middleware = [...middleware]
}

let store = createStore(rootReducer, applyMiddleware(...middleware))
export default store
