// friendship yes/no
// initiator sender/receiver
// accepted yes/no


// req.param contains the ID from the OtherProfile

// useEffect 
// get Friendship, refresh when ID changes

// either 4 buttons with 4 onClick functions
// OR one button with button text in state which gets updated depending on the three variables mentioned line 1-3

// PW for fake users is always juniper

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FriendshipButton = () => {
    const [status, setStatus] = useState([]);
    const [buttontext, setButtontext] = useState("");

    const id = useParams();

    useEffect(() => {

        console.log("id: ", id);

        fetch(`/friendship/${id.id}`, {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((friendshipData) => {

                console.log(
                    "friendshipData received from server in useEffect from friendshipbutton: ",
                    friendshipData
                );

                if (friendshipData.friendshipRequestExists == false) {
                    setButtontext("Send Friend Request");

                } else {

                    if (friendshipData.accepted == false) {

                        if (friendshipData.senderIsLoggedInUser == true) {
                            setButtontext("Cancel Request");
                        } else {
                            setButtontext("Accept Request");
                        }

                    } else {
                        setButtontext("Delete from friends");
                    }

                }      
            });
    }, []);

    const checkFriendshipStatus = (recepientId) => {

        console.log("buttontext: ", buttontext);

        if (buttontext == "Send Friend Request") {

            fetch(`/friendship/${recepientId}`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => res.json())
                .then(() => {

                    console.log("Send Friend Request happened");
                    // location.reload();
                });

        } else if (buttontext == "Delete from friends" || buttontext == "Cancel Request") {

            // console.log("I am inside the second if statement!!!!!!111!!!!");
            console.log("recepientId: ", recepientId);

            fetch(`/friendship/delete/${recepientId}`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => res.json())
                .then(() => {
                    console.log("Delete happened");
                    // location.reload();
                });

        } else if (buttontext == "Accept Request") {

            fetch(`/friendship/accept/${recepientId}`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => res.json())
                .then(() => {
                    console.log("Accept happened");
                    // location.reload();
                });
        }

    };

    return (
        <>
            <button className="friendship_button" onClick={() => checkFriendshipStatus(id.id)}>{buttontext}</button>
        </>
    );
};

export default FriendshipButton;