import Navigation from "../components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Play, BookOpen, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const featuredContent = {
    title: "Machine Learning Fundamentals",
    description: "Master the basics of machine learning with our comprehensive course. Learn about algorithms, data processing, and practical applications.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070"
  };

  const newsResources = [
    { name: "Forbes", url: "https://www.forbes.com/", icon: <Newspaper className="w-5 h-5" /> },
    { name: "BBC News", url: "https://www.bbc.com/", icon: <Newspaper className="w-5 h-5" /> },
    { name: "National Geographic", url: "https://www.nationalgeographic.com/", icon: <Newspaper className="w-5 h-5" /> },
    { name: "Sebrae", url: "https://sebrae.com.br/sites/PortalSebrae/", icon: <Newspaper className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={featuredContent.image} 
            alt="Featured Content"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
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
                <Play className="mr-2 h-5 w-5" /> Play Now
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

      {/* Content Sections */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Videos Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Popular Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="bg-gray-800 border-none hover:scale-105 transition-transform duration-200">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gray-700 rounded-md mb-2" />
                  <h3 className="text-white font-semibold">Educational Video {item}</h3>
                  <p className="text-gray-400 text-sm">Learn something new today</p>
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
        </section>
      </div>
    </div>
  );
};

export default Index;