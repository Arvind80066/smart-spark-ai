
import React, { useState } from "react";
import { Code, Copy, Check, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useToast } from "@/hooks/use-toast";

const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
];

const SAMPLE_CODE = `function bubbleSort(array) {
  const length = array.length;
  
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  
  return array;
}

// Test the function
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(numbers));`;

export default function CodeAssistant() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    setCode("");
    
    // Simulate code generation
    setTimeout(() => {
      setCode(SAMPLE_CODE);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (!code) return;
    
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast({
      title: "Code copied to clipboard",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRun = () => {
    if (!code) return;
    
    toast({
      title: "Code Execution",
      description: "In the final app, this would execute the code in a sandbox",
    });
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Code Assistant</h2>
          <p className="text-muted-foreground">
            Generate, explain, and debug code
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">What code do you need?</Label>
            <Textarea
              id="prompt"
              placeholder="E.g. Write a function to sort an array"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Programming Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
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

          <Button 
            className="w-full" 
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
          >
            {isGenerating ? (
              <>Generating <span className="typing-indicator ml-2"><span></span><span></span><span></span></span></>
            ) : (
              "Generate Code"
            )}
          </Button>
        </div>

        {code && (
          <Card className="overflow-hidden">
            <div className="bg-muted p-2 flex justify-between items-center border-b">
              <div className="flex items-center gap-2">
                <Code size={16} />
                <span className="text-sm font-medium">{language}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCopy}
                >
                  {isCopied ? <Check size={16} /> : <Copy size={16} />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRun}
                >
                  <Play size={16} />
                </Button>
              </div>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code>{code}</code>
            </pre>
          </Card>
        )}
      </div>
    </MobileLayout>
  );
}
