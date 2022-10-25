// a function component needs to return what its going to show

export default function ProfilePic ({ profilePicUrl, togglePopup }) {

    profilePicUrl = profilePicUrl || "https://th.bing.com/th/id/OIP.1LRUIB2OXVePxD5hQm4fqwHaHa?pid=ImgDet&rs=1";

    return (
        <>
            <button onClick={togglePopup}>
                
                <img
                    src={profilePicUrl}
                    alt="Profile Pic"
                    style={{ height: "50px", width: "50px" }}
                />
               
            </button>
        </>
    );

}