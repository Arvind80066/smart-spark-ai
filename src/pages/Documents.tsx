
import React, { useState } from "react";
import { FileText, Upload, FileQuestion, List, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useToast } from "@/hooks/use-toast";

export default function Documents() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSummary("");
    }
  };
  
  const handleUpload = () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setSummary("This is a simulated document summary. In the final app, this would analyze the actual PDF content and provide a comprehensive summary with key points extracted from the document.");
      setIsProcessing(false);
      
      toast({
        title: "Document processed",
        description: "Summary generated successfully",
      });
    }, 2000);
  };
  
  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Document Assistant</h2>
          <p className="text-muted-foreground">
            Upload documents to summarize and analyze
          </p>
        </div>
        
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-center flex-col">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-lg">Upload Document</h3>
              <p className="text-muted-foreground text-center text-sm mt-1">
                PDF files up to 10MB are supported
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground"
                />
              </div>
              
              {file && (
                <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {Math.round(file.size / 1024)} KB
                  </span>
                </div>
              )}
              
              <Button 
                onClick={handleUpload} 
                disabled={!file || isProcessing}
                className="w-full"
              >
                {isProcessing ? "Processing..." : "Analyze Document"}
              </Button>
            </div>
          </div>
        </Card>
        
        {summary && (
          <Card className="overflow-hidden">
            <Tabs defaultValue="summary">
              <div className="border-b">
                <TabsList className="w-full justify-start rounded-none h-12 bg-transparent border-b px-4">
                  <TabsTrigger value="summary" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    <AlignLeft className="h-4 w-4 mr-2" />
                    Summary
                  </TabsTrigger>
                  <TabsTrigger value="key-points" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    <List className="h-4 w-4 mr-2" />
                    Key Points
                  </TabsTrigger>
                  <TabsTrigger value="questions" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    <FileQuestion className="h-4 w-4 mr-2" />
                    Q&A
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="summary" className="p-6">
                <h3 className="font-medium mb-2">Document Summary</h3>
                <p className="whitespace-pre-wrap text-sm">
                  {summary}
                </p>
              </TabsContent>
              
              <TabsContent value="key-points" className="p-6">
                <h3 className="font-medium mb-2">Key Points</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>First key point extracted from the document</li>
                  <li>Second important concept identified</li>
                  <li>Third major idea from the content</li>
                  <li>Fourth significant finding</li>
                  <li>Fifth notable element worth highlighting</li>
                </ul>
              </TabsContent>
              
              <TabsContent value="questions" className="p-6">
                <h3 className="font-medium mb-2">Ask about the document</h3>
                <div className="space-y-4">
                  <Input placeholder="Ask a question about the document..." />
                  <Button className="w-full">Ask Question</Button>
                  
                  <div className="text-center text-sm text-muted-foreground pt-4">
                    Questions will be answered based on the document content
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </MobileLayout>
  );
}
