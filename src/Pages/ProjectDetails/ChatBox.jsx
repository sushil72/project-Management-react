import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";
const ChatBox = () => {
  const [message, setmessage] = useState("");
  const handleMessagechange = (e) => {
    setmessage(e.target.value);
  };
  const handleSendMessage = () => {
    console.log("message : ", message);
  };
  return (
    <div className="sticky border ">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
      </div>
      <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
        {[1, 1, 1, 1].map((item, index) =>
          index % 2 == 0 ? (
            <div className="flex gap-2 mb-2 justify-start" key={item}>
              <Avatar className="relative -top-5">
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-tr-2xl rounded-tl-none rounded-lg">
                <p>Sushil</p>
                <p className="text-gray-300">how are you</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 mb-2 justify-end" key={item}>
              <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-lg rounded-tr-none">
                <p>Sushil</p>
                <p className="text-gray-300">i am fine </p>
              </div>
              <Avatar className="relative -top-5">
                <AvatarFallback>S</AvatarFallback>
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
