export default function messagesReducer(messages = [], action) {

    switch(action.type) {
                    case "/messages/received-many":
                        return action.payload.messages;
                    case "/messages/received-one":
                        return [...messages, action.payload.message];
                    default:
                        return messages;
    }
}

// ACTIONS:
export function chatMessagesReceived(messages) {
    return {
        type: "/messages/received-many",
        payload: { messages },
    };
}

export function chatMessageReceived(message) {
    return {
        type: "/messages/received-one",
        payload: { message },
    };
}
