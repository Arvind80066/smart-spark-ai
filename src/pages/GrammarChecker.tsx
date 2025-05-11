
import React, { useState } from "react";
import { Check, AlertTriangle, Copy, RotateCcw, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useToast } from "@/hooks/use-toast";

interface CorrectionType {
  original: string;
  suggestion: string;
  type: 'grammar' | 'spelling' | 'style' | 'punctuation';
  position: [number, number]; // start, end
}

export default function GrammarChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [corrections, setCorrections] = useState<CorrectionType[]>([]);
  const { toast } = useToast();

  const handleCheck = () => {
    if (!text) return;
    
    setIsChecking(true);
    setResult("");
    setCorrections([]);
    setScore(null);
    
    // Simulate grammar checking (this would call a real API in production)
    setTimeout(() => {
      // Example corrections - in a real app these would come from the API
      const simulatedCorrections: CorrectionType[] = [
        {
          original: "its",
          suggestion: "it's",
          type: "grammar",
          position: [text.indexOf("its"), text.indexOf("its") + 3]
        } as CorrectionType,
        {
          original: "alot",
          suggestion: "a lot",
          type: "spelling",
          position: [text.indexOf("alot"), text.indexOf("alot") + 4]
        } as CorrectionType,
        {
          original: "i",
          suggestion: "I",
          type: "grammar",
          position: [text.indexOf("i"), text.indexOf("i") + 1]
        } as CorrectionType,
        {
          original: "very very",
          suggestion: "extremely",
          type: "style",
          position: [text.indexOf("very very"), text.indexOf("very very") + 9]
        } as CorrectionType
      ].filter(c => c.position[0] !== -1); // Only include corrections that exist in the text
      
      let correctedText = text;
      
      // Apply corrections to create the result text
      if (simulatedCorrections.length > 0) {
        simulatedCorrections.forEach(corr => {
          const before = correctedText.substring(0, corr.position[0]);
          const after = correctedText.substring(corr.position[1]);
          correctedText = before + corr.suggestion + after;
        });
      } else {
        correctedText = text;
      }
      
      setResult(correctedText);
      setCorrections(simulatedCorrections);
      
      // Generate a random score between 70 and 100
      const randomScore = Math.floor(Math.random() * 31) + 70;
      setScore(randomScore);
      
      setIsChecking(false);
      
      toast({
        title: "Grammar check complete",
        description: simulatedCorrections.length > 0 
          ? `${simulatedCorrections.length} issues found`
          : "No issues found",
      });
    }, 2000);
  };

  const handleApplyCorrections = () => {
    if (!result) return;
    
    setText(result);
    setResult("");
    setCorrections([]);
    setScore(null);
    
    toast({
      title: "Corrections applied",
    });
  };

  const handleReset = () => {
    setText("");
    setResult("");
    setCorrections([]);
    setScore(null);
  };

  const renderCorrectionType = (type: string) => {
    switch (type) {
      case 'grammar':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">Grammar</Badge>;
      case 'spelling':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">Spelling</Badge>;
      case 'style':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-200">Style</Badge>;
      case 'punctuation':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-200">Punctuation</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Grammar Checker</h2>
          <p className="text-muted-foreground">
            Check and correct grammar, spelling, and style
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Text</label>
            <Textarea
              placeholder="Enter or paste your text here to check for grammar and spelling errors..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[150px]"
            />
            
            <div className="text-xs text-right text-muted-foreground">
              {text.length} characters
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={handleCheck}
              disabled={!text || isChecking}
            >
              {isChecking ? (
                <>Checking <span className="ml-2 animate-pulse">...</span></>
              ) : (
                <><Check className="mr-2 h-4 w-4" /> Check Grammar</>
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
        </div>

        {score !== null && (
          <Card className="overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Writing Score</h3>
                <span className={`text-xl font-bold ${getScoreColor(score)}`}>
                  {score}%
                </span>
              </div>
              <Progress 
                value={score} 
                className="h-2 mt-2" 
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-medium mb-4">Issues Found</h3>
              
              {corrections.length === 0 ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span>No issues found! Your text looks great.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {corrections.map((correction, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg bg-muted/50">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="line-through text-red-500 mr-2">{correction.original}</span>
                            <span className="text-green-500">{correction.suggestion}</span>
                          </div>
                          {renderCorrectionType(correction.type)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {result && corrections.length > 0 && (
              <div className="p-4 border-t">
                <h3 className="font-medium mb-2">Corrected Text</h3>
                <Card className="p-3 bg-muted/30">
                  <p className="whitespace-pre-wrap">{result}</p>
                </Card>
                <Button 
                  className="w-full mt-4"
                  onClick={handleApplyCorrections}
                >
                  Apply Corrections
                </Button>
              </div>
            )}
          </Card>
        )}
        
        <Card className="bg-muted p-4 rounded-lg">
          <h3 className="flex items-center gap-2 font-medium mb-2">
            <PenTool className="h-4 w-4" /> Writing Tips
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Use active voice instead of passive voice</li>
            <li>Vary sentence length for better readability</li>
            <li>Avoid using too many adverbs</li>
            <li>Be consistent with tense throughout your text</li>
          </ul>
        </Card>
      </div>
    </MobileLayout>
  );
}
