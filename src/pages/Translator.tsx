
import React, { useState } from "react";
import { Languages, Copy, ArrowDownUp, VolumeUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useToast } from "@/hooks/use-toast";

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese" },
  { value: "ar", label: "Arabic" },
  { value: "hi", label: "Hindi" },
];

export default function Translator() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleTranslate = () => {
    if (!sourceText) return;
    
    setIsTranslating(true);
    
    // Simulate translation (this would call a real API in production)
    setTimeout(() => {
      setTranslatedText(`This is a simulated translation. In a real app, the ${sourceText} would be translated from ${getLanguageName(sourceLanguage)} to ${getLanguageName(targetLanguage)} using a translation API.`);
      setIsTranslating(false);
      
      toast({
        title: "Translation complete",
        description: "Translation API would be integrated in the final version",
      });
    }, 1500);
  };

  const handleCopy = () => {
    if (!translatedText) return;
    
    navigator.clipboard.writeText(translatedText);
    setIsCopied(true);
    
    toast({
      title: "Copied to clipboard",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSwapLanguages = () => {
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const getLanguageName = (code: string) => {
    return LANGUAGE_OPTIONS.find(lang => lang.value === code)?.label || code;
  };

  const handleSpeak = (text: string) => {
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLanguage;
    speechSynthesis.speak(utterance);
    
    toast({
      title: "Text-to-Speech",
      description: "Playing audio",
    });
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Translator</h2>
          <p className="text-muted-foreground">
            Translate text between different languages
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleSwapLanguages}
              className="rounded-full"
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
            
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Enter text to translate..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="min-h-[100px]"
            />
            
            <Button 
              className="w-full" 
              onClick={handleTranslate}
              disabled={!sourceText || isTranslating}
            >
              {isTranslating ? "Translating..." : "Translate"}
            </Button>
          </div>

          {translatedText && (
            <Card className="p-4 relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleSpeak(translatedText)}
                >
                  <VolumeUp className="h-4 w-4" />
                </Button>
              </div>
              <div className="pt-6">
                <p className="whitespace-pre-wrap">{translatedText}</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
