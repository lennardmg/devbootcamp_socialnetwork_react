import React from "react";

// three states
// defining the render/return with three possibilities

// onChange event for textfield -> update draft bio
// onClick at the button -> send JSON with new bio to server, update DB, when response is success, send draft bio via function
// to parent in order to update the state of the original bio

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBioBeingUpdated: false,
            currentBio: props.bio,
        };
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.changeCurrentBio = this.changeCurrentBio.bind(this);
        this.handleSubmitBio = this.handleSubmitBio.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {


        console.log("prevProps: ", prevProps);
        console.log("prevState: ", prevState);

        if (prevState.bio !== this.props.bio) {
            
            console.log("i happened in the componentDidUpdate");

            // this.setState({
            //     currentBio: this.props.bio,
            // });
        }

    }

    toggleEditMode() {
        this.setState({
            isBioBeingUpdated: !this.state.isBioBeingUpdated,
        });
    }

    changeCurrentBio(e) {
        this.setState({
            currentBio: e.target.value,
        });
    }

    handleSubmitBio(currentBio) {
        this.props.updateBio(currentBio);
        this.toggleEditMode();
    }

    render() {
        return (
            <>
                {this.state.isBioBeingUpdated == false &&
                    (this.props.bio == "" ? (
                        <>
                            <p>Tell us something about yourself:</p>
                            <button onClick={this.toggleEditMode}>
                                Add a Bio
                            </button>
                        </>
                    ) : (
                        <>
                            <p style={{ fontStyle: "italic" }}>
                                {this.props.bio}
                            </p>
                            <button onClick={this.toggleEditMode}>
                                Edit existing Bio
                            </button>
                        </>
                    ))}

                {this.state.isBioBeingUpdated && (
                    <>
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            value={this.state.currentBio}
                            onChange={this.changeCurrentBio}
                        ></textarea>
                        <button
                            onClick={() =>
                                this.handleSubmitBio(this.state.currentBio)
                            }
                        >
                            Submit Bio
                        </button>
                    </>
                )}
            </>
        );
    }
}
