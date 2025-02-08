
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
              onClick={() => window.open("https://z-library.sk/", "_blank")}
            >
              <BookOpen className="mr-2 h-5 w-5" /> Library
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
