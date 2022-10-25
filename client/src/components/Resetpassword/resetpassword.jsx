import React from "react";
import { Link } from "react-router-dom";

export default class Resetpassword extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "",
            view: 1,
        };

        this.submitEmailForm = this.submitEmailForm.bind(this);
        this.submitResetForm = this.submitResetForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetPasswordState = this.resetPasswordState.bind(this);
    }

    submitEmailForm(e) {
        e.preventDefault();

        const mailForResetPw = {
            email: this.state.email,
        };

        fetch("/checkemail", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(mailForResetPw),
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    message: data.message,
                });

                console.log("data: ", data);

                if (data.success == true) {
                    this.setState({
                        view: 2,
                    });
                }
            });
    }


    submitResetForm(e) {
        e.preventDefault();

        const dataForResetPw = {
            code: this.state.code,
            password: this.state.password,
            email: this.state.email,
        };

        fetch("/resetpassword", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(dataForResetPw),
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    message: data.message,
                });

                console.log("data in fetch /resetpassword: ", data);

                if (data.success == true) {
                    this.setState({
                        view: 3,
                    });
                }
            });
    }

    handleChange(event) {
        const targetName = event.target.name;

        this.setState({
            [targetName]: event.target.value,
        });
    }

    resetPasswordState() {
        switch (this.state.view) {
                        case 1:
                            return (
                                <>
                                    <h3>
                                        Please enter the Email with which you
                                        registered your account:
                                    </h3>
                                    <div className="inputFlex">
                                        <form action="" className="inputForm">
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className=""
                                                >
                                                    Your Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <span style={{ color: "red" }}>
                                                {this.state.message}
                                            </span>

                                            <div>
                                                <button
                                                    onClick={
                                                        this.submitEmailForm
                                                    }
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            );

                        case 2:
                            return (
                                //code
                                <>
                                    <h3>
                                        Please enter the varifaction code that
                                        we sent you via mail and your new
                                        password:
                                    </h3>
                                    <div className="inputFlex">
                                        <form action="" className="inputForm">
                                            <div>
                                                <label
                                                    htmlFor="code"
                                                    className=""
                                                >
                                                    Varification Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="code"
                                                    id="code"
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="password"
                                                    className=""
                                                >
                                                    Choose a new password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <span style={{ color: "red" }}>
                                                {this.state.message}
                                            </span>

                                            <div>
                                                <button
                                                    onClick={
                                                        this.submitResetForm
                                                    }
                                                >
                                                    Change
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            );
                        case 3:
                            return (
                                <>
                                    <h3>
                                        You successfully updated your password!
                                    </h3>
                                    <h4>
                                        <p>
                                            Go back to Log-in
                                            <Link to="/login"> HERE </Link>
                                        </p>
                                    </h4>
                                </>
                            );
        }
    }

    render() {
        return <div>{this.resetPasswordState()}</div>;
    }
}
