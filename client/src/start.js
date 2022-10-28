import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/welcome.jsx";
import App from "./components/App/app.jsx";
import { BrowserRouter } from "react-router-dom";

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
                <BrowserRouter>
                
                    <App />
                </BrowserRouter>,
                document.querySelector("main")
            );
        }
    });