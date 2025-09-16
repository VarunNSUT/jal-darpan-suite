import { Bell, BarChart3, TrendingUp, MessageCircle, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import InteractiveMap from "./InteractiveMap";

const navigationCards = [
  {
    id: 'trends',
    title: 'Historical Trends',
    icon: BarChart3,
    description: 'View past data'
  },
  {
    id: 'projections',
    title: 'Future Projections',
    icon: TrendingUp,
    description: 'Forecast analysis'
  },
  {
    id: 'aquabot',
    title: 'AquaBot Assistant',
    icon: MessageCircle,
    description: 'AI-powered help'
  },
  {
    id: 'reports',
    title: 'Data Reports',
    icon: FileText,
    description: 'Generate PDFs'
  }
];

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AppName</h1>
          <p className="text-sm text-muted-foreground">Groundwater Monitoring</p>
        </div>
        <button className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Interactive Map Section with Search */}
      <div className="px-4 mb-6">
        <Card className="overflow-hidden bg-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Interactive Groundwater Map</h3>
              <span className="text-xs text-muted-foreground">Click on map or search locations</span>
            </div>
            <InteractiveMap 
              onLocationClick={(location) => {
                console.log('Location clicked:', location);
                // Handle location click - could show detailed data popup
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Navigation Cards */}
      <div className="px-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Explore Data</h2>
        <div className="grid grid-cols-2 gap-3 mb-20">
          {navigationCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card 
                key={card.id}
                className="bg-secondary/50 hover:bg-secondary cursor-pointer transition-all duration-200 hover:shadow-glow"
                onClick={() => onNavigate(card.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="mb-3 flex justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-1">{card.title}</h3>
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}