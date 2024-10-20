import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createComment } from "@/Redux/Comment/Action";

const CreateCommentForm = ({ issueId }) => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = (data) => {
    dispatch(createComment({ content: data.content, issueId }));
    // console.log("comment in Form :  ", data);
  };

  return (
    <div>
      <Form {...form}>
        <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <div>
                    <Avatar>
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border w-[20rem] border-gray-700 py-5 px-5"
                      placeholder="Add Comment..."
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="py-5">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default CreateCommentForm;
