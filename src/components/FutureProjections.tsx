import { ArrowLeft, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const projectionData = [
  { year: "2024", depletion: 8.4, upgradation: 8.4 },
  { year: "2025", depletion: 7.8, upgradation: 8.8 },
  { year: "2026", depletion: 7.1, upgradation: 9.3 },
  { year: "2027", depletion: 6.3, upgradation: 9.9 },
  { year: "2028", depletion: 5.4, upgradation: 10.6 },
  { year: "2029", depletion: 4.6, upgradation: 11.4 },
];

const chartConfig = {
  depletion: {
    label: "Projected Depletion",
    color: "hsl(var(--destructive))",
  },
  upgradation: {
    label: "Potential Upgradation",
    color: "hsl(var(--success))",
  },
};

interface FutureProjectionsProps {
  onBack: () => void;
}

export function FutureProjections({ onBack }: FutureProjectionsProps) {
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
          <h1 className="text-xl font-bold text-foreground">Future Projections</h1>
          <p className="text-sm text-muted-foreground">5-year forecast analysis</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 px-4 mb-6">
        <Card className="h-full bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Groundwater Level Projections
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Estimated trends with and without conservation efforts
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  <Line 
                    type="monotone" 
                    dataKey="depletion" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="upgradation" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-secondary/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-destructive" />
                <p className="font-medium text-foreground">Net Change</p>
              </div>
              <p className="text-2xl font-bold text-destructive">-3.8m</p>
              <p className="text-xs text-muted-foreground">Without conservation</p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <p className="font-medium text-foreground">Confidence</p>
              </div>
              <p className="text-2xl font-bold text-primary">78%</p>
              <p className="text-xs text-muted-foreground">Projection accuracy</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Items */}
      <div className="px-4 pb-20">
        <Card className="bg-gradient-data/10 border-primary/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-2">Conservation Impact</h3>
            <p className="text-sm text-muted-foreground mb-3">
              With proper water management, groundwater levels could improve by 35% over 5 years.
            </p>
            <div className="flex gap-2">
              <div className="flex-1 bg-success/20 rounded-lg p-2">
                <p className="text-xs font-medium text-success">+3.0m potential gain</p>
              </div>
              <div className="flex-1 bg-primary/20 rounded-lg p-2">
                <p className="text-xs font-medium text-primary">Immediate action needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}