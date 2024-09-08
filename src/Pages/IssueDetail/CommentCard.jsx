import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { deleteComment } from "@/Redux/Comment/Action"; // Assuming the deleteComment action is defined here

const CommentCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment(item.id));
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>{item.user.fullname[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p>{item.user.fullname}</p>
          <p>{item.content}</p>
        </div>
      </div>
      <Button
        onClick={handleDelete}
        className="rounded-full"
        variant="ghost"
        size="icon"
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CommentCard;
