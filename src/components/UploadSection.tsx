import { Button } from "@/components/ui/button";
import { Upload, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const UploadSection = () => {
  const { toast } = useToast();

  const handleContentUpload = (type: 'video' | 'article') => {
    console.log(`Uploading ${type}`);
    toast({
      title: "Feature Coming Soon",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} upload will be available soon!`,
      duration: 3000,
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex space-x-4 mb-8">
        <Button
          onClick={() => handleContentUpload('video')}
          className="bg-primary hover:bg-primary/80 flex items-center"
        >
          <Upload className="mr-2 h-5 w-5" />
          Upload Video
        </Button>
        <Button
          onClick={() => handleContentUpload('article')}
          className="bg-secondary hover:bg-secondary/80 flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Article
        </Button>
      </div>
    </div>
  );
};

export default UploadSection;