
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus, Loader2, ImagePlus } from "lucide-react";
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
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [selectedArticleImage, setSelectedArticleImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
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

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file for the thumbnail",
          variant: "destructive",
        });
        return;
      }
      setSelectedThumbnail(file);
    }
  };

  const handleArticleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      setSelectedArticleImage(file);
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
      // Upload video
      const videoPath = `${crypto.randomUUID()}.${selectedVideo.name.split('.').pop()}`;
      const { error: videoError } = await supabase.storage
        .from('videos')
        .upload(videoPath, selectedVideo);

      if (videoError) throw videoError;

      // Get video URL
      const { data: { publicUrl: videoUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(videoPath);

      let thumbnailUrl = null;
      if (selectedThumbnail) {
        const thumbnailPath = `${crypto.randomUUID()}.${selectedThumbnail.name.split('.').pop()}`;
        const { error: thumbnailError } = await supabase.storage
          .from('thumbnails')
          .upload(thumbnailPath, selectedThumbnail);

        if (thumbnailError) throw thumbnailError;

        const { data: { publicUrl } } = supabase.storage
          .from('thumbnails')
          .getPublicUrl(thumbnailPath);
        
        thumbnailUrl = publicUrl;
      }

      const { error: dbError } = await supabase
        .from('videos')
        .insert({
          title,
          description,
          category,
          video_url: videoUrl,
          thumbnail_url: thumbnailUrl,
          user_id: user.id,
          status: 'pending'
        });

      if (dbError) throw dbError;

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
      setSelectedThumbnail(null);
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
      let coverImageUrl = null;
      if (selectedArticleImage) {
        const imagePath = `${crypto.randomUUID()}.${selectedArticleImage.name.split('.').pop()}`;
        const { error: imageError } = await supabase.storage
          .from('articles')
          .upload(imagePath, selectedArticleImage);

        if (imageError) throw imageError;

        const { data: { publicUrl } } = supabase.storage
          .from('articles')
          .getPublicUrl(imagePath);
        
        coverImageUrl = publicUrl;
      }

      const { error: dbError } = await supabase
        .from('articles')
        .insert({
          title,
          content: description,
          cover_image: coverImageUrl,
          user_id: user.id,
          status: 'pending'
        });

      if (dbError) throw dbError;
      
      toast({
        title: "Article Created",
        description: "Your article has been created and will be reviewed.",
        duration: 3000,
      });
      
      setTitle("");
      setDescription("");
      setSelectedArticleImage(null);
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
    <div className="px-4 sm:px-6 lg:px-8 py-8 glass-morphism mx-4 sm:mx-6 lg:mx-8 my-8">
      <h2 className="text-2xl font-bold mb-6 text-gradient">Share Your Knowledge</h2>
      <div className="flex flex-wrap gap-4 mb-8">
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

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail Image (Optional)</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailSelect}
                  className="cursor-pointer"
                />
                {selectedThumbnail && (
                  <p className="text-sm text-gray-500">
                    Selected: {selectedThumbnail.name}
                  </p>
                )}
              </div>

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
              <div className="space-y-2">
                <Label htmlFor="articleImage">Cover Image (Optional)</Label>
                <Input
                  id="articleImage"
                  type="file"
                  accept="image/*"
                  onChange={handleArticleImageSelect}
                  className="cursor-pointer"
                />
                {selectedArticleImage && (
                  <p className="text-sm text-gray-500">
                    Selected: {selectedArticleImage.name}
                  </p>
                )}
              </div>
              <Textarea
                placeholder="Article Content"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[200px]"
              />
              <Button 
                onClick={handleArticleUpload}
                disabled={isUploading || !title || !description}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Article"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UploadSection;
