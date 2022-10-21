import React from "react";
import { Link } from "react-router-dom";
// import { BrowserRouter, Route } from "react-router-dom";

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            message: "",
            wasSent: false,
        };

        this.submitLoginForm = this.submitLoginForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitLoginForm(e) {
        e.preventDefault();

        const checkUser = {
            email: this.state.email,
            password: this.state.password,
        };

        fetch("/login", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(checkUser),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("data received from server: ", data);

                this.setState({
                    message: data.message,
                });

                location.reload();

            });
    }

    handleChange(event) {

        const targetName = event.target.name;
     
        this.setState(
            {
                [targetName]: event.target.value,
            });
    }

    render() {
        return (
            <>
                <h2> Please Log-in here: </h2>

                <form action="" className="inputForm">
                    <div>
                        <label htmlFor="email" className="">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            //value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            //value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    <span style={{ color: "red" }}>{this.state.message}</span>

                    <div>
                        <button onClick={this.submitLoginForm}>Log-In</button>
                    </div>

                    <p>
                        Not yet snack-istered? Sign-up
                        {/* <a href="#"> HERE </a> */}
                        <Link to="/">HERE</Link>
                    </p>

                    <p>
                        Forgot your password? Reset it
                        {/* <a href="#"> HERE </a> */}
                        <Link to="/resetpassword">HERE</Link>
                    </p>
                </form>
            </>
        );
    }
}
