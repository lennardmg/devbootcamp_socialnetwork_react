import { io } from "socket.io-client";
import { chatMessagesReceived } from "./Redux/messages.slice";
import { chatMessageReceived } from "./Redux/messages.slice";


export let socket;

export const initSocket = (store) => {

    if (!socket) {

        socket = io.connect();
    
        socket.on("chatMessages", (data) => {
            console.log("I received the latest messages! ", data);
            // add the messages to the redux store
            store.dispatch(chatMessagesReceived(data));
        });
    
        socket.on("chatMessage", (data) => {
            // add the message to the redux store#
            console.log("data in socket chatMessage: ", data);
            store.dispatch(chatMessageReceived(data));
        });
    }
};