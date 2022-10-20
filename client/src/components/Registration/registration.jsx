import React from "react";

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
        const email = form.querySelector("#lastname").value;
        const password = form.querySelector("#lastname").value;

        this.setState({
            message: "Done!",
            wasSent: true,
        });
        //grab values
        // fetch request server
        // send JSON data


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

                console.log("data received from server: ", data);

                location.reload();
    
            });
    }

    
    render() {
        return (
            <>
                <h2> Please snack-ister here: </h2>

                <form action="" className="registrationForm">
                    <div>
                        <label htmlFor="firstname" className=""> First Name </label>
                        <input type="text" name="firstname" id="firstname" />
                    </div>

                    <div>
                        <label htmlFor="lastname" className=""> Last Name </label>
                        <input type="text" name="lastname" id="lastname" />
                    </div>

                    <div>
                        <label htmlFor="email" className=""> Email </label>
                        <input type="email" name="email" id="email" />
                    </div>

                    <div>
                        <label htmlFor="password" className=""> Password </label>
                        <input type="password" name="password" id="password" />
                    </div>

                    <div>
                        <button onClick={this.submitForm}> Snack-ister </button>
                    </div>

                </form>

                <span> {this.state.message} </span>
                <span> {this.state.wasSent} </span>
            </>
        );
    }
}
