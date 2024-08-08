import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createIssue } from "@/Redux/issue/Action";
import { useParams } from "react-router-dom";

function CreateIssueForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const form = useForm({
    defaultValues: {
      issueName: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    data.projectId = id;
    dispatch(
      createIssue({
        title: data.issueName,
        description: data.description,
        projectId: id,
      })
    );
    console.log("create project data", data);
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="issueName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="User email..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discription"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Issue discription..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full my-3">
              Create Issue
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
}

export default CreateIssueForm;
