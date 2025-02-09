
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
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-8 text-gradient">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <a 
            key={resource.name}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transform transition-all duration-300 hover:scale-105"
          >
            <Card className="glass-morphism overflow-hidden group-hover:border-white/20 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-white/5 text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                    {resource.icon}
                  </div>
                  <span className="text-white/90 font-medium group-hover:text-white transition-colors">
                    {resource.name}
                  </span>
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
