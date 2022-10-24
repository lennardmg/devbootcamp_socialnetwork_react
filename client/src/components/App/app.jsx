import { Component } from "react";


export default class Resetpassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePicUrl: "",
            openPopup: false,
        };
    }

    setProfilePic(url) {
        //update the state with new profile pic url!

        // close the popup:
        this.togglePopup();
    }


    componentDidMount() {
        // fetch user info from server (new route)
        // add it to the state
    }


    togglePopup() {
        this.setState({
            // set it to the opposite of its current value!
            openPopup: !this.state.openPopup,
        });
    }

    render() {
        return (
            <>

                <div>
                    <Logo />

                    {/* in ProfilePic we trigger the togglePopup through a click event */}
                    <ProfilePic 
                        profilePicUrl={this.state.profilePicUrl}
                        togglePopup={this.togglePopup}

                    />

                    {this.state.openPopup && <Uploader setProfilePic={this.setProfilePic}/>}
                </div>

            </>
        );
    }
}
