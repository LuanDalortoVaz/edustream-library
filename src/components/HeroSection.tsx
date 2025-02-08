
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
    <div className="relative min-h-[90vh] w-full">
      <div className="absolute inset-0">
        <img 
          src={featuredContent.image} 
          alt="Featured Content"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 animate-fade-in leading-tight">
            {featuredContent.title}
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-gray-200 animate-fade-in max-w-2xl leading-relaxed">
            {featuredContent.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-200 flex items-center justify-center text-lg group transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate("/videos")}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              Watch Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/80 hover:bg-white/10 flex items-center justify-center text-lg group transition-all duration-300"
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
