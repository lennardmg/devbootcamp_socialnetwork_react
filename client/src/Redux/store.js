import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";

// does it need to be reducer or friendshipReducer?
import friendshipReducer from "./friendships.js";


const store = createStore(
    friendshipReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

const rootReducer = combineReducers({
    friendships: friendshipReducer,
});

export default store;
