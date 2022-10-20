import React from "react";
import Registration from "../Registration/registration.jsx";
// import "../Welcome/welcome.css";



export default class Welcome extends React.Component {

    render() {
        return (
            <>
                <h1> 🍭 Welcome to Snack Lovers! 🥜</h1>
                <h2>
                    <img
                        src="https://www.giftbasketbounty.com/files/1327644/uploaded/Snackdown_819332.jpg"
                        alt="Snack Lovers Logo"
                        style={{height: "150px", width: "150px"}}
                    />
                </h2>
                <h2> Do you love snacks as much as we do? </h2>
                <h2> If so, you have come to the right place!</h2>
                <h2> Register and join our community of fellow snack lovers ⤵️ </h2>
                <hr />
                <Registration />
            </>
        );
    }

}