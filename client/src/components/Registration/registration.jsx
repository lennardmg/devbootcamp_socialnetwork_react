import React from "react";
import { Link, withRouter } from "react-router-dom";

class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "",
            wasSent: false,
        };

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const targetName = event.target.name;

        this.setState({
            [targetName]: event.target.value,
        });
    }

    submitForm(e) {
        e.preventDefault();

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
        } else if (
            this.state.firstname == undefined ||
            this.state.firstname == ""
        ) {
            this.setState({
                message: "*Please enter a first name",
            });
        } else if (
            this.state.lastname == undefined ||
            this.state.lastname == ""
        ) {
            this.setState({
                message: "*Please enter a last name",
            });
        } else {

            const newUser = {
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
            };

            fetch("/registration", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
                .then((res) => res.json())
                .then(() => {

                    // console.log("data received from server: ", data);

                    this.props.history.push("/profile");
                    location.reload();
                });
        }
    }

    render() {
        return (
            <>
                <h2>Please snack-ister here:</h2>

                <div className="inputFlex">
                    <form action="" className="inputForm">

                        <span style={{ color: "red" }}>{this.state.message}</span>

                        <div>
                            <label htmlFor="firstname" className="">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="lastname" className="">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
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
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <button onClick={this.submitForm}>
                                Snack-ister
                            </button>
                        </div>

                        <p>
                            Already signed-in? Log-in &nbsp;
                            {/* <a href="#"> HERE </a> */}
                            <Link to="/login">HERE </Link>
                        </p>
                    </form>
                </div>
            </>
        );
    }
}

export default withRouter(Registration);
