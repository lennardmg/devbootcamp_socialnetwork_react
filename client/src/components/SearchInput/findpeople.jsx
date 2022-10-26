import FindPeopleResultList from "./findpeopleresultlist.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FindPeople = () => {
    const [findUser, setFindUser] = useState("");
    const [users, setUsers] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        console.log("findpeople component did mount");

        fetch("/getUsersWhoRecentlyJoined", {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data received from server in useEffect from findpeople: ", data);

                setUsers(data.latestUsers);

            });

    }, []);

    const getUsers = (searchString) => {
        if (searchString == "") {
            return users;
        }

        setIsSearching(true);

        fetch(`/searchUsers/?q=${searchString}`, {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(
                    "data received from server in getUsers from findpeople: ",
                    data
                );

                setUsers(data.foundUsers);

            });


    };

    return (
        <>
            <h1>Find People</h1>
            {isSearching == false && (
                <h2>Check out which new Snack-Lovers recently joined:</h2>
            )}

            {isSearching == true && (
                <>
                    <h3>
                        Find other Snack-Lovers here <br />
                        <input
                            type="text"
                            placeholder="Enter name"
                            onChange={(e) => {
                                getUsers(e.target.value);
                            }}
                        ></input>
                    </h3>
                    <br />
                </>
            )}

            <br />

            {users.length == 0 && (
                <span style={{ fontStyle: "italic;" }}> No user found </span>
            )}
            {users.length > 0 && <FindPeopleResultList users={users} />}

            {isSearching == false && (
                <>
                    <h3>
                        Are you looking for someone in particular? <br />
                        <input
                            type="text"
                            placeholder="Enter name"
                            onChange={(e) => {
                                getUsers(e.target.value);
                            }}
                        ></input>
                    </h3>
                    <br />
                </>
            )}

            <h4>
                <Link to="/"> Your profile </Link>
            </h4>
        </>
    );
};

export default FindPeople;