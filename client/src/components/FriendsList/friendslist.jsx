import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FriendshipButton from "../FriendshipButton/friendshipbutton.jsx";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const FriendsList = () => {
    const [pendingFriends, setPendingFriends] = useState([]);
    const [acceptedFriends, setAcceptedFriends] = useState([]);

    const history = useHistory();

    const openProfile = (id) => {
        history.push(`/users/${id}`);
    };

    useEffect(() => {
        fetch("/showFriends", {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((allFriends) => {

                // console.log("allFriends in useEffect of FriendsList: ", allFriends.friends);
        
                function filterFriends (allFriends) {

                    let pendingFriends = allFriends.friends.filter(friend => friend.accepted == false);
                    let acceptedFriends = allFriends.friends.filter(friend => friend.accepted == true); 

                    // console.log("pendingFriends: ", pendingFriends);
                    // console.log("acceptedFriends: ", acceptedFriends);

                    setPendingFriends(pendingFriends);
                    setAcceptedFriends(acceptedFriends);
                }

                filterFriends(allFriends);
            });
    }, []);

    return (
        <>
            <div>
                <h2> People waiting for your acceptance: </h2>
                <ul className="userResultTable">
                    {pendingFriends.map((pendingFriend) => (
                        <li key={pendingFriend.id} className="userCard">
                            <img
                                src={pendingFriend.profile_pic_url}
                                alt="Profile Pic"
                                style={{ height: "100px", width: "100px" }}
                                onClick={() => openProfile(pendingFriend.id)}
                            />
                            <p>
                                {pendingFriend.first_name}{" "}
                                {pendingFriend.last_name}
                                {pendingFriend.accepted}
                            </p>
                            <FriendshipButton friendsid={pendingFriend.id} />
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2> Your friends: </h2>
                <ul className="userResultTable">
                    {acceptedFriends.map((acceptedFriend) => (
                        <li key={acceptedFriend.id} className="userCard">
                            <img
                                src={acceptedFriend.profile_pic_url}
                                alt="Profile Pic"
                                style={{ height: "100px", width: "100px" }}
                                onClick={() => openProfile(acceptedFriend.id)}
                            />
                            <p>
                                {acceptedFriend.first_name}{" "}
                                {acceptedFriend.last_name}
                                {acceptedFriend.accepted}
                            </p>
                            <FriendshipButton friendsid={acceptedFriend.id} />
                        </li>
                    ))}
                </ul>
            </div>

            <h4>
                <Link to="/users"> Search for users </Link> &nbsp; &nbsp; &nbsp;
                <Link to="/profile"> Your profile </Link>
            </h4>
        </>
    );

};

export default FriendsList;
