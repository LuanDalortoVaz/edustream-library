import { useNavigate } from "react-router-dom";
import { Book, Video, Newspaper } from "lucide-react";
import Navigation from "../components/Navigation";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Educational Videos",
      description: "Access a curated collection of educational videos across various topics.",
      icon: <Video className="w-12 h-12 text-secondary" />,
      path: "/videos",
    },
    {
      title: "Latest Articles",
      description: "Stay updated with articles from leading publications worldwide.",
      icon: <Newspaper className="w-12 h-12 text-secondary" />,
      path: "/articles",
    },
    {
      title: "Digital Library",
      description: "Explore our vast collection of books and educational resources.",
      icon: <Book className="w-12 h-12 text-secondary" />,
      path: "/library",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-primary py-16 px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Your Gateway to Knowledge
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Access educational videos, articles, and books all in one place.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => navigate(feature.path)}
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mt-4 text-xl font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">Start Learning Today</h2>
          <p className="mt-4 text-lg text-gray-100">
            Explore our vast collection of educational resources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;