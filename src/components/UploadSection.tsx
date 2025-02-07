
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus, Loader2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UploadSection = () => {
  const { toast } = useToast();
  const { user, supabase } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) { // 500MB limit
        toast({
          title: "File too large",
          description: "Please select a video file smaller than 500MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedVideo(file);
    }
  };

  const handleVideoUpload = async () => {
    if (!user || !selectedVideo) {
      toast({
        title: "Error",
        description: "Please sign in and select a video",
        variant: "destructive",
      });
      return;
    }

    const moderationResult = moderateContent({
      title,
      description,
      type: 'video'
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
      const formData = new FormData();
      formData.append('video', selectedVideo);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);

      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-video`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload video');
      }

      toast({
        title: "Upload Successful",
        description: "Your video has been uploaded and will be reviewed.",
        duration: 3000,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setSelectedVideo(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleArticleUpload = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create an article.",
        variant: "destructive",
      });
      return;
    }

    const moderationResult = moderateContent({
      title,
      description,
      type: 'article'
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
      console.log('Creating article:', { title, description });
      
      toast({
        title: "Article Created",
        description: "Your article has been created and will be reviewed.",
        duration: 3000,
      });
      
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: "Creation Failed",
        description: "There was an error creating your article. Please try again.",
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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Video</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Video Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Video Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video">Video File</Label>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoSelect}
                  className="cursor-pointer"
                />
                {selectedVideo && (
                  <p className="text-sm text-gray-500">
                    Selected: {selectedVideo.name}
                  </p>
                )}
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              <Button 
                onClick={handleVideoUpload}
                disabled={isUploading || !title || !description || !selectedVideo || !category}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
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
                onClick={handleArticleUpload}
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
