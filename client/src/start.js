import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/welcome.jsx";
import App from "./components/App/app.jsx";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import rootReducer from "./Redux/root.reducer.js";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";

import { initSocket } from "./socket.js";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

fetch("/user/id")
    .then((response) => response.json())
    .then((data) => {
        // console.log("data in fetch at start.js: ", data);

        if (!data.userId) {
            ReactDOM.render(
                <BrowserRouter>
                    <Welcome />
                </BrowserRouter>,
                document.querySelector("main")
            );
        } else {

            // set up socket .. !
            initSocket(store);

            ReactDOM.render(
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>,
                </Provider>,
                document.querySelector("main")
            );
        }
    });
