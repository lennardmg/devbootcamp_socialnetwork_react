// PW for fake users is always juniper

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FriendshipButton = ({friendsid}) => {
    const [buttontext, setButtontext] = useState("");

    const id = friendsid || (useParams()).id;


    useEffect(() => {

        fetch(`/friendship/${id}`, {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((friendshipData) => {

                if (friendshipData.friendshipRequestExists == false) {
                    setButtontext("🤝 Send Friend Request");

                } else {

                    if (friendshipData.accepted == false) {

                        if (friendshipData.senderIsLoggedInUser == true) {
                            setButtontext("❌ Cancel Request");
                        } else {
                            setButtontext("💚 Accept Request");
                        }

                    } else {
                        setButtontext("❌ Delete from friends");
                    }

                }      
            });
    }, []);

    const checkFriendshipStatus = (recepientId) => {

        if (buttontext == "🤝 Send Friend Request") {
            fetch(`/friendship/${recepientId}`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => res.json())
                .then(() => {
                    console.log("Send Friend Request happened");
                    location.reload();
                });
        } else if (
            buttontext == "❌ Delete from friends" ||
            buttontext == "❌ Cancel Request"
        ) {
            fetch(`/friendship/delete/${recepientId}`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => res.json())
                .then(() => {
                    console.log("Delete happened");
                    location.reload();
                });
        } else if (buttontext == "💚 Accept Request") {
            fetch(`/friendship/accept/${recepientId}`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => res.json())
                .then(() => {
                    console.log("Accept happened");
                    location.reload();
                });
        }
    };

    return (
        <>
            <button className="friendship_button" onClick={() => checkFriendshipStatus(id)}>{buttontext}</button>
        </>
    );
};

export default FriendshipButton;