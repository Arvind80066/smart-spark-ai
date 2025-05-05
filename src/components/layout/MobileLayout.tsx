
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  MessageSquare, 
  Image, 
  Mic, 
  Volume2, 
  Code, 
  FileText, 
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink 
      to={to} 
      className={cn(
        "flex flex-col items-center justify-center gap-1 p-2 transition-colors",
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon size={20} />
      <span className="text-xs">{label}</span>
    </NavLink>
  );
};

export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full ai-gradient-bg"></div>
          <h1 className="text-xl font-bold">AI Powerhouse</h1>
        </div>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 overflow-auto pb-16">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full border-t bg-background flex justify-around items-center h-16">
        <NavItem to="/" icon={MessageSquare} label="Chat" />
        <NavItem to="/image-generator" icon={Image} label="Images" />
        <NavItem to="/speech-to-text" icon={Mic} label="STT" />
        <NavItem to="/text-to-speech" icon={Volume2} label="TTS" />
        <NavItem to="/code-assistant" icon={Code} label="Code" />
        <NavItem to="/documents" icon={FileText} label="Docs" />
        <NavItem to="/settings" icon={Settings} label="Settings" />
      </nav>
    </div>
  );
}
