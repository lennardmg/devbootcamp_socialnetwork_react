import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/welcome.jsx";
import App from "./components/App/app.jsx";
import { BrowserRouter } from "react-router-dom";

// import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

// const root = createRoot(document.getElementById("root"));


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