import { MapPin, TrendingUp, Activity, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

const navigationItems = [
  { id: 'dashboard', icon: MapPin, label: 'Dashboard' },
  { id: 'trends', icon: TrendingUp, label: 'Trends' },
  { id: 'projections', icon: Activity, label: 'Projections' },
  { id: 'aquabot', icon: MessageCircle, label: 'AquaBot' },
];

export function BottomNavigation({ activeScreen, onScreenChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around py-2 px-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-primary/20 text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "drop-shadow-glow")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}