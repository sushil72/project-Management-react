import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Corrected import path
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createIssue } from "@/Redux/issue/Action";
import { useParams } from "react-router-dom";

function CreateIssueForm({ status }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Initialize form with default values
  const form = useForm({
    defaultValues: {
      issueName: "",
      description: "", // Corrected the field name
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    data.projectId = id; // Assign projectId from route parameters
    console.log("ProjectID=", id);

    dispatch(
      createIssue({
        title: data.issueName, // Pass issueName as title
        description: data.description, // Corrected field name
        projectID: id,
        status: status,
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
                    placeholder="Issue title..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description" // Corrected name to "description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Issue description..."
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
