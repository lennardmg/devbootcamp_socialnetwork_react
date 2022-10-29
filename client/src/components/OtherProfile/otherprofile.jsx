// useParams
// useHistory need to be user
// in useEffect: this component needs to fetch data [] with ID, whenever route changes
// on server side: check if ID equals req.session.id, if so, redirect to
// main page (self = true) in response JSON or sth but ALSO, when ID doesnt exist
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import FriendshipButton from "../FriendshipButton/friendshipbutton.jsx";

const OtherProfile = () => {

    let history = useHistory();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [profile_pic_url, setProfilePicUrl] = useState("");

    const id = useParams();

    useEffect(() => {
        console.log("useParams: ", id);

        fetch(`/user/${id.id}`, {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.success == false || data.userData.length == 0) {
                    
                    history.replace("/profile");
                
                } else {
                    setFirstName(data.userData[0].first_name);
                    setLastName(data.userData[0].last_name);
                    setEmail(data.userData[0].email);
                    setBio(data.userData[0].bio);
                    setProfilePicUrl(data.userData[0].profile_pic_url);
                }
            });
            
    }, []);

    return (
        <>
            {first_name == "" && <h2> loading ... </h2>}

            {!(first_name == "") && (
                <>
                    <div className="profile">
                        <h2>
                            Profile of {first_name} {last_name}
                        </h2>
                        <h3>{email}</h3>
                        <div className="profileFlex">
                            <img
                                src={profile_pic_url}
                                alt="Profile Pic"
                                style={{ height: "150px", width: "150px" }}
                            />
                            <p>{bio}</p>
                        </div>

                        <FriendshipButton />
                    </div>
                    <h4>
                        <Link to="/users"> Back to user search </Link>
                    </h4>
                </>
            )}

        </>
    );
};

export default OtherProfile;
