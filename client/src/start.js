import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/welcome.jsx";
import App from "./components/App/app.jsx";

fetch("/user/id")
    .then((response) => response.json())
    .then((data) => {

        // console.log("data in fetch at start.js: ", data);

        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<App />, document.querySelector("main"));
        }
    });