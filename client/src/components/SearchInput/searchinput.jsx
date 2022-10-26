// whatever a function component "returns" will be rendered
// we can set as many inital states as we want

import { useState, useEffect } from "react";

const SearchInput = (props) => {

    console.log("props in SearchInput component: ", props);

    const [searchString, setSearchString] = useState(props.defaultInput);
    const [showText, setShowText] = useState(false);

    const [user, setUser] = useState({

    });


    // the same as the componentDidMount function is a class based compunent:
    // useEffect(() => {
    //     console.log("component did mount");

    //     setTimeout(() => {
    //         setUser({ name: "Lennard" });
    //     }, 2000);

    //     // normaly the useEffect would get triggered every single time, that a state changes
    //     // with an empty array it will not
    //     // when a variable from the state is passed into the array, it would only rerender 
    //     // when THIS particul variable in state changes (e.g. user in this case)

    //     // be careful NOT to create an infinite loop by always rerendering
    // }, []);


    //static:
    // const [user, setUser] = useState({
    //     name: "Lennard",
    //     isLoggedIn: true
    // });



    // const updateSearchInput = (e) => {
    //     setSearchString(e.target.value);
    // };

    return (
        <>
            <h1> Hallo, current state is: {searchString} </h1>
            <h2> something will be shown: {showText ? "text" : "no Text"}</h2>
            <p> User: {user.name}, {user.isLoggedIn? "logged in" : "not logged in"}</p>
            <button onClick={() => setUser({...user, isLoggedIn: false})}></button>

            <p> Currently logged in user: <b>{user.name || "no user"}</b></p>

            {/* Both do the same: */}
            <input type="text" onChange={(e) => setSearchString(e.target.value)}> </input>
            {/* <input type="text" onChange={updateSearchInput}> </input> */}
        </>
    );
};


// return users.filter((user) => {
//     return user.first_name
//         .toLocaleLowerCase()
//         .startsWith(searchString.toLocaleLowerCase());
// });

export default SearchInput;