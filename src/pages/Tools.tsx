
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  Image, 
  Mic, 
  Volume2, 
  Code, 
  FileText, 
  Edit,
  Translate,
  GrammarCase,
  ImagePlus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}

const ToolCard = ({ icon, title, description, to }: ToolCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="flex flex-col items-center p-4 h-full hover:shadow-md transition-all cursor-pointer"
      onClick={() => navigate(to)}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
        {icon}
      </div>
      <h3 className="font-medium text-center mb-1">{title}</h3>
      <p className="text-xs text-center text-muted-foreground">{description}</p>
    </Card>
  );
};

export default function Tools() {
  const tools = [
    {
      icon: <MessageSquare size={24} />,
      title: "AI Chat",
      description: "Chat with AI assistant",
      to: "/"
    },
    {
      icon: <Image size={24} />,
      title: "Image Generator",
      description: "Create images from text",
      to: "/image-generator"
    },
    {
      icon: <Mic size={24} />,
      title: "Speech to Text",
      description: "Convert voice to text",
      to: "/speech-to-text"
    },
    {
      icon: <Volume2 size={24} />,
      title: "Text to Speech",
      description: "Convert text to voice",
      to: "/text-to-speech"
    },
    {
      icon: <Code size={24} />,
      title: "Code Assistant",
      description: "Help with coding tasks",
      to: "/code-assistant"
    },
    {
      icon: <Edit size={24} />,
      title: "Writing Assistant",
      description: "Help with writing content",
      to: "/writing-assistant"
    },
    {
      icon: <FileText size={24} />,
      title: "PDF Summarizer",
      description: "Extract key points from PDFs",
      to: "/documents"
    },
    {
      icon: <Translate size={24} />,
      title: "Translator",
      description: "Translate between languages",
      to: "/translator"
    },
    {
      icon: <GrammarCase size={24} />,
      title: "Grammar Checker",
      description: "Check and correct grammar",
      to: "/grammar-checker"
    },
    {
      icon: <ImagePlus size={24} />,
      title: "Image Enhancer",
      description: "Enhance image quality",
      to: "/image-enhancer"
    }
  ];

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">AI Tools</h1>
          <p className="text-muted-foreground">Select a tool to get started</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool, index) => (
            <ToolCard 
              key={index}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              to={tool.to}
            />
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
