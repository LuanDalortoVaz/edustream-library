
import { useState } from "react";
import Navigation from "../components/Navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ExternalLink, Trash2, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Videos = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const handleDelete = async (videoId: string, videoUrl: string) => {
    try {
      // Extract filename from URL
      const filename = videoUrl.split('/').pop();
      if (!filename) throw new Error("Invalid video URL");

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('videos')
        .remove([filename]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('videos')
        .delete()
        .eq('id', videoId);

      if (dbError) throw dbError;

      // Refresh videos list
      queryClient.invalidateQueries({ queryKey: ["videos"] });

      toast({
        title: "Success",
        description: "Video deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting video:', error);
      toast({
        title: "Error",
        description: "Failed to delete video. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getSensitivityLevelColor = (level: string) => {
    switch (level) {
      case 'public':
        return 'text-green-400 bg-green-500/20';
      case 'personal':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'sensitive':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

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
        <h1 className="text-3xl font-bold mb-8">Educational Videos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos?.map((video) => (
            <Card 
              key={video.id}
              className="bg-gray-800 border-none transform transition-all duration-300 hover:scale-105 hover:z-10"
              onMouseEnter={() => setIsHovered(video.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <CardContent className="p-4 relative">
                <div className="aspect-video bg-gray-700 rounded-lg mb-4 overflow-hidden">
                  {video.thumbnail_url ? (
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                      <span className="text-gray-400">No thumbnail</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
                  {video.description && (
                    <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {video.educational_category && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                        {video.educational_category}
                      </span>
                    )}
                    {video.difficulty_level && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        {video.difficulty_level}
                      </span>
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getSensitivityLevelColor(video.data_sensitivity_level)}`}>
                            <Shield className="w-3 h-3" />
                            {video.data_sensitivity_level}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>LGPD Security Level</p>
                          {video.data_usage_purpose && (
                            <p className="text-xs text-gray-400">
                              Purpose: {video.data_usage_purpose.join(', ')}
                            </p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    {video.author && <p>By {video.author}</p>}
                  </div>
                </div>
                {isHovered === video.id && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4">
                    <a 
                      href={video.video_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Watch <ExternalLink className="w-4 h-4" />
                    </a>
                    {user && user.id === video.user_id && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-full"
                        onClick={() => handleDelete(video.id, video.video_url)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
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

