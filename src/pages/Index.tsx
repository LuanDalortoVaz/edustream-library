
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import UploadSection from "../components/UploadSection";
import ResourcesGrid from "../components/ResourcesGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, GamepadIcon, Code, Wind, MousePointer, Camera, Video, Play } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const Index = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const { data: videos, isLoading } = useQuery({
    queryKey: ["featured-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq('status', 'approved')
        .order("created_at", { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  const featuredContent = {
    title: "Discover, Learn, and Share Knowledge",
    description: "Join our community of learners and educators. Access high-quality educational content, share your expertise, and engage with a global community passionate about learning.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection featuredContent={featuredContent} />
      <UploadSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Videos Section */}
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold text-gradient">
              Featured Videos
            </h2>
            <Link 
              to="/videos" 
              className="text-white/80 hover:text-white flex items-center group transition-all"
            >
              View All <Play className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <Card key={i} className="bg-secondary/50 border-none animate-pulse">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-secondary/50 rounded-xl mb-4" />
                    <div className="h-4 bg-secondary/50 rounded animate-pulse mb-2" />
                    <div className="h-3 bg-secondary/50 rounded animate-pulse w-2/3" />
                  </CardContent>
                </Card>
              ))
            ) : (
              videos?.map((video) => (
                <Card 
                  key={video.id}
                  className="glass-morphism group transform transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setIsHovered(video.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <CardContent className="p-4 relative">
                    <div className="aspect-video rounded-xl overflow-hidden mb-4">
                      {video.thumbnail_url ? (
                        <img
                          src={video.thumbnail_url}
                          alt={video.title}
                          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                          <Video className="w-8 h-8 text-secondary-foreground/50" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white/90 mb-2 line-clamp-1">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      {video.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {video.category && (
                        <span className="px-2 py-1 bg-primary/20 text-primary-foreground rounded-full text-xs">
                          {video.category}
                        </span>
                      )}
                      {video.difficulty_level && (
                        <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-xs">
                          {video.difficulty_level}
                        </span>
                      )}
                    </div>
                    {isHovered === video.id && (
                      <a 
                        href={video.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 rounded-xl bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in"
                      >
                        <div className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors group cursor-pointer">
                          <Play className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          <span>Watch Now</span>
                        </div>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Resources Section */}
        <section className="space-y-12">
          <h2 className="text-4xl font-bold text-gradient">
            Educational Resources
          </h2>
          <div className="space-y-16">
            <ResourcesGrid title="News Resources" resources={newsResources} />
            <ResourcesGrid title="Game Creating Tools" resources={gameCreatingTools} />
            <ResourcesGrid title="Low-Code Tools" resources={lowCodeTools} />
            <ResourcesGrid title="3D Animation Tools" resources={animationTools} />
            <ResourcesGrid title="AI Video Generator" resources={aiVideoTools} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
