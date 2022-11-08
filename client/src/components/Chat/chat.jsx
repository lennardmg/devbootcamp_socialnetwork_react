import { socket } from "../../socket.js";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { parseISO, formatDistanceToNow } from 'date-fns';


export default function Chat() {

    const messages = useSelector((state) => state.messages);
    const chatContainer = useRef();

    useEffect(() => {

        chatContainer.current.scrollTop =
        chatContainer.current.scrollHeight -
        chatContainer.current.clientHeight;
        
    }, [messages]);

    const onChatKeyDown = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            // no need to "fetch"! Just emit via the socket.
            socket.emit("chatMessage", e.target.value);
            // clear input field
            e.target.value = "";
        }
    };

    return (
        <>
            <div className="chatContainer">
                <div ref={chatContainer}>
                    <ul className="chat">
                        {messages.map((message) => (
                            <li
                                key={message.messagesid}
                                className="chatMessage"
                            >
                                <img
                                    src={message.profile_pic_url}
                                    alt="Profile Pic"
                                    style={{ height: "70px", width: "70px" }}
                                />
                                <p>
                                    <strong>{message.first_name}</strong> &nbsp;
                                    <strong>{message.last_name}</strong> &nbsp;
                                    said &nbsp;
                                    <i>
                                        {formatDistanceToNow(
                                            parseISO(message.created_at)
                                        )}{" "}
                                        ago
                                    </i>
                                    : <br /> <br />
                                    <span className="chatText">
                                        {message.message}
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="chatTextarea">
                <textarea
                    name=""
                    id=""
                    cols="40"
                    rows="10"
                    onKeyDown={(e) => onChatKeyDown(e)}
                    // onChange={(e) => onChatChange(e)}
                    placeholder="Type here"
                ></textarea>
                🍫
            </div>
        </>
    );
}