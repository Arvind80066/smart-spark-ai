
import React, { useState } from "react";
import { Volume2, Play, Pause, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useToast } from "@/hooks/use-toast";

const VOICE_OPTIONS = [
  { value: "female_en", label: "Female (English)" },
  { value: "male_en", label: "Male (English)" },
  { value: "female_hi", label: "Female (Hindi)" },
  { value: "male_hi", label: "Male (Hindi)" },
];

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("female_en");
  const [speed, setSpeed] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handlePlay = () => {
    if (!text) {
      toast({
        title: "No text to speak",
        description: "Please enter some text first",
        variant: "destructive",
      });
      return;
    }

    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      toast({
        title: "Playing audio",
        description: "In the final app, this would use a real TTS engine",
      });
      
      // Simulate stopping after 3 seconds
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  const handleSave = () => {
    if (!text) return;
    
    toast({
      title: "Audio saved",
      description: "In the final app, this would save the generated audio file",
    });
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Text to Speech</h2>
          <p className="text-muted-foreground">
            Convert text to natural-sounding speech
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Enter text to convert</Label>
            <Textarea
              id="text"
              placeholder="Type or paste text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="voice">Voice</Label>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {VOICE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="speed">Speed</Label>
              <span className="text-sm text-muted-foreground">
                {speed[0]}x
              </span>
            </div>
            <Slider
              id="speed"
              min={0.5}
              max={2}
              step={0.1}
              value={speed}
              onValueChange={setSpeed}
            />
          </div>

          <div className="flex gap-4">
            <Button 
              className="flex-1"
              onClick={handlePlay}
              disabled={!text}
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> Play
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSave}
              disabled={!text}
            >
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h3 className="flex items-center gap-2 font-medium mb-2">
            <Volume2 className="h-4 w-4" /> Tips
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>For best results, use proper punctuation</li>
            <li>Adjust speed to match your preference</li>
            <li>Save audio for offline listening</li>
          </ul>
        </div>
      </div>
    </MobileLayout>
  );
}
