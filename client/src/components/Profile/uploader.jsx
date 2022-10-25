
export default function Uploader ({ setProfilePic }) {

    // constructor(props) {
    //     super(props) {

    //     }
    // }
    
    const data = new FormData(form);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        fetch("/profile-pic")
            .then((response) => response.json())
            .then ((data) => {
                const newUrl = data.url;
                setProfilePic(newUrl);
            });
    };
    
    
    return (
        <>
         
            <form action="?" method="?" onSubmit={onFormSubmit}>
                <input type="text" />
                <button></button>
            </form>

        </>
    );

}