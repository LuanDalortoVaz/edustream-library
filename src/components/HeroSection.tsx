
import { Button } from "@/components/ui/button";
import { Play, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  featuredContent: {
    title: string;
    description: string;
    image: string;
  };
}

const HeroSection = ({ featuredContent }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[92vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
          alt="Featured Content"
          className="w-full h-full object-cover transform scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>
      
      <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight animate-fade-in leading-[1.1] text-gradient">
              {featuredContent.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 animate-fade-in max-w-2xl leading-relaxed">
              {featuredContent.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in pt-4">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 flex items-center justify-center text-lg group transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              onClick={() => navigate("/videos")}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              Watch Now
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/20 hover:bg-white/10 flex items-center justify-center text-lg group transition-all duration-300 backdrop-blur-sm"
              onClick={() => window.open("https://z-library.sk/", "_blank")}
            >
              <BookOpen className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" /> 
              Library
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
