
export default function ProfilePic ({ profile_pic_url, togglePopup }) {

    profile_pic_url = profile_pic_url || "https://th.bing.com/th/id/OIP.1LRUIB2OXVePxD5hQm4fqwHaHa?pid=ImgDet&rs=1";

    return (
        <>
            <button onClick={() => togglePopup()}>

                <img
                    src={profile_pic_url}
                    alt="Profile Pic"
                    style={{ height: "100%", width: "100%", minHeight: "65px", objectFit: "cover" }}
                />

            </button>
        </>
    );

}