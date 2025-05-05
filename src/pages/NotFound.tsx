
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileLayout } from "@/components/layout/MobileLayout";

export default function NotFound() {
  const location = useLocation();

  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center h-[80vh] p-4 text-center">
        <div className="mb-6 w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl mb-6">Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page <code className="bg-muted px-1 py-0.5 rounded">{location.pathname}</code> doesn't exist.
        </p>
        <Button asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </MobileLayout>
  );
}
