
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Grid, History, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const getInitials = () => {
    if (!user) return "?";
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(" ")
        .map((name: string) => name[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return user.email ? user.email[0].toUpperCase() : "?";
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };
  
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
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/api-keys")}>
                API Keys
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
