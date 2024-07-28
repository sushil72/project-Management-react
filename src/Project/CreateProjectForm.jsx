import {
  FormField,
  Form,
  FormControl,
  FormMessage,
  FormItem,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tags } from "../Pages/ProjectList/ProjectList";
import { Cross1Icon } from "@radix-ui/react-icons";

const CreateProjectForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags");
    if (!currentTags.includes(newValue)) {
      form.setValue("tags", [...currentTags, newValue]);
    }
  };

  const removeTag = (tagToRemove) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Project description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full border border-gray-700 py-5 px-5">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fullstack">Fullstack</SelectItem>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Select onValueChange={handleTagsChange}>
                      <SelectTrigger className="w-full border border-gray-700 py-5 px-5">
                        <SelectValue placeholder="Select tags" />
                      </SelectTrigger>
                      <SelectContent>
                        {tags.map((tag) => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {field.value.map((item) => (
                        <div
                          key={item}
                          className="cursor-pointer flex rounded-full items-center border gap-2 py-1 px-2"
                        >
                          <span className="text-sm">{item}</span>
                          <Cross1Icon
                            className="h-3 w-3"
                            onClick={() => removeTag(item)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            {false ? (
              <div>
                <p>
                  You can create only 3 projects with free plan, please upgrade
                  your plan
                </p>
              </div>
            ) : (
              <Button type="submit" className="w-full my-3">
                Create Project
              </Button>
            )}
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
