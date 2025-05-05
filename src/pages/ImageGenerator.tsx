
import React, { useState } from "react";
import { Download, Image as ImageIcon, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { MobileLayout } from "@/components/layout/MobileLayout";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

const STYLE_OPTIONS = [
  { value: "realistic", label: "Realistic" },
  { value: "cartoon", label: "Cartoon" },
  { value: "anime", label: "Anime" },
  { value: "painting", label: "Painting" },
  { value: "sketch", label: "Sketch" },
  { value: "3d", label: "3D Render" },
];

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    setGeneratedImage(null);
    
    // Simulate image generation (this would call an actual API in production)
    setTimeout(() => {
      setGeneratedImage(PLACEHOLDER_IMAGE);
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    // In a real app, this would download the actual image
    const a = document.createElement("a");
    a.href = generatedImage;
    a.download = `ai-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = () => {
    if (!generatedImage) return;
    
    // In a real app, this would use the Web Share API if available
    alert("Sharing would be implemented in the final app!");
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Image Generator</h2>
          <p className="text-muted-foreground">
            Create unique images from text descriptions
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Describe your image</Label>
            <Input
              id="prompt"
              placeholder="A futuristic city with flying cars..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                {STYLE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Image"}
          </Button>
        </div>

        {(isGenerating || generatedImage) && (
          <Card className="overflow-hidden">
            <div className="aspect-square relative bg-muted/30">
              {isGenerating ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="ai-gradient-bg w-12 h-12 rounded-full animate-pulse-light"></div>
                </div>
              ) : generatedImage ? (
                <>
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-3 flex justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDownload}
                    >
                      <Download size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleShare}
                    >
                      <Share2 size={18} />
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          </Card>
        )}

        {!isGenerating && !generatedImage && (
          <div className="flex flex-col items-center justify-center h-60 bg-muted/30 rounded-lg border border-dashed">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Your generated image will appear here
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
