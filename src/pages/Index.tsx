import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { HistoricalTrends } from "@/components/HistoricalTrends";
import { FutureProjections } from "@/components/FutureProjections";
import { AquaBot } from "@/components/AquaBot";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState("dashboard");

  const handleNavigate = (screen: string) => {
    setActiveScreen(screen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "trends":
        return <HistoricalTrends onBack={() => setActiveScreen("dashboard")} />;
      case "projections":
        return <FutureProjections onBack={() => setActiveScreen("dashboard")} />;
      case "aquabot":
        return <AquaBot onBack={() => setActiveScreen("dashboard")} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ScrollArea className="flex-1">
        {renderScreen()}
      </ScrollArea>
      <BottomNavigation 
        activeScreen={activeScreen} 
        onScreenChange={setActiveScreen} 
      />
    </div>
  );
};

export default Index;
