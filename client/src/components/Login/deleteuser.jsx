import { useHistory } from "react-router-dom";
import { useState } from "react";

const DeleteUser = () => {
    const [popUpOpen, setPopUpOpen] = useState(false);

    let history = useHistory();


    const togglePopup = () => {
        setPopUpOpen(!popUpOpen);
    };

    const deleteCurrentUser = () => {
        fetch("/deleteuser", {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => {
                history.push("/login");
                location.reload();
            });
    };

    return (
        <>
            <button className="deleteButton" onClick={togglePopup}>
                Delete Account ❌
            </button>

            {popUpOpen && (
                <>
                    <div className="uploaderForm">
                        <p className="closeButton" onClick={togglePopup}>
                            x
                        </p>
                        <h4>
                            {" "}
                            Are you sure you want to delete your account? This
                            will delete your data permanently plus we would be
                            really sorry to see you go! :(
                        </h4>
                        <button
                            className="deleteButton"
                            onClick={deleteCurrentUser}
                        >
                            {" "}
                            Yes, I am sure{" "}
                        </button>
                    </div>
                    <div className="greyBackground"></div>
                </>
            )}
        </>
    );
};

export default DeleteUser;
