import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { assignedUserToIssue } from "@/Redux/issue/Action";

const UserList = ({ issueDetails }) => {
  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();
  
  const handleAssignUserToiissue = (userId) => {    
    dispatch(assignedUserToIssue({ issueId: issueDetails.id, userId }));
  };

  return (
    <>
      <div className="space-y-2">
        <div className="border rounded-md">
          <p className="py-2 px-3">
            {issueDetails.assignee?.fullname || "Unassigned"}
          </p>
        </div>
        {project.projectDetails?.team.map((item, index) => (
          <div
            onClick={()=>handleAssignUserToiissue(item.id)}
            key={index}
            className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
          >
            <Avatar>
              <AvatarFallback>
                {item.fullname ? item.fullname[0].toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm leading-none">
                {item?.fullname || "Unknown User"}
              </p>
              <p className="text-sm text-muted-foreground">
                @
                {item.fullname
                  ? item.fullname.toLowerCase().replace(/\s+/g, "")
                  : "unknown"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;
