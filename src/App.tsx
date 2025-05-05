
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LaunchScreen } from "@/components/LaunchScreen";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import History from "./pages/History";
import Profile from "./pages/Profile";
import ImageGenerator from "./pages/ImageGenerator";
import SpeechToText from "./pages/SpeechToText";
import TextToSpeech from "./pages/TextToSpeech";
import CodeAssistant from "./pages/CodeAssistant";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import WritingAssistant from "./pages/WritingAssistant";
import Translator from "./pages/Translator";
import GrammarChecker from "./pages/GrammarChecker";
import ImageEnhancer from "./pages/ImageEnhancer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showLaunchScreen, setShowLaunchScreen] = useState(true);
  
  // Check if the app has been launched before in this session
  useEffect(() => {
    const hasLaunched = sessionStorage.getItem("hasLaunched");
    if (hasLaunched) {
      setShowLaunchScreen(false);
    } else {
      // Set a flag in session storage so the launch screen only shows once per session
      sessionStorage.setItem("hasLaunched", "true");
    }
  }, []);

  const handleLaunchComplete = () => {
    setShowLaunchScreen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showLaunchScreen ? (
            <LaunchScreen onComplete={handleLaunchComplete} />
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/image-generator" element={<ImageGenerator />} />
                <Route path="/speech-to-text" element={<SpeechToText />} />
                <Route path="/text-to-speech" element={<TextToSpeech />} />
                <Route path="/code-assistant" element={<CodeAssistant />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/writing-assistant" element={<WritingAssistant />} />
                <Route path="/translator" element={<Translator />} />
                <Route path="/grammar-checker" element={<GrammarChecker />} />
                <Route path="/image-enhancer" element={<ImageEnhancer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
