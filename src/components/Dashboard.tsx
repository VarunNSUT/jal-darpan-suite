import { Bell, BarChart3, TrendingUp, MessageCircle, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import indiaMap from "@/assets/india-groundwater-map.jpg";

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
          <h1 className="text-2xl font-bold text-foreground">JalDarpan</h1>
          <p className="text-sm text-muted-foreground">Groundwater Monitoring</p>
        </div>
        <button className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Map Section */}
      <div className="px-4 mb-6">
        <Card className="overflow-hidden bg-card shadow-card">
          <CardContent className="p-0">
            <div className="relative">
              <img 
                src={indiaMap} 
                alt="India Groundwater Map" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              
              {/* Sample data points */}
              <div className="absolute top-16 left-20 w-3 h-3 bg-data-excellent rounded-full shadow-glow animate-pulse" />
              <div className="absolute top-24 right-16 w-3 h-3 bg-data-moderate rounded-full shadow-glow animate-pulse" />
              <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-data-critical rounded-full shadow-glow animate-pulse" />
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2">Real-time Groundwater Status</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-data-excellent rounded-full" />
                  <span className="text-muted-foreground">Abundant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-data-moderate rounded-full" />
                  <span className="text-muted-foreground">Moderate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-data-critical rounded-full" />
                  <span className="text-muted-foreground">Critical</span>
                </div>
              </div>
            </div>
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