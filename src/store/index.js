import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import createSageMiddleware from 'redux-saga'
import { VisibilityFilters } from './actionType';
import * as reducers from './reducers'
// import mySaga from './saga'
import { loggedUserAction } from './actions'
// const sageMiddleware = createSageMiddleware()
const initialState = {
	loggedUser: {},//已经登录的用户信息
	// visibilityFilter: VisibilityFilters.SHOW_ALL,
	// todos: []
};
// const composeEnhancers = () => {

// }
// composeEnancers(applyMiddleware(thunk))
// console.log(reducers)
/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducers = combineReducers(reducers)
let store = createStore(appReducers, initialState, composeEnhancers(applyMiddleware(thunk)));

// sageMiddleware.run(mySaga)
store.subscribe(() =>
	console.log(store.getState())
);
export default store;