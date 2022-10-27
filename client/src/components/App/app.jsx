import { Component } from "react";
import { Route } from "react-router-dom";
import Profile from "../Profile/profile.jsx";
import ProfilePic from "../Profile/profilepic.jsx";
import Logo from "../App/logo.jsx";
// import Uploader from "../Profile/uploader.jsx";
import FindPeople from "../SearchInput/findpeople.jsx";
import LogOut from "../Login/logout.jsx";
import OtherProfile from "../OtherProfile/otherprofile.jsx";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false,
        };
        this.updateBio = this.updateBio.bind(this);
    }

    // setProfilePic(url) {
    //     //update the state with new profile pic url!

    //     // close the popup:
    //     this.togglePopup();
    // }

    componentDidMount() {
        fetch("/getInfoAboutSignedInUser", {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(
                //     "data.user in fetch componentDidMount: ",
                //     data.user
                // );

                if (data.success == true) {
                    this.setState(data.user, () => {
                        // console.log(
                        //     "second this.state in componentDidMount: ",
                        //     this.state
                        // );
                    });
                }
            });
    }

    togglePopup() {
        this.setState({
            // set it to the opposite of its current value!
            openPopup: !this.state.openPopup,
        });
    }

    updateBio() {
        // somehow needs to update the bio (maybe fetch POST to server to add to DB?)
    }

    render() {
        return (
            <>
                <div className="appHeader">
                    <div className="leftHeaderFlex">
                        <Logo />
                        <h1>Welcome to Snack-Lovers!</h1>
                    </div>
                    {/* in ProfilePic we trigger the togglePopup through a click event */}
                    <div className="rightHeaderFlex">
                        <LogOut />
                        <ProfilePic
                            profile_pic_url={this.state.profile_pic_url}
                            togglePopup={this.togglePopup}
                            first_name={this.state.first_name}
                            last_name={this.state.last_name}
                        />
                    </div>
                    {/* {this.state.openPopup && (
                        <Uploader
                            setProfilePic={this.setProfilePic}
                            visible={this.state.openPopup}
                        />
                    )} */}
                </div>

                <hr />

                <Route path="/profile">
                    <Profile
                        profile_pic_url={this.state.profile_pic_url}
                        togglePopup={this.togglePopup}
                        first_name={this.state.first_name}
                        last_name={this.state.last_name}
                        bio={this.state.bio}
                        updateBio={this.updateBio}
                    />
                </Route>

                <Route exact path="/users">
                    <FindPeople />
                </Route>

                <Route path="/users/:id">
                    <OtherProfile />
                </Route>

                <hr />
            </>
        );
    }
}
