import { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";

const socket = io("http://localhost:9000");

const InboxMessage = () => {
  const [userName, setuserName] = useState("");
  const [showChat, setshowChat] = useState(false);
  const [room, setroom] = useState("");

  const joinRoom=()=>{
    if(userName!=="" && room !==''){
        socket.emit("join_room",room)
        setshowChat(true)

    }
  }
  return (
    <div>
      {!showChat ? (
        <>
          <div className="flex flex-col items-center">

          <h3 className="text-2xl mb-4 ">Join a Chat </h3>
          <input
            type="text"
            placeholder="Enter a Name"
            className="w-52 h-10 border-2 first-letter:border-green-400 rounded-sm text-ellipsis mb-2"
            value={userName}
            onChange={(e)=>setuserName(e.target.value)}
            />
          <input
            type="text"
            placeholder="Enter a room id"
            className="w-52 h-10 border-2 first-letter:border-green-400 rounded-sm text-ellipsis mb-2"
            onChange={(e)=>setroom(e.target.value)}
            />
            <button onClick={joinRoom} className="bg-blue-600 text-white rounded-sm p-2"> Join a Room</button>
            </div>
        </>
      ) : (
        <>
        <Chat socket={socket} username={userName} room={room}/>
        </>
      )}
    </div>
  );
};

export default InboxMessage;
