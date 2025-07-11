
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Edit } from "lucide-react";
import { projectService } from "@/services/projectService";
import { useToast } from "@/hooks/use-toast";

const Preview = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreview();
  }, [projectId]);

  const loadPreview = async () => {
    try {
      if (projectId === 'new' && location.state) {
        // Generate preview from template and custom data
        const { template, customData } = location.state;
        const response = await fetch('/api/generate-preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ template, customData })
        });
        const data = await response.json();
        setHtmlContent(data.html);
      } else if (projectId) {
        // Load existing project
        const project = await projectService.getProject(projectId);
        setHtmlContent(project.html_content || '');
      }
    } catch (error) {
      console.error('Failed to load preview:', error);
      toast({
        title: "Error",
        description: "Failed to load preview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (projectId === 'new') {
      toast({
        title: "Save first",
        description: "Please save your project before downloading.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await projectService.downloadProject(projectId);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download project. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              {projectId !== 'new' && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/editor/project/${projectId}`)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Preview Frame */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
                Preview - Your Website
              </div>
            </div>
            
            <div className="h-[calc(100vh-200px)]">
              <iframe
                srcDoc={htmlContent}
                className="w-full h-full border-0"
                title="Website Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
