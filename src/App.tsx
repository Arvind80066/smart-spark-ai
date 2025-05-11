
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LaunchScreen } from "@/components/LaunchScreen";
import { AuthProvider } from "@/contexts/AuthContext";
import { ApiKeysProvider } from "@/contexts/ApiKeysContext";
import { useAuth } from "@/contexts/AuthContext";
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
import Auth from "./pages/Auth";
import ApiKeys from "./pages/ApiKeys";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
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
    <>
      {showLaunchScreen ? (
        <LaunchScreen onComplete={handleLaunchComplete} />
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/tools" element={<ProtectedRoute><Tools /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/api-keys" element={<ProtectedRoute><ApiKeys /></ProtectedRoute>} />
          <Route path="/image-generator" element={<ProtectedRoute><ImageGenerator /></ProtectedRoute>} />
          <Route path="/speech-to-text" element={<ProtectedRoute><SpeechToText /></ProtectedRoute>} />
          <Route path="/text-to-speech" element={<ProtectedRoute><TextToSpeech /></ProtectedRoute>} />
          <Route path="/code-assistant" element={<ProtectedRoute><CodeAssistant /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/writing-assistant" element={<ProtectedRoute><WritingAssistant /></ProtectedRoute>} />
          <Route path="/translator" element={<ProtectedRoute><Translator /></ProtectedRoute>} />
          <Route path="/grammar-checker" element={<ProtectedRoute><GrammarChecker /></ProtectedRoute>} />
          <Route path="/image-enhancer" element={<ProtectedRoute><ImageEnhancer /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AuthProvider>
            <ApiKeysProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </ApiKeysProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
