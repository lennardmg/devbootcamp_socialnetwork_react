import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/welcome.jsx";


// fetch checking for data.userId, if yes: render LOGO
// if no: render WELCOME
fetch("/user/id")
    .then((response) => response.json())
    .then((data) => {

        console.log("data in fetch at start.js: ", data);

        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <img
                    src="https://www.giftbasketbounty.com/files/1327644/uploaded/Snackdown_819332.jpg"
                    alt="Snack Lovers Logo"
                />,
                document.querySelector("main")
            );
        }
    });