
import React, { useState } from "react";
import { Upload, Image as ImageIcon, Download, Sliders, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useToast } from "@/hooks/use-toast";

export default function ImageEnhancer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [brightness, setBrightness] = useState([50]);
  const [contrast, setContrast] = useState([50]);
  const [saturation, setSaturation] = useState([50]);
  const [sharpness, setSharpness] = useState([50]);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setEnhancedImage(null);
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEnhance = () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    // Simulate image enhancement (this would call a real API in production)
    setTimeout(() => {
      // In a real app, we would send the image to an AI API and get back an enhanced version
      // For now, we'll just use the same image as a placeholder
      setEnhancedImage(selectedImage);
      setIsProcessing(false);
      
      toast({
        title: "Image enhanced",
        description: "In a real app, this would use AI to enhance the image",
      });
    }, 2000);
  };

  const handleApplyAdjustments = () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    // Simulate applying manual adjustments
    setTimeout(() => {
      setEnhancedImage(selectedImage);
      setIsProcessing(false);
      
      toast({
        title: "Adjustments applied",
        description: "In a real app, this would apply the selected adjustments",
      });
    }, 1000);
  };

  const handleDownload = () => {
    if (!enhancedImage) return;
    
    // In a real app, this would download the actual enhanced image
    const a = document.createElement("a");
    a.href = enhancedImage;
    a.download = `enhanced-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Image downloaded",
    });
  };

  const handleReset = () => {
    setSelectedImage(null);
    setEnhancedImage(null);
    setBrightness([50]);
    setContrast([50]);
    setSaturation([50]);
    setSharpness([50]);
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Image Enhancer</h2>
          <p className="text-muted-foreground">
            Improve image quality with AI or manual adjustments
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-center flex-col">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-lg">Upload Image</h3>
              <p className="text-muted-foreground text-center text-sm mt-1">
                Select an image to enhance
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground"
              />
            </div>
          </div>
        </Card>

        {selectedImage && (
          <div className="space-y-4">
            <h3 className="font-medium">Original Image</h3>
            <Card className="overflow-hidden">
              <img
                src={selectedImage}
                alt="Original"
                className="w-full h-auto"
              />
            </Card>
            
            <Tabs defaultValue="ai" className="space-y-4">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="ai">AI Enhancement</TabsTrigger>
                <TabsTrigger value="manual">Manual Adjustment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ai" className="space-y-4">
                <Button 
                  className="w-full"
                  onClick={handleEnhance}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>Processing <span className="ml-2 animate-pulse">...</span></>
                  ) : (
                    <><Sparkles className="mr-2 h-4 w-4" /> Enhance with AI</>
                  )}
                </Button>
                
                <div className="bg-muted p-3 rounded-lg text-sm">
                  <p className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>
                      AI enhancement can improve:
                    </span>
                  </p>
                  <ul className="list-disc list-inside ml-6 mt-1 text-muted-foreground">
                    <li>Image resolution</li>
                    <li>Clarity and sharpness</li>
                    <li>Color balance</li>
                    <li>Noise reduction</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Brightness</label>
                      <span className="text-xs text-muted-foreground">{brightness[0]}%</span>
                    </div>
                    <Slider 
                      min={0} 
                      max={100} 
                      step={1} 
                      value={brightness}
                      onValueChange={setBrightness}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Contrast</label>
                      <span className="text-xs text-muted-foreground">{contrast[0]}%</span>
                    </div>
                    <Slider 
                      min={0} 
                      max={100} 
                      step={1} 
                      value={contrast}
                      onValueChange={setContrast}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Saturation</label>
                      <span className="text-xs text-muted-foreground">{saturation[0]}%</span>
                    </div>
                    <Slider 
                      min={0} 
                      max={100} 
                      step={1} 
                      value={saturation}
                      onValueChange={setSaturation}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Sharpness</label>
                      <span className="text-xs text-muted-foreground">{sharpness[0]}%</span>
                    </div>
                    <Slider 
                      min={0} 
                      max={100} 
                      step={1} 
                      value={sharpness}
                      onValueChange={setSharpness}
                    />
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleApplyAdjustments}
                    disabled={isProcessing}
                  >
                    <Sliders className="mr-2 h-4 w-4" /> Apply Adjustments
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {enhancedImage && (
          <div className="space-y-4">
            <h3 className="font-medium">Enhanced Image</h3>
            <Card className="overflow-hidden">
              <img
                src={enhancedImage}
                alt="Enhanced"
                className="w-full h-auto"
              />
            </Card>
            
            <div className="flex gap-2">
              <Button 
                className="flex-1"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
