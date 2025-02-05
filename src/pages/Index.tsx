import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import UploadSection from "../components/UploadSection";
import ResourcesGrid from "../components/ResourcesGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, GamepadIcon, Code, Wind, MousePointer, Camera, Video } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const featuredContent = {
    title: "Machine Learning Fundamentals",
    description: "Master the basics of machine learning with our comprehensive course. Learn about algorithms, data processing, and practical applications.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=2070"
  };

  const newsResources = [
    { name: "Forbes", url: "https://www.forbes.com/", icon: <Newspaper className="w-5 h-5" /> },
    { name: "BBC News", url: "https://www.bbc.com/", icon: <Newspaper className="w-5 h-5" /> },
    { name: "National Geographic", url: "https://www.nationalgeographic.com/", icon: <Newspaper className="w-5 h-5" /> },
    { name: "Sebrae", url: "https://sebrae.com.br/sites/PortalSebrae/", icon: <Newspaper className="w-5 h-5" /> }
  ];

  const gameCreatingTools = [
    { name: "GDevelop", url: "https://gdevelop.io/pt-br", icon: <GamepadIcon className="w-5 h-5" /> },
    { name: "Rosebud AI", url: "https://www.rosebud.ai/ai-game-creator", icon: <GamepadIcon className="w-5 h-5" /> },
  ];

  const lowCodeTools = [
    { name: "Lovable", url: "https://lovable.dev", icon: <Code className="w-5 h-5" /> },
    { name: "Bolt", url: "https://bolt.new", icon: <Code className="w-5 h-5" /> },
    { name: "Windsurf", url: "https://windsurf.io", icon: <Wind className="w-5 h-5" /> },
    { name: "Cursor", url: "https://cursor.sh", icon: <MousePointer className="w-5 h-5" /> },
  ];

  const animationTools = [
    { name: "Wonder Dynamics", url: "https://wonderdynamics.com/", icon: <Camera className="w-5 h-5" /> },
    { name: "Mixamo", url: "https://www.mixamo.com/#/", icon: <Camera className="w-5 h-5" /> },
    { name: "Reallusion", url: "https://www.reallusion.com/character-creator/", icon: <Camera className="w-5 h-5" /> },
  ];

  const aiVideoTools = [
    { name: "Luma Labs", url: "https://lumalabs.ai/", icon: <Video className="w-5 h-5" /> },
    { name: "RunwayML", url: "https://runwayml.com/", icon: <Video className="w-5 h-5" /> },
    { name: "Sora by OpenAI", url: "https://openai.com/sora", icon: <Video className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navigation />
      <HeroSection featuredContent={featuredContent} />
      <UploadSection />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Videos Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Popular Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card 
                key={item} 
                className="bg-gray-800 border-none transform transition-all duration-300 hover:scale-105 hover:z-10"
                onMouseEnter={() => setIsHovered(`video-${item}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <CardContent className="p-4 relative overflow-hidden">
                  <div className="aspect-video bg-gray-700 rounded-md mb-2" />
                  <h3 className="text-white font-semibold">Educational Video {item}</h3>
                  <p className="text-gray-400 text-sm">Learn something new today</p>
                  {isHovered === `video-${item}` && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
                        Play
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resources Sections */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Web Educational Creative Tools</h2>
          <ResourcesGrid title="News Resources" resources={newsResources} />
          <ResourcesGrid title="Game Creating Tools" resources={gameCreatingTools} />
          <ResourcesGrid title="Low-Code Tools" resources={lowCodeTools} />
          <ResourcesGrid title="3D Animation Tools" resources={animationTools} />
          <ResourcesGrid title="AI Video Generator" resources={aiVideoTools} />
        </section>
      </div>
    </div>
  );
};

export default Index;