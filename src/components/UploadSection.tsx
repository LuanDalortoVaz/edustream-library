import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { moderateContent } from "@/utils/contentModeration";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";

const UploadSection = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleContentUpload = async (type: 'video' | 'article') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload content.",
        variant: "destructive",
      });
      return;
    }

    // First, moderate the content
    const moderationResult = moderateContent({
      title,
      description,
      type
    });

    if (!moderationResult.isAllowed) {
      toast({
        title: "Content Not Allowed",
        description: moderationResult.reason,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Here you would typically upload to your storage
      console.log(`Uploading ${type}:`, { title, description });
      
      toast({
        title: "Upload Successful",
        description: `Your ${type} has been uploaded and will be reviewed.`,
        duration: 3000,
      });
      
      // Reset form
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex space-x-4 mb-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-primary hover:bg-primary/80 flex items-center"
              disabled={!user}
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Video
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Video</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Video Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button 
                onClick={() => handleContentUpload('video')}
                disabled={isUploading || !title || !description}
                className="w-full"
              >
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-secondary hover:bg-secondary/80 flex items-center"
              disabled={!user}
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Article
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Article</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Article Content"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button 
                onClick={() => handleContentUpload('article')}
                disabled={isUploading || !title || !description}
                className="w-full"
              >
                {isUploading ? "Creating..." : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UploadSection;