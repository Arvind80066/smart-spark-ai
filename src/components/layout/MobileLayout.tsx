
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Grid, History, User } from "lucide-react";
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
          <img 
            src="/lovable-uploads/dd0646a7-9a45-4b11-a407-28ccef2a3d74.png" 
            alt="AI Powerhouse Logo" 
            className="w-8 h-8 rounded-full object-cover"
          />
          <h1 className="text-xl font-bold">AI Powerhouse</h1>
        </div>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 overflow-auto pb-16">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full border-t bg-background flex justify-around items-center h-16">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/tools" icon={Grid} label="Tools" />
        <NavItem to="/history" icon={History} label="History" />
        <NavItem to="/profile" icon={User} label="Profile" />
      </nav>
    </div>
  );
}
