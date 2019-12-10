import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';

// 引入reducers
import storeReducer from './storeReducer.js'
import userInfo from './userinfoReducer.js'
import homelist from './homelistReducer'
import searchlist from './searchListReducer'

// 合并reducers
const reducer = combineReducers({
	storeReducer,
	userInfo,
	homelist,
	searchlist
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store