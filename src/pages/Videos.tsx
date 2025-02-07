
import { useState } from "react";
import Navigation from "../components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Videos = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const { data: videos, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#141414] text-white">
        <Navigation />
        <div className="flex items-center justify-center h-[80vh]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Videos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos?.map((video) => (
            <Card 
              key={video.id}
              className="bg-gray-800 border-none transform transition-all duration-300 hover:scale-105 hover:z-10"
              onMouseEnter={() => setIsHovered(video.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <CardContent className="p-4 relative overflow-hidden">
                <div className="aspect-video bg-gray-700 rounded-md mb-2">
                  {video.thumbnail_url && (
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                </div>
                <h3 className="text-white font-semibold">{video.title}</h3>
                <p className="text-gray-400 text-sm">{video.description}</p>
                {isHovered === video.id && (
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
      </div>
    </div>
  );
};

export default Videos;
