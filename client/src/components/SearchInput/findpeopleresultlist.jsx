const FindPeopleResultList = ({ users }) => {


    return (
        <ul className="userResultTable">
            {users.map((user) => (
                <li key={user.id} className="userCard">
                    <img
                        src={user.profile_pic_url}
                        alt="Profile Pic"
                        style={{ height: "100px", width: "100px" }}
                    />
                    <p>
                        {user.first_name} {user.last_name}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default FindPeopleResultList;