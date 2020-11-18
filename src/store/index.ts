import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";

const middlewares = composeWithDevTools(applyMiddleware(thunk));

export default createStore(reducers, middlewares);
