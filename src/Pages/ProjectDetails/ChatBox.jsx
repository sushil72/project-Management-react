import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "@/Redux/chat/Action";
import { useParams } from "react-router-dom";
const ChatBox = () => {
  const [message, setmessage] = useState("");

  const handleMessagechange = (e) => {
    setmessage(e.target.value);
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  const { auth, chat } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, []);

  useEffect(() => {
    dispatch(fetchChatMessages(chat?.chat?.id));
  }, [chat?.chat]);

  const handleSendMessage = () => {
    dispatch(
      sendMessage({
        senderId: auth.user?.id,
        projectId: id,
        content: message,
      })
    );
    setmessage("");
  };

  return (
    <div className="sticky border ">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
      </div>
      <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
        {chat.messages[0]?.map((item, index) =>
          item?.sender?.id !== auth.user.id ? (
            <div key={index} className="flex gap-2 mb-2 justify-start">
              <Avatar className="relative -top-5">
                <AvatarFallback>{item?.sender?.fullname[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-tr-2xl rounded-tl-none rounded-lg">
                <p>{item?.sender?.fullname}</p>
                <p className="text-gray-300">{item?.content}</p>
              </div>
            </div>
          ) : (
            <div key={index} className="flex gap-2 mb-2 justify-end">
              <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-lg rounded-tr-none">
                <p>{item?.sender?.fullname}</p>
                <p className="text-gray-300">{item.content} </p>
              </div>
              <Avatar className="relative -top-5">
                <AvatarFallback>{item.sender?.fullname[0]}</AvatarFallback>
              </Avatar>
            </div>
          )
        )}
      </ScrollArea>

      <div className="relative  p-0">
        <Input
          placeholder="type message..."
          className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
          value={message}
          onChange={handleMessagechange}
        />
        <Button
          onClick={handleSendMessage}
          className="absolute right-2 top-3 rounded-full"
          size="icon"
          variant="ghost"
        >
          <PaperPlaneIcon />
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
