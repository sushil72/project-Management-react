import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useParams } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssuesStatus } from "@/Redux/issue/Action";
import { fetchComments } from "@/Redux/Comment/Action";

const IssueDetail = () => {
  const { issueId } = useParams();
  const dispatch = useDispatch();
  const { issue, comment } = useSelector((store) => store);

  const handleUpdateIssuestatus = (status) => {
    dispatch(updateIssuesStatus({ id: issueId, status }));
  };

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  }, [issueId]);
  console.log("fetched comment : ", comment.comments);

  return (
    <div className="px-20 py-8 text-gray-400">
      <div className="border p-10 rounded-lg flex justify-between">
        <ScrollArea className="h-[80vh] w-[60%]">
          <div>
            <h1 className="text-lg font-semibold text-gray-400">
              {issue.issueDetails?.title}
            </h1>
            <div className="py-5">
              <h2 className="font-semibold text-gray-400">Description</h2>
              <p className="text-gray-400 text-sm mt-3">
                {issue.issueDetails?.description}
              </p>
              <div className="mt-5">
                <h1 className="pb-3">Activity</h1>
                <Tabs defaultValue="all" className="w-[400px]">
                  <TabsList className="mb-5">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="comment">Comments</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <p>Make changes to your account here.</p>
                  </TabsContent>
                  <TabsContent value="comment">
                    <CreateCommentForm issueId={issueId} />
                    <div className="mt-8 space-y-6">
                      {comment.comments && comment.comments.length > 0 ? (
                        comment.comments.map((item, index) => (
                          <CommentCard item={item} key={index} />
                        ))
                      ) : (
                        <p>No comments yet.</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="history">
                    <p>Change your password here.</p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full lg:w-[30%] space-y-2">
          <Select onValueChange={handleUpdateIssuestatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="To Do" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="In-Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
          <div className="border rounded-lg">
            <p className="border-b py-3 px-5">Details</p>
            <div className="p-5">
              <div className="space-y-7">
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Assignee</p>
                  {issue.issueDetails?.assignee?.fullname ? (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8 text-xs">
                        <AvatarFallback>
                          {issue.issueDetails.assignee.fullname[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p>{issue.issueDetails.assignee.fullname}</p>
                    </div>
                  ) : (
                    <p>unassigned</p>
                  )}
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Labels</p>
                  <p>None</p>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Status</p>
                  <Badge>{issue.issueDetails?.status}</Badge>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Release</p>
                  <p>29-07-2024</p>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Reporter</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <p>Code with Alok</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
