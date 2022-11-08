import React from "react";
import { Link, withRouter } from "react-router-dom";
// import { BrowserRouter, Route } from "react-router-dom";

class Login extends React.Component {
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

        // the empty string needs to be checked as well, in case you enter something into the input
        // field but then delete it again => state property would have been created, but is now empty
        if (this.state.email == undefined || this.state.email == "") {
            this.setState({
                message: "*Please enter an email adress",
            });
        } else if (
            this.state.password == undefined ||
            this.state.password == ""
        ) {
            this.setState({
                message: "*Please enter a password",
            });
        } else {
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

                    if (data.success) {
                        this.props.history.push("/profile");
                        location.reload();
                    } else {
                        this.setState({
                            message: data.message,
                        });
                    }
                });
        }
    }

    handleChange(event) {
        const targetName = event.target.name;

        this.setState({
            [targetName]: event.target.value,
        });
    }

    render() {
        return (
            <>
                <h2> Please Log-in </h2>
                <div className="inputFlex">
                    <form action="" className="inputForm">
                        <span style={{ color: "red" }}>
                            {this.state.message}
                        </span>

                        <div>
                            <label htmlFor="email" className="">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
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
                                required
                                //value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <button onClick={this.submitLoginForm}>
                                Log-In
                            </button>
                        </div>

                        <p>
                            Not yet snack-istered? Sign-up &nbsp;
                            {/* <a href="#"> HERE </a> */}
                            <Link to="/">HERE</Link>
                        </p>

                        <p>
                            Forgot your password? Reset it &nbsp;
                            {/* <a href="#"> HERE </a> */}
                            <Link to="/resetpassword">HERE</Link>
                        </p>
                    </form>
                </div>
            </>
        );
    }
}

export default withRouter(Login);
