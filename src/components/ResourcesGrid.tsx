import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, GamepadIcon, Code, Wind, MousePointer, Camera, Video } from "lucide-react";

interface Resource {
  name: string;
  url: string;
  icon: JSX.Element;
}

interface ResourcesGridProps {
  title: string;
  resources: Resource[];
}

const ResourcesGrid = ({ title, resources }: ResourcesGridProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {resources.map((resource) => (
          <a 
            key={resource.name}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="bg-gray-800 border-none hover:scale-105 transition-transform duration-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  {resource.icon}
                  <span className="text-white font-semibold">{resource.name}</span>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourcesGrid;