import BioEditor from "./bioeditor.jsx";
import ProfilePic from "./profilepic.jsx";
import DeleteUser from "../Login/deleteuser.jsx";

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
                    <DeleteUser />
                </div>

                <div className="rightProfilePart">
                    <h2>
                        Profile of &nbsp;
                        {props.first_name} {props.last_name}
                    </h2>

                    <BioEditor bio={props.bio} updateBio={props.updateBio} />
                </div>
            </div>
        </>
    );
}
