import { useState } from "react";

export default function Uploader({ setProfilePic, togglePopup }) {
    const [fileData, setFileData] = useState();

    const onFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("file", fileData);

        console.log("formData in Uploader function: ", formData);

        fetch("/updateProfilePicture", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                const newUrl = data.profile_pic_url;
                setProfilePic(newUrl);
            });
    };

    function onChange(e) {
        console.log("e in onChange: ", e.target.files);
        setFileData(e.target.files[0]);
    }

    return (
        <>
            <div className="uploaderForm">
                <p className="closeButton" onClick={() => togglePopup()}>
                    x
                </p>
                <h3>Upload a new profile picture</h3>
                <form onSubmit={onFormSubmit}>
                    <label htmlFor="file">Choose a file ..</label>
                    <input
                        type="file"
                        name="file"
                        accept="images/*"
                        id="imageUploader"
                        onChange={onChange}
                    />
                    <button>Upload</button>
                </form>
            </div>

            <div className="greyBackground"></div>
        </>
    );
}
