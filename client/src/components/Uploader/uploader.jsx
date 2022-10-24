
export default function Uploader ({ setProfilePic }) {

    
    const data = new FormData(form);

    const onFormSubmit = (e) => {
        fetch(...)
        .then((response) => response.json())
        .then ((date) => {
            const newUrl = data.url;
            setProfilePic(newUrl);
        })
    }
    
    
    return (
        <>
         
            <form action="?" method="?" onSubmit={onFormSubmit}>
                <input type="text" />
                <button></button>
            </form>

        </>
    ),

}