import Navigation from "../components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Play, BookOpen, Newspaper, GamepadIcon, Code, Wind, MousePointer, Camera, Video, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const featuredContent = {
    title: "Machine Learning Fundamentals",
    description: "Master the basics of machine learning with our comprehensive course. Learn about algorithms, data processing, and practical applications.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=2070"
  };

  // Simulated content upload function - in real implementation, this would connect to a backend
  const handleContentUpload = (type: 'video' | 'article') => {
    console.log(`Uploading ${type}`);
    toast({
      title: "Feature Coming Soon",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} upload will be available soon!`,
      duration: 3000,
    });
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
      
      {/* Hero Section with Netflix-style gradient */}
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={featuredContent.image} 
            alt="Featured Content"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-[#141414]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 animate-fade-in">
              {featuredContent.title}
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-200 animate-fade-in">
              {featuredContent.description}
            </p>
            <div className="flex space-x-4 animate-fade-in">
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-gray-200 flex items-center"
                onClick={() => navigate("/videos")}
              >
                <Play className="mr-2 h-5 w-5" /> Watch Now
              </Button>
              <Button 
                size="lg"
                variant="secondary"
                className="bg-gray-500/75 hover:bg-gray-500/50"
                onClick={() => navigate("/library")}
              >
                <BookOpen className="mr-2 h-5 w-5" /> More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <Button
            onClick={() => handleContentUpload('video')}
            className="bg-primary hover:bg-primary/80 flex items-center"
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload Video
          </Button>
          <Button
            onClick={() => handleContentUpload('article')}
            className="bg-secondary hover:bg-secondary/80 flex items-center"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Article
          </Button>
        </div>
      </div>

      {/* Content Sections with Netflix-style hover effects */}
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
                      <Button className="bg-white text-black hover:bg-gray-200">
                        <Play className="mr-2 h-5 w-5" /> Play
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newsResources.map((resource) => (
              <a 
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block transform transition-all duration-300 hover:scale-105"
              >
                <Card className="bg-gray-800 border-none h-full">
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
        </section>

        {/* Web Educational Creative Tools Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Web Educational Creative Tools</h2>
          
          {/* AI Video Generator Subsection */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">AI Video Generator</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {aiVideoTools.map((tool) => (
                <a 
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="bg-gray-800 border-none hover:scale-105 transition-transform duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        {tool.icon}
                        <span className="text-white font-semibold">{tool.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* 3D Animation Tools Subsection */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">3D Animation Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {animationTools.map((tool) => (
                <a 
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="bg-gray-800 border-none hover:scale-105 transition-transform duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        {tool.icon}
                        <span className="text-white font-semibold">{tool.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* Game Creating Tools Subsection */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Free Game Creating Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gameCreatingTools.map((tool) => (
                <a 
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="bg-gray-800 border-none hover:scale-105 transition-transform duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        {tool.icon}
                        <span className="text-white font-semibold">{tool.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* Low-Code Tools Subsection */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Low-Code Programming Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {lowCodeTools.map((tool) => (
                <a 
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="bg-gray-800 border-none hover:scale-105 transition-transform duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        {tool.icon}
                        <span className="text-white font-semibold">{tool.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;