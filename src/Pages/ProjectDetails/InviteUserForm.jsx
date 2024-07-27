import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const InviteUserForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",

      tags: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Project name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full my-3">
              Create Project
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default InviteUserForm;
