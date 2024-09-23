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
import { fetchProjects, searchProjects } from "@/Redux/Projects/Action";

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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleFilterCategory = (value) => {
    setSelectedCategory(value);
    if (value === "all") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ category: value }));
    }
  };

  const handleFilterTags = (value) => {
    setSelectedTag(value);
    if (value === "all") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ tag: value }));
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    console.log("Keyword in component ::", e.target.value);
    dispatch(searchProjects(e.target.value));
  };

  useEffect(() => {
    if (keyword) {
      dispatch(searchProjects({ keyword }));
    } else {
      dispatch(fetchProjects({}));
    }
  }, []);

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
                    value={selectedCategory}
                    onValueChange={handleFilterCategory}
                  >
                    {["all", "Fullstack", "Frontend", "Backend"].map(
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
                    value={selectedTag}
                    onValueChange={handleFilterTags}
                  >
                    {tags.map((tag) => (
                      <div key={tag} className="flex gap-2">
                        <RadioGroupItem value={tag} id={`tag-${tag}`} />
                        <Label htmlFor={`tag-${tag}`}>{tag}</Label>
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
              value={keyword}
              onChange={handleSearchChange}
              className="40% px-9"
              placeholder="Search project"
            />
            <MagnifyingGlassIcon className="absolute top-3 left-4" />
          </div>
        </div>
        <div>
          {keyword ? (
            project.searchedProjects?.length > 0 ? (
              project.searchedProjects.map((item, index) => (
                <ProjectCard key={index} item={item} />
              ))
            ) : (
              <p>No search results found.</p>
            )
          ) : (
            project.projects.map((item, index) => (
              <ProjectCard key={index} item={item} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};
