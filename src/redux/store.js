/**
 * redux核心的管理对象模块
 */
import { createStore, applyMiddleware } from "redux";
import reduces from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
/**
 * 参数1：reducer
 * 参数2：把异步中间件注册后用react-devtools暴露store
 */

export default createStore(
  reduces,
  composeWithDevTools(applyMiddleware(thunk))
);
