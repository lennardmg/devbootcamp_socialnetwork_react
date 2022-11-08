import { Component } from "react";
import { Route } from "react-router-dom";
import Profile from "../Profile/profile.jsx";
import ProfilePic from "../Profile/profilepic.jsx";
import Logo from "../App/logo.jsx";
import Uploader from "../Profile/uploader.jsx";
import FindPeople from "../SearchInput/findpeople.jsx";
import LogOut from "../Login/logout.jsx";
import OtherProfile from "../OtherProfile/otherprofile.jsx";
import FriendsList from "../FriendsList/friendslist.jsx";
import { Link } from "react-router-dom";
import Chat from "../Chat/chat.jsx";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false,
        };
        this.updateBio = this.updateBio.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.setProfilePic = this.setProfilePic.bind(this);
    }

    setProfilePic(url) {

        this.setState({
            profile_pic_url: url,
        });

        this.togglePopup();
    }

    componentDidMount() {
        fetch("/getInfoAboutSignedInUser", {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.success == true) {
                    !data.user.bio && (data.user.bio = "");

                    this.setState(data.user);
                }
            });
    }

    togglePopup() {
        this.setState({
            openPopup: !this.state.openPopup,
        });
    }

    updateBio(newBio) {

        fetch("/updateBio", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                bio: newBio
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    this.setState({
                        bio: newBio,
                    });
                }
            });
    }

    render() {
        return (
            <>
                <div className="appHeader">
                    <div className="leftHeaderFlex">
                        <Logo />
                        <h1>Welcome to Snack-Lovers! 🍩</h1>
                    </div>

                    <div className="linkHeader">
                        <Link to="/profile"> Your profile </Link>
                        <Link to="/friends"> See your list of friends </Link>
                        <Link to="/users"> Search for users </Link>
                        <Link to="/chat"> Chat with other users </Link>
                    </div>

                    <div className="rightHeaderFlex">
                        <LogOut />
                        <div
                            style={{
                                height: "100px",
                                width: "100px",
                                marginRight: "20px",
                            }}
                        >
                            <ProfilePic
                                profile_pic_url={this.state.profile_pic_url}
                                togglePopup={this.togglePopup}
                                first_name={this.state.first_name}
                                last_name={this.state.last_name}
                            />
                        </div>
                    </div>
                    {this.state.openPopup && (
                        <Uploader
                            setProfilePic={this.setProfilePic}
                            visible={this.state.openPopup}
                            togglePopup={this.togglePopup}
                        />
                    )}
                </div>

                <hr />
                <div className="mainBody">
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

                    <Route path="/friends">
                        <FriendsList />
                    </Route>

                    <Route path="/chat">
                        <Chat />
                    </Route>
                </div>

                <hr />
            </>
        );
    }
}
