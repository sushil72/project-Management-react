import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "../../components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";

const ProjectDetail = () => {
  const handleProjectInvitation = () => {};
  return (
    <div>
      <div className="px-8 lg;flex md:flex gap-5 justify-between pb-4">
        <ScrollArea className="h-screen lg:w-[69%] pr-2 ">
          <div className="text-gray-400 pb-10 w-full ">
            <h1 className="text-lg font-semibold pb-5">
              Create Ecommerce Website Using React
            </h1>
            <div className="space-y-5 pb-10">
              <p className="w-full md:max-w-lg lg:max-w-xl">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est,
                perspiciatis.
              </p>
              <div className="flex">
                <p className="w-36">Project Lead : </p>
                <p>Zosh</p>
              </div>
              <div className="flex gap-4">
                <p className="w-36">Members : </p>
                <div className="flex items-center gap-2">
                  {[1, 1, 1, 1].map((item) => (
                    <Avatar className="cursor-pointer" key={item}>
                      <AvatarFallback>Z</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger>
                    <DialogClose>
                      <Button
                        size="sm"
                        variant="outline"
                        Onclick={handleProjectInvitation}
                      >
                        <span className="">invite</span>
                        <PlusIcon className="w-3 h-3" />
                      </Button>
                    </DialogClose>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Invite Users</DialogHeader>
                    <InviteUserForm />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex">
                <p className="w-36 ">Category :</p>
                <p>Fullstack</p>
              </div>
              <div className="flex">
                <p className="w-36 ">Status :</p>
                <Badge>in-progres</Badge>
              </div>
            </div>
            <section>
              <p className="py-5 border-b text-lg -tracking-wider">Task</p>
              <div className="lg;flex md:flex gap-3 justify-between py-5">
                <IssueList status="pending" title="Todo List" />
                <IssueList status="In-Progress" title="In-progress" />
                <IssueList status="Done" title="Done" />
              </div>
            </section>
          </div>
        </ScrollArea>
        <div className="lg:w-[30%] rounded-md sticky right-5 top-10 ">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
