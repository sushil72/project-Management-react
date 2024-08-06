import { Button } from "../../components/ui/button";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { Card, CardContent } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { ProjectCard } from "../../Project/ProjectCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProjects } from "@/Redux/Projects/Action";

export const tags = [
  "all",
  "react",
  "nextjs",
  "springboot",
  "mysql",
  "mongodb",
  "angular",
  "python",
  "flask",
  "django",
];

export const ProjectList = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const { searchedProjects, projects, loading, error } = useSelector(
    (store) => store.project
  );

  useEffect(() => {
    if (keyword) {
      dispatch(searchProjects({ keyword }));
    }
  }, [keyword, dispatch]);

  const handleSearchChange = (e) => {
    const searchKeyword = e.target.value;
    setKeyword(searchKeyword);
  };

  const handleFilterChange = (category, value) => {
    console.log("Category:", category, "Value:", value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const displayProjects = keyword ? searchedProjects : projects;

  return (
    <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
      <section className="filterSection">
        <Card className="p-5 sticky top-10 border">
          <div className="flex lg:w-[20rem] justify-between">
            <p className="text-xl -tracking-wider">Filters</p>
            <Button variant="ghost" size="icon">
              <MixerHorizontalIcon />
            </Button>
          </div>
          <CardContent className="mt-5">
            <ScrollArea className="space-y-7 h-[70vh]">
              <div>
                <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                <div className="pt-5">
                  <RadioGroup
                    className="space-y-3 pt-5"
                    onValueChange={(value) =>
                      handleFilterChange("Category", value)
                    }
                  >
                    {["all", "fullstack", "frontend", "backend"].map(
                      (category) => (
                        <div key={category} className="flex gap-2 pb-2">
                          <RadioGroupItem
                            value={category}
                            id={`category-${category}`}
                          />
                          <Label htmlFor={`category-${category}`}>
                            {category}
                          </Label>
                        </div>
                      )
                    )}
                  </RadioGroup>
                </div>
              </div>

              <div className="pt-9">
                <h1 className="pb-3 text-gray-400 border-b">Tag</h1>
                <div className="pt-5">
                  <RadioGroup
                    className="space-y-3 pt-5"
                    onValueChange={(value) => handleFilterChange("Tag", value)}
                  >
                    {tags.map((item) => (
                      <div key={item} className="flex gap-2">
                        <RadioGroupItem value={item} id={`tag-${item}`} />
                        <Label htmlFor={`tag-${item}`}>{item}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>

      <section className="projectListSection w-full lg:w-[48rem]">
        <div className="flex gap-2 items-center pb-5 justify-center">
          <div className="relative p-0 w-full">
            <Input
              onChange={handleSearchChange}
              className="40% px-9"
              placeholder="Search project"
            />
            <MagnifyingGlassIcon className="absolute top-3 left-4" />
          </div>
        </div>
        <div>
          <div className="space-y-5 min-h-[74vh]">
            {displayProjects && displayProjects.length > 0 ? (
              displayProjects.map((item) => (
                <ProjectCard key={item.id} item={item} />
              ))
            ) : (
              <p>No projects found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
