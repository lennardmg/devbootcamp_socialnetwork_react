import { useHistory } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";


const FindPeopleResultList = ({ users }) => {
    
    const history = useHistory();

    const openProfile = (id) => {
        history.push(`/users/${id}`);
    };


    return (
        <ul className="userResultTable">
            {users.map((user) => (
                <li
                    key={user.id}
                    className="userCard"
                    onClick={() => openProfile(user.id)}
                >
                    <img
                        src={user.profile_pic_url}
                        alt="Profile Pic"
                        style={{ height: "100px", width: "100px" }}
                    />
                    <p>
                        {user.first_name} {user.last_name} &nbsp;
                        <span style={{ fontSize: "15px" }}>
                            {" "}
                            <i>
                                joined{" "}
                                {formatDistanceToNow(parseISO(user.created_at))}{" "}
                                ago
                            </i>
                        </span>
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default FindPeopleResultList;
