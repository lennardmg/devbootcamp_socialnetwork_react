import React from "react";

export default class Registration extends React.Component {


    constructor() {
        super();
        this.state = {
            message: "no message",
            wasSent: false,
        };

        this.submitForm = this.submitForm.bind(this);
    }


    submitForm(e) {

        e.preventDefault();

        console.log("e in handleClick: ", e);
        alert("CLICK HAS HAPPENED!");

        this.setState({
            message: "Done!",
            wasSent: true,
        });
        //grab values
        // fetch request server
        // send JSON data
    }

    
    render() {
        return (
            <>
                <h1> This is my registration component: </h1>
                <h2> hihihihihihi </h2>

                <form action="">
                    <label htmlFor="email" className=""></label>
                    <input type="email" name="email" id="" />

                    <button onClick={this.submitForm}> register </button>
                </form>

                <span> {this.state.message} </span>
                <span> {this.state.wasSent} </span>
            </>
        );
    }
}
