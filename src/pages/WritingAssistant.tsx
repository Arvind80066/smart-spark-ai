
import React, { useState } from "react";
import { Edit, Copy, RotateCcw, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useToast } from "@/hooks/use-toast";

const WRITING_STYLES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "creative", label: "Creative" },
  { value: "academic", label: "Academic" },
  { value: "technical", label: "Technical" },
  { value: "persuasive", label: "Persuasive" },
];

const WRITING_TASKS = [
  { value: "improve", label: "Improve Writing" },
  { value: "rewrite", label: "Rewrite" },
  { value: "summarize", label: "Summarize" },
  { value: "expand", label: "Expand" },
  { value: "brainstorm", label: "Brainstorm Ideas" },
];

export default function WritingAssistant() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [style, setStyle] = useState("professional");
  const [task, setTask] = useState("improve");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleProcess = () => {
    if (!text) return;
    
    setIsProcessing(true);
    setResult("");
    
    // Simulate AI processing (this would call a real AI API in production)
    setTimeout(() => {
      let output = "";
      
      switch (task) {
        case "improve":
          output = `This is a simulated improved version of your text in ${getStyleName(style)} style.\n\n${text}\n\nThe improvements include better word choice, clearer sentence structure, and more engaging tone.`;
          break;
        case "rewrite":
          output = `This is a simulated rewrite of your text in ${getStyleName(style)} style.\n\n${text.split('').reverse().join('')}\n\nThe rewrite maintains your core message while enhancing clarity and impact.`;
          break;
        case "summarize":
          output = `Summary (${getStyleName(style)} style):\n\nThis is a simulated summary of the key points from your longer text. In a real app, this would extract the most important information while maintaining context.`;
          break;
        case "expand":
          output = `Expanded version (${getStyleName(style)} style):\n\n${text}\n\nThis is a simulated expansion of your original text with additional details, examples, and supporting points to enrich your content.`;
          break;
        case "brainstorm":
          output = `Brainstorming ideas (${getStyleName(style)} style):\n\n1. First idea related to your topic\n2. Second idea with a different perspective\n3. Third idea that builds on your original concept\n4. Fourth idea that takes a creative approach\n5. Fifth idea that addresses potential challenges`;
          break;
        default:
          output = `Processed text in ${getStyleName(style)} style.`;
      }
      
      setResult(output);
      setIsProcessing(false);
      
      toast({
        title: "Processing complete",
        description: `Your text has been ${task}ed in ${getStyleName(style)} style`,
      });
    }, 2000);
  };

  const handleCopy = () => {
    if (!result) return;
    
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    
    toast({
      title: "Copied to clipboard",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setText("");
    setResult("");
  };

  const getStyleName = (styleValue: string) => {
    return WRITING_STYLES.find(s => s.value === styleValue)?.label || styleValue;
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Writing Assistant</h2>
          <p className="text-muted-foreground">
            Get help with your writing tasks
          </p>
        </div>

        <Tabs defaultValue="write" className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="write" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Task</label>
                <Select value={task} onValueChange={setTask}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select task" />
                  </SelectTrigger>
                  <SelectContent>
                    {WRITING_TASKS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Style</label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {WRITING_STYLES.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Text</label>
              <Textarea
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                className="flex-1"
                onClick={handleProcess}
                disabled={!text || isProcessing}
              >
                {isProcessing ? (
                  <>Processing <span className="ml-2 animate-pulse">...</span></>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" /> Process</>
                )}
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleReset}
                disabled={!text && !result}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            
            {result && (
              <Card className="p-4 relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8" 
                  onClick={handleCopy}
                >
                  {isCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <div className="pt-6">
                  <p className="whitespace-pre-wrap">{result}</p>
                </div>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Professional Email", desc: "For business communication" },
                { title: "Cover Letter", desc: "For job applications" },
                { title: "Blog Post", desc: "For content creation" },
                { title: "Social Media", desc: "For engaging posts" },
                { title: "Meeting Notes", desc: "For documentation" },
                { title: "Product Description", desc: "For marketing" },
              ].map((template, index) => (
                <Card 
                  key={index} 
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h3 className="font-medium">{template.title}</h3>
                  <p className="text-sm text-muted-foreground">{template.desc}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="bg-muted p-4 rounded-lg">
          <h3 className="flex items-center gap-2 font-medium mb-2">
            <Edit className="h-4 w-4" /> Tips
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Be specific about what you want to achieve</li>
            <li>Provide context for better results</li>
            <li>Try different styles to find the right tone</li>
            <li>Use templates for common writing tasks</li>
          </ul>
        </Card>
      </div>
    </MobileLayout>
  );
}
