
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, ArrowLeft, Save, Download, Eye, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { templateService } from "@/services/templateService";
import { projectService } from "@/services/projectService";

const TemplateEditor = () => {
  const { templateId, projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customData, setCustomData] = useState({
    businessName: '',
    tagline: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    logo: '',
    heroImage: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#EF4444',
    products: [],
    services: [],
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  });

  useEffect(() => {
    loadTemplateData();
  }, [templateId, projectId]);

  const loadTemplateData = async () => {
    try {
      if (projectId) {
        // Load existing project
        const project = await projectService.getProject(projectId);
        setTemplate(project.template);
        setCustomData(project.customData || customData);
      } else if (templateId) {
        // Load template for new project
        const templateData = await templateService.getTemplate(templateId);
        setTemplate(templateData);
      }
    } catch (error) {
      console.error('Failed to load template:', error);
      toast({
        title: "Error",
        description: "Failed to load template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file, field) => {
    try {
      const result = await projectService.uploadImage(file);
      setCustomData(prev => ({
        ...prev,
        [field]: result.url
      }));
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addProduct = () => {
    setCustomData(prev => ({
      ...prev,
      products: [...prev.products, { name: '', description: '', price: '', image: '' }]
    }));
  };

  const updateProduct = (index, field, value) => {
    setCustomData(prev => ({
      ...prev,
      products: prev.products.map((product, i) => 
        i === index ? { ...product, [field]: value } : product
      )
    }));
  };

  const removeProduct = (index) => {
    setCustomData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const addService = () => {
    setCustomData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', description: '' }]
    }));
  };

  const updateService = (index, field, value) => {
    setCustomData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const removeService = (index) => {
    setCustomData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (projectId) {
        await projectService.updateProject(projectId, { customData });
        toast({
          title: "Success",
          description: "Project updated successfully!",
        });
      } else {
        const project = await projectService.createProject(templateId, { 
          name: customData.businessName || `${template.name} Website`,
          customData 
        });
        navigate(`/editor/project/${project.id}`);
        toast({
          title: "Success",
          description: "Project created successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    navigate(`/preview/${projectId || 'new'}`, { state: { template, customData } });
  };

  const handleDownload = async () => {
    if (!projectId) {
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
          <p className="text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Template not found.</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">WebsiteBoss</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-700">{template.name}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              {projectId && (
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={customData.businessName}
                      onChange={(e) => setCustomData(prev => ({ ...prev, businessName: e.target.value }))}
                      placeholder="Your business name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={customData.tagline}
                      onChange={(e) => setCustomData(prev => ({ ...prev, tagline: e.target.value }))}
                      placeholder="Your business tagline"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={customData.description}
                    onChange={(e) => setCustomData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your business"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={customData.phone}
                      onChange={(e) => setCustomData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customData.email}
                      onChange={(e) => setCustomData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={customData.address}
                      onChange={(e) => setCustomData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Business address"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Design & Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Logo</Label>
                    <div className="mt-2 space-y-2">
                      {customData.logo && (
                        <img src={customData.logo} alt="Logo" className="w-32 h-20 object-cover rounded border" />
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'logo');
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Hero Image</Label>
                    <div className="mt-2 space-y-2">
                      {customData.heroImage && (
                        <img src={customData.heroImage} alt="Hero" className="w-full h-32 object-cover rounded border" />
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'heroImage');
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      value={customData.primaryColor}
                      onChange={(e) => setCustomData(prev => ({ ...prev, primaryColor: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={customData.secondaryColor}
                      onChange={(e) => setCustomData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            {template.industry === 'cosmetics' && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Products</CardTitle>
                    <Button onClick={addProduct} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {customData.products.map((product, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Product {index + 1}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeProduct(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          placeholder="Product name"
                          value={product.name}
                          onChange={(e) => updateProduct(index, 'name', e.target.value)}
                        />
                        <Input
                          placeholder="Price"
                          value={product.price}
                          onChange={(e) => updateProduct(index, 'price', e.target.value)}
                        />
                      </div>
                      <Textarea
                        placeholder="Product description"
                        value={product.description}
                        onChange={(e) => updateProduct(index, 'description', e.target.value)}
                        rows={2}
                      />
                      <div>
                        <Label>Product Image</Label>
                        <div className="mt-2 space-y-2">
                          {product.image && (
                            <img src={product.image} alt="Product" className="w-24 h-24 object-cover rounded border" />
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  const result = await projectService.uploadImage(file);
                                  updateProduct(index, 'image', result.url);
                                } catch (error) {
                                  toast({
                                    title: "Upload failed",
                                    description: "Failed to upload image.",
                                    variant: "destructive",
                                  });
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Services</CardTitle>
                  <Button onClick={addService} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {customData.services.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Service {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeService(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Service name"
                      value={service.name}
                      onChange={(e) => updateService(index, 'name', e.target.value)}
                    />
                    <Textarea
                      placeholder="Service description"
                      value={service.description}
                      onChange={(e) => updateService(index, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="facebook">Facebook URL</Label>
                  <Input
                    id="facebook"
                    value={customData.socialMedia.facebook}
                    onChange={(e) => setCustomData(prev => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                    }))}
                    placeholder="https://facebook.com/your-page"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    value={customData.socialMedia.instagram}
                    onChange={(e) => setCustomData(prev => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                    }))}
                    placeholder="https://instagram.com/your-account"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    value={customData.socialMedia.twitter}
                    onChange={(e) => setCustomData(prev => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                    }))}
                    placeholder="https://twitter.com/your-account"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TemplateEditor;
