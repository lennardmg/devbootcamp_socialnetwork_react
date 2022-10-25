import React from "react";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {

    constructor() {
        super();
        this.state = {
            message: "",
            wasSent: false,

        };

        this.submitForm = this.submitForm.bind(this);
    }


    submitForm(e) {

        e.preventDefault();

        const form = document.querySelector("form");

        const firstname = form.querySelector("#firstname").value;
        const lastname = form.querySelector("#lastname").value;
        const email = form.querySelector("#email").value;
        const password = form.querySelector("#password").value;

        this.setState({
            message: "Done!",
            wasSent: true,
        });

        fetch("/registration", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password
            }),
        })
            .then((res) => res.json())
            .then((data) => {

                // check for userId, if so: location reload, with logo this time
                // if no, this.setState error message
                console.log("data received from server: ", data);

                location.reload();

            });
    }

    
    render() {
        return (
            <>
                <h2>Please snack-ister here:</h2>

                <div className="inputFlex">
                    <form action="" className="inputForm">
                        <div>
                            <label htmlFor="firstname" className="">
                                First Name
                            </label>
                            <input type="text" name="firstname" id="firstname" />
                        </div>

                        <div>
                            <label htmlFor="lastname" className="">
                                Last Name
                            </label>
                            <input type="text" name="lastname" id="lastname" />
                        </div>

                        <div>
                            <label htmlFor="email" className="">
                                Email
                            </label>
                            <input type="email" name="email" id="email" />
                        </div>

                        <div>
                            <label htmlFor="password" className="">
                                Password
                            </label>
                            <input type="password" name="password" id="password" />
                        </div>

                        <div>
                            <button onClick={this.submitForm}>Snack-ister</button>
                        </div>

                        <p>
                            Already signed-in? Log-in &nbsp;
                            {/* <a href="#"> HERE </a> */}
                            <Link to="/login">HERE </Link>
                        </p>
                    </form>
                </div>

                <span style={{color: "red"}}>{this.state.message}</span>
            </>
        );
    }
}
