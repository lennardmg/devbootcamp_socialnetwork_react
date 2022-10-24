// a function component needs to return what its going to show

export default function ProfilePic ({ profilePicUrl, togglePopup }) {

    profilePicUrl = profilePicUrl || "default profile Pic URL ... (choose a nice one)"

    return (
        <>
            <button onClick={togglePopup}>
                <img src="{profilePicUrl}" alt="..." />
            </button>
        </>
    ),

};