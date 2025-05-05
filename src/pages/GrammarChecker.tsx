
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";

export default function GrammarChecker() {
  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Grammar Checker</h1>
          <p className="text-muted-foreground">Check and correct grammar</p>
        </div>
        
        <div className="flex flex-col items-center justify-center h-60 bg-muted/30 rounded-lg border border-dashed">
          <p className="text-muted-foreground">
            Grammar Checker feature coming soon
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
