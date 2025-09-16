import { ArrowLeft, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const historicalData = [
  { year: "2019", level: 12.5 },
  { year: "2020", level: 11.8 },
  { year: "2021", level: 13.2 },
  { year: "2022", level: 10.9 },
  { year: "2023", level: 9.7 },
  { year: "2024", level: 8.4 },
];

const chartConfig = {
  level: {
    label: "Water Level (m)",
    color: "hsl(var(--primary))",
  },
};

interface HistoricalTrendsProps {
  onBack: () => void;
}

export function HistoricalTrends({ onBack }: HistoricalTrendsProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pt-8">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
          className="text-foreground hover:bg-secondary"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Historical Trends</h1>
          <p className="text-sm text-muted-foreground">Groundwater level analysis</p>
        </div>
      </div>

      {/* Region Selector */}
      <div className="px-4 mb-6">
        <Card className="bg-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Selected Region</p>
                <p className="font-medium text-foreground">Punjab, India</p>
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="flex-1 px-4 mb-6">
        <Card className="h-full bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Groundwater Levels (2019-2024)
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Historical groundwater level data in meters below surface
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="year" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    label={{ value: 'Level (m)', angle: -90, position: 'insideLeft' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="level" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    className="drop-shadow-glow"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="px-4 pb-20">
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-secondary/50">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-primary">12.5m</p>
              <p className="text-xs text-muted-foreground">Highest</p>
            </CardContent>
          </Card>
          <Card className="bg-secondary/50">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-destructive">8.4m</p>
              <p className="text-xs text-muted-foreground">Current</p>
            </CardContent>
          </Card>
          <Card className="bg-secondary/50">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-warning">-33%</p>
              <p className="text-xs text-muted-foreground">Change</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}