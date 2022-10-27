import { useHistory } from "react-router-dom";

const LogOut = () => {
    let history = useHistory();

    const logOut = () => {
        fetch("/logout", {
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
            <button 
                className="logOutButton"
                onClick={logOut}
            >Log Out ❌</button>
        </>
    );
};

export default LogOut;
