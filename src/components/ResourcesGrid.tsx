
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
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-6 text-white/90">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {resources.map((resource) => (
          <a 
            key={resource.name}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block transform transition-all duration-300 hover:scale-105"
          >
            <Card className="bg-gray-800/80 backdrop-blur border border-white/10 hover:border-white/20 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gray-700/50 text-primary-foreground">
                    {resource.icon}
                  </div>
                  <span className="text-white font-medium">{resource.name}</span>
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
