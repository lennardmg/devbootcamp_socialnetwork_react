import BioEditor from "./bioeditor.jsx";
import ProfilePic from "./profilepic.jsx";
import { Link } from "react-router-dom";

export default function Profile(props) {

    // console.log("props in Profile function: ", props);

    return (
        <>
            <div className="profile">
                <div className="leftProfilePart">
                    <ProfilePic
                        first_name={props.first_name}
                        last_name={props.last_name}
                        profile_pic_url={props.profile_pic_url}
                        togglePopup={props.togglePopup}
                    />
                </div>

                <div className="rightProfilePart">
                    <h2>
                        Profile of &nbsp;
                        {props.first_name} {props.last_name}
                    </h2>

                    <BioEditor bio={props.bio} updateBio={props.updateBio} />
                </div>
            </div>

            <h4>
                <Link to="/users"> Search for users </Link> &nbsp; &nbsp; &nbsp;
                <Link to="/friends"> See your list of friends </Link>
            </h4>
        </>
    );
}
