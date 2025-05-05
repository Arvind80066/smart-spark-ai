
import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function History() {
  // Placeholder history data
  const historyItems = [
    {
      id: 1,
      type: "Chat",
      title: "Marketing Strategy",
      date: "Today, 2:30 PM"
    },
    {
      id: 2,
      type: "Image",
      title: "Mountain landscape",
      date: "Today, 11:45 AM"
    },
    {
      id: 3,
      type: "Code",
      title: "React component",
      date: "Yesterday, 5:20 PM"
    },
    {
      id: 4, 
      type: "Chat",
      title: "Product description",
      date: "Yesterday, 3:15 PM"
    }
  ];

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-muted-foreground">Your recent activities</p>
        </div>
        
        {historyItems.length > 0 ? (
          <div className="space-y-3">
            {historyItems.map((item) => (
              <Card key={item.id} className="p-3 flex items-center space-x-3 hover:shadow-md transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded">{item.type}</span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-60 bg-muted/30 rounded-lg border border-dashed">
            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Your activity history will appear here
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
