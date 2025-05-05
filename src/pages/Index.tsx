
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare, 
  Image, 
  Mic, 
  Volume2, 
  FileText, 
  Code,
  Clock,
  Plus,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

// Example tips for the rotating banner
const TIPS = [
  "Try converting voice notes to text using the Speech to Text tool.",
  "Generate images from text descriptions with the Image Generator.",
  "Summarize long documents instantly with the PDF Summarizer.",
  "AI doesn't replace humans, it amplifies them.",
  "Code faster with the help of the Code Assistant."
];

// Featured tool definition
interface ToolCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}

export default function Index() {
  const navigate = useNavigate();
  const [currentTip, setCurrentTip] = React.useState(0);
  
  // Rotate through tips every 8 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % TIPS.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Featured tools to display
  const featuredTools: ToolCard[] = [
    {
      icon: <MessageSquare size={24} />,
      title: "Chat with AI",
      description: "Get answers and assistance",
      to: "/",
    },
    {
      icon: <Image size={24} />,
      title: "Image Generator",
      description: "Create images from text",
      to: "/image-generator",
    },
    {
      icon: <Mic size={24} />,
      title: "Speech to Text",
      description: "Convert voice to text",
      to: "/speech-to-text",
    },
    {
      icon: <Volume2 size={24} />,
      title: "Text to Speech",
      description: "Convert text to audio",
      to: "/text-to-speech",
    },
    {
      icon: <FileText size={24} />,
      title: "PDF Summarizer",
      description: "Extract key points",
      to: "/documents",
    },
    {
      icon: <Code size={24} />,
      title: "Code Assistant",
      description: "Help with coding tasks",
      to: "/code-assistant",
    },
  ];
  
  // Recent activities (placeholder data)
  const recentActivities = [
    {
      id: 1,
      type: "Chat",
      title: "AI Conversation",
      time: "2 hours ago",
      to: "/"
    },
    {
      id: 2,
      type: "Image",
      title: "Generated Image",
      time: "Yesterday",
      to: "/image-generator"
    },
  ];
  
  return (
    <MobileLayout>
      <div className="flex flex-col min-h-[calc(100vh-4rem)] p-4 space-y-6 pb-20">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-bold">Hello, User 👋</h1>
          <p className="text-muted-foreground">What would you like to explore today?</p>
          <p className="text-xs text-muted-foreground">Your AI tools, all in one place.</p>
        </motion.div>
        
        {/* Featured Tools */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Featured Tools</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm"
              onClick={() => navigate('/tools')}
            >
              View all
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
          
          <div className="flex overflow-x-auto pb-2 -mx-1 snap-x">
            {featuredTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                className="w-32 min-w-[8rem] px-1 snap-start"
              >
                <Card 
                  className="flex flex-col items-center p-3 h-full hover:shadow-md hover:bg-accent/30 transition-all cursor-pointer border border-border/50 bg-card/50 backdrop-blur-sm"
                  onClick={() => navigate(tool.to)}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                    {tool.icon}
                  </div>
                  <h3 className="font-medium text-center text-sm mb-1">{tool.title}</h3>
                  <p className="text-xs text-center text-muted-foreground">{tool.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Recent Activity Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm"
              onClick={() => navigate('/history')}
            >
              History
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
          
          {recentActivities.length > 0 ? (
            <div className="space-y-2">
              {recentActivities.map((activity) => (
                <Card 
                  key={activity.id}
                  className="p-3 flex items-center space-x-3 hover:shadow-md transition-all cursor-pointer border border-border/50 bg-card/50 backdrop-blur-sm"
                  onClick={() => navigate(activity.to)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Clock size={16} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{activity.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{activity.type}</span>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-4 border border-border/50 bg-card/50 backdrop-blur-sm text-center">
              <p className="text-muted-foreground text-sm">
                Your recent activities will appear here
              </p>
            </Card>
          )}
        </motion.div>
        
        {/* Tip Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="overflow-hidden border border-border/50 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm">
            <div className="p-4 flex items-start gap-3">
              <div className="mt-1 bg-primary/20 rounded-full p-1">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1">Did you know?</h4>
                <p className="text-sm text-muted-foreground">
                  {TIPS[currentTip]}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Floating Action Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="fixed bottom-20 right-4"
        >
          <Button 
            size="icon" 
            className="h-12 w-12 rounded-full shadow-lg"
            onClick={() => navigate('/tools')}
          >
            <Plus size={24} />
          </Button>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
