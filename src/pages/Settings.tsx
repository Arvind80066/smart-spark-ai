
import React from "react";
import { Moon, Sun, Globe, Bell, Lock, Database, CreditCard, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  const handleReset = () => {
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values",
    });
  };
  
  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">
            Customize your AI Powerhouse experience
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Sun className="h-5 w-5" /> Appearance
            </h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme">Theme</Label>
                <div className="text-sm text-muted-foreground">
                  Choose between light and dark mode
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="px-3"
                >
                  <Sun className="h-4 w-4 mr-2" /> Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="px-3"
                >
                  <Moon className="h-4 w-4 mr-2" /> Dark
                </Button>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Globe className="h-5 w-5" /> Language & Region
            </h3>
            <div className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="language">App Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Bell className="h-5 w-5" /> Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className="flex flex-col gap-1">
                  <span>Push Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive alerts for important updates
                  </span>
                </Label>
                <Switch id="push-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="flex flex-col gap-1">
                  <span>Email Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive weekly summaries
                  </span>
                </Label>
                <Switch id="email-notifications" />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Lock className="h-5 w-5" /> Privacy & Security
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="chat-history" className="flex flex-col gap-1">
                  <span>Save Chat History</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Store conversations for future reference
                  </span>
                </Label>
                <Switch id="chat-history" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics" className="flex flex-col gap-1">
                  <span>Usage Analytics</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Help improve the app with anonymous data
                  </span>
                </Label>
                <Switch id="analytics" defaultChecked />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Database className="h-5 w-5" /> Data & Storage
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Storage Used</Label>
                  <div className="text-sm text-muted-foreground">
                    12 MB of 100 MB
                  </div>
                </div>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[12%]"></div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Clear Cache
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Subscription
            </h3>
            <div className="space-y-3">
              <div className="bg-muted p-4 rounded-lg">
                <div className="font-medium">Free Plan</div>
                <div className="text-sm text-muted-foreground">
                  Limited to 5 AI chat messages per day
                </div>
              </div>
              <Button className="w-full">Upgrade to Premium</Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <HelpCircle className="h-5 w-5" /> Help & Support
            </h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                FAQ & Tutorials
              </Button>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="destructive" onClick={handleReset} className="w-full">
              Reset All Settings
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground pt-4">
            AI Powerhouse v1.0.0
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
