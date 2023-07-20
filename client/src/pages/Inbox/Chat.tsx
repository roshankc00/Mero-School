import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import SendIcon from '@mui/icons-material/Send';

const Chat = ({ socket, room, username }: any) => {
  const [currentMessage, setcurrentMessage] = useState("");
  const [messageList, setmessageList] = useState<any>([
   
   
  ]);

  useEffect(() => {
    socket.on("recieve_message", (data: any) => {
      setmessageList((prev: any) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage=async()=>{
    if(currentMessage!==""){
        const messageData={
            room,
            author:username,
            message:currentMessage,
            time:new Date(Date.now()).getHours()+ ':' +new Date(Date.now()).getMinutes() + ':' +new Date(Date.now()).getSeconds()

        };
        await socket.emit("send_message",messageData)
        setmessageList((prev: any) => [...prev, messageData]);
        setcurrentMessage("")
    }
  }
  
  return (
    <div >
      <div className="chat-window">
        <div className="bg-gray-800 rounded-t-lg cursor pointer">
          <p className="text-white font-blod py-2 px-3">Live chat</p>
          <div className="chat-body border border-gray-800 rounded-b-lg bg-white relative">
            <ScrollToBottom className=" m-auto overflow-y-scroll overflow-x-hidden">
              {messageList.map((messageContent: any) => {
                return (
                  <div
                    className={`message flex ${
                      username === messageContent.author
                        ? "justify-start"
                        : "justify-end"
                    }`}
                    id={username === messageContent.author ? "you" : "other"}
                    key={messageContent.time}
                  >
                    <div className="">
                      <div
                        className={`message-content min-h-40 flex items-center
                                            ${
                                              username === messageContent.author
                                                ? "bg-green-600"
                                                : "bg-blue-600"
                                            }
                                            
                                            `}
                      >
                        <p className="text-white px-2 break-words">
                          {messageContent.message}
                        </p>
                      </div>
                      <div
                        className={`message flex ${
                          username === messageContent.author
                            ? "justify-start"
                            : "justify-end"
                        } `}
                      ></div>
                      <div className=" flex">
                        <p id="time" className="inline">
                          {messageContent.time}
                        </p>
                        <p id="author" className="font-bold ml-2">
                          {messageContent.author}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
            <div className="chat-footer">
            <input type="text" 
            className="w-full h-full p-2 text-xl  border-0  outline-none cursor-pointer"
            placeholder="enter the message here"
            value={currentMessage}
            onChange={(e:any)=>{
                setcurrentMessage(e.target.value)
            }}
            onKeyUp={(e:any)=>e.key==="Enter" && sendMessage()}
        
            />
            <button onClick={sendMessage} className="w-15 h-full bg-transparent text-gray-600 text-xl cursor-pointer p-2">
                <SendIcon/>
            </button>
        </div>
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default Chat;
