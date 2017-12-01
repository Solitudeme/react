import {createStore,combineReducers} from "redux";//combineReducers:把多个大的reducer，合成一个大的Reducer
import thunk from "redux-thunk";//处理异步action
import {applyMiddleware} from "redux";

import {reducer,comingsoonreducer,getseachlistreduce} from "../Reducer";

const store = createStore(combineReducers({
	title:reducer,
	list:comingsoonreducer,
	seach:getseachlistreduce
}),applyMiddleware(thunk));

export default store;
 

