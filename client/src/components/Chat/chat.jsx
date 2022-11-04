import { socket } from "../../socket.js";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

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
            // cleat input field
            e.target.value = "";
        }
    };

    // const onChatChange = (e) => {
    
    //     e.preventDefault();
    // };


    return (
        <>
            <div>
                
                <div ref={chatContainer}>
                    <ul className="chat">
                        {messages.map((message) => (
                            <li key={message.messagesid} className="chatMessage">
                                <img
                                    src={message.profile_pic_url}
                                    alt="Profile Pic"
                                    style={{ height: "100px", width: "100px" }}
                                />
                                <p>
                                    {message.first_name}
                                    {message.last_name}
                                    said at
                                    {message.created_at}:
                                </p>
                                <p>{message.message}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    onKeyDown={(e) => onChatKeyDown(e)}
                    // onChange={(e) => onChatChange(e)}
                    placeholder="Type here"
                ></textarea>
            </div>
        </>
    );
}