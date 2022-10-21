import React from "react";

export default class Resetpassword extends React.Component {

    constructor() {
        super();
        this.state = {
            message: "",
            wasSent: false,
            emailExists: false,
        };

        this.submitResetForm = this.submitResetForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitResetForm(e) {
        e.preventDefault();

        const mailForResetPw = {
            email: this.state.email,
        };

        fetch("/resetpassword", {
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
            });
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
          
                <h3>Please enter the Email with which you registered your
                    account:</h3>

                <form action="" className="inputForm">
                    <div>
                        <label htmlFor="email" className="">
                            Your Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={this.handleChange}
                        />
                    </div>

                    <span style={{ color: "red" }}>{this.state.message}</span>

                    <div>
                        <button onClick={this.submitResetForm}>Log-In</button>
                    </div>
                </form>
     

                {/* {(argument && (html template)) || (argument2 && (html template))}; */}
            </>
        );
    }
}
