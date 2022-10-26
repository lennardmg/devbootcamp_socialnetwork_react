import BioEditor from "./bioeditor.jsx";
import ProfilePic from "./profilepic.jsx";
import { Link } from "react-router-dom";

export default function Profile(props) {

    console.log("props in Profile function: ", props);

    return (
        <>
            <div className="profile">
                <ProfilePic
                    first_name={props.first_name}
                    last_name={props.last_name}
                    profile_pic_url={props.profile_pic_url}
                    togglePopup={props.togglePopup}
                />

                <h2>
                    Profile of &nbsp;
                    {props.first_name} &nbsp; {props.last_name}
                </h2>

                <BioEditor bio={props.bio} updateBio={props.updateBio} />
            </div>
            <h4>
                <Link to="/users"> Search for users </Link>
            </h4>
        </>
    );
}
