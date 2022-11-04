import { useEffect } from "react";
import FriendshipButton from "../FriendshipButton/friendshipbutton.jsx";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFriendsAction } from "../../Redux/friends.slice.js";

const FriendsList = () => {
    // const [pendingFriends, setPendingFriends] = useState([]);
    // const [acceptedFriends, setAcceptedFriends] = useState([]);

    const history = useHistory();

    const openProfile = (id) => {
        history.push(`/users/${id}`);
    };

    /////// REDUX PART //////

    const dispatch = useDispatch();

    // useSelector is used to retrieve updated data from the global redux store
    const pendingFriends = useSelector((state) => {
        return state.friends?.filter((friend) => !friend.accepted) || [];
    });
    const acceptedFriends = useSelector((state) => {
        return state.friends?.filter((friend) => friend.accepted) || [];
    });

    ///////////////////////////

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

                // dispatch received friends

                dispatch(setFriendsAction(allFriends.friends));

                // function filterFriends(allFriends) {
                //     let pendingFriends = allFriends.friends.filter(
                //         (friend) => friend.accepted == false
                //     );
                //     let acceptedFriends = allFriends.friends.filter(
                //         (friend) => friend.accepted == true
                //     );

                //     // console.log("pendingFriends: ", pendingFriends);
                //     // console.log("acceptedFriends: ", acceptedFriends);

                //     setPendingFriends(pendingFriends);
                //     setAcceptedFriends(acceptedFriends);
                // }

                // filterFriends(allFriends);
            });
    }, []);

    return (
        <>
            <div>
                <br />
                <h2> People waiting for your acceptance: </h2>

                {pendingFriends.length == 0 && (
                    <>
                        <br />
                        <h4 style={{ fontStyle: "italic" }}>
                            {" "}
                            Nothing to display here{" "}
                        </h4>
                        <br />
                        <br />
                        <br />
                    </>
                )}

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

                {acceptedFriends.length == 0 && (
                    <>
                        <br />
                        <h4 style={{ fontStyle: "italic" }}>
                            No friends to display. Reach out to some people!
                        </h4>
                        <br />
                        <br />
                        <br />
                    </>
                )}

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
        </>
    );
};

export default FriendsList;
