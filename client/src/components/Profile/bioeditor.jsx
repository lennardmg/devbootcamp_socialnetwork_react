import React from "react";

// three states
// defining the render/return with three possibilities

// onChange event for textfield -> update draft bio
// onClick at the button -> send JSON with new bio to server, update DB, when response is success, send draft bio via function
// to parent in order to update the state of the original bio

export default class BioEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bio: props.bio,
            isBioBeingUpdated: false
        };
        this.updateBio = this.updateBio.bind(this);
    }
    
    // componentDidMount() {
        
    //     if (
    //         this.state.bio == "" ||
    //         this.state.bio == null ||
    //         this.state.bio == undefined
    //     ) {
    //         let doesBioExist = false;
    //     } 
    //     let doesBioExist = true;

    // }

    toggleEditMode() {
        
    }

    updateBio() {

        let newBio = "";

    }

    render() {
        return (
            <>

                {/* if doesBioExist == false */}

                <p> Tell us something about yourself: </p>
                <button onClick={this.toggleEditMode()}> Add a bio </button>

                {/* if doesBioExist == false && isBioBeingUpdated == true*/}

                <textarea name="" id="" cols="30" rows="10"></textarea>
                <button> Edit Bio </button>




                {/* if doesBioExist == true && isBioBeingUpdated == false*/}

                <p>{this.state.bio}</p> 
                {/* onClick still missing */}
                <button> Edit Bio </button>


                {/* if doesBioExist == true && isBioBeingUpdated == true */}

                {/* <textarea name="" id="" cols="30" rows="10" value={this.state.bio}></textarea>
                <button> Add Bio </button> */}
     
            </>
        );
    }
}
