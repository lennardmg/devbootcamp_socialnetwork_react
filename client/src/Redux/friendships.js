// client/src/colors.js

// the initial state
// contains usually all the default/empty values
const initialState = {
    friendships: [],
};

// redux action
// it takes some params
// returns an object with 2 entries: type (string), payload (object)
export function receiveFriendships(friendships) {
    return {
        type: "friendships/receive",
        payload: { friendships },
    };
}

// the reducer is a function
// takes the old state and the incoming action
// and returns the new state
export default function reducer(state = initialState, action) {
    // check if the incoming action interests this reducer
    if (action.type === "friendships/receive") {
        return {
            ...state, // keep the existing state intact
            receiveFriendships: action.payload.friendships,
        };
    }
    // default case - no action intercepted
    return state;
}
