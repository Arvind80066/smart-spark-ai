
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";

export default function ImageEnhancer() {
  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Image Enhancer</h1>
          <p className="text-muted-foreground">Enhance image quality</p>
        </div>
        
        <div className="flex flex-col items-center justify-center h-60 bg-muted/30 rounded-lg border border-dashed">
          <p className="text-muted-foreground">
            Image Enhancer feature coming soon
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
