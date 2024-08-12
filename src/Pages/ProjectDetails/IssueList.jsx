import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import IssueCard from "./IssueCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { DialogHeader } from "@/components/ui/dialog";
import CreateIssueForm from "./CreateIssueForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchIssues } from "@/Redux/issue/Action";

const IssueList = ({ title, status }) => {
  const { issue } = useSelector((store) => store);
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(status);

  useEffect(() => {
    dispatch(fetchIssues(id));
  }, [id]);

  return (
    <div>
      <Dialog>
        <Card className="w-full md:w-[300px] lg:w-[310px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-2">
              {issue.issues
                ?.filter((issue) => issue.status === status)
                .map((item) => (
                  <IssueCard projectId={id} key={item.id} item={item} />
                )) || <p>No issues found.</p>}
            </div>
          </CardContent>
          <CardFooter>
            <DialogTrigger>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <PlusIcon />
                Create Issue
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm status={status} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueList;
