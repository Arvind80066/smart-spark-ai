
import React, { useState, useEffect } from "react";
import { Mic, MicOff, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useToast } from "@/hooks/use-toast";

export default function SpeechToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  // Simulated recording status
  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(() => {
        setTranscript(prev => 
          prev + (prev ? " " : "") + "This is a simulated transcription. In the final app, this would be real speech converted to text."
        );
        setIsRecording(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      });
    } else {
      setIsRecording(false);
      toast({
        title: "Recording stopped",
      });
    }
  };

  const handleCopy = () => {
    if (!transcript) return;
    
    navigator.clipboard.writeText(transcript);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setTranscript("");
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Speech to Text</h2>
          <p className="text-muted-foreground">
            Convert your voice to text in real-time
          </p>
        </div>

        <Card className="p-6 flex flex-col items-center">
          <div 
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 mb-4 ${
              isRecording 
                ? "bg-destructive animate-pulse" 
                : "bg-primary"
            }`}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <MicOff className="h-10 w-10 text-destructive-foreground" />
            ) : (
              <Mic className="h-10 w-10 text-primary-foreground" />
            )}
          </div>
          
          <p className="font-medium">
            {isRecording ? "Tap to stop recording" : "Tap to start recording"}
          </p>
          
          {isRecording && (
            <div className="typing-indicator mt-2">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </Card>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Transcript</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                disabled={!transcript}
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClear}
                disabled={!transcript}
              >
                Clear
              </Button>
            </div>
          </div>
          
          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your transcription will appear here..."
            className="min-h-[150px]"
          />
        </div>
      </div>
    </MobileLayout>
  );
}
