import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ResultsProps {
  dataset: string;
  metrics: string[];
  visualTypes: string[];
}

export function PipelineResults({ dataset, metrics, visualTypes }: ResultsProps) {
  // Mock data for demonstration
  const mockResults = {
    accuracy: "0.89",
    precision: "0.85",
    recall: "0.87",
    "f1-score": "0.86",
    "roc-curve": "0.92",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-2">
        <Check className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-semibold">Pipeline Complete</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Results for {dataset}</CardTitle>
          <CardDescription>Model evaluation metrics and visualizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric) => (
                  <div
                    key={metric}
                    className="p-4 border rounded-lg bg-muted/50"
                  >
                    <div className="text-sm text-muted-foreground mb-1">
                      {metric}
                    </div>
                    <div className="text-2xl font-bold">
                      {mockResults[metric.toLowerCase() as keyof typeof mockResults] || "N/A"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Visualizations</h3>
              <div className="grid grid-cols-2 gap-4">
                {visualTypes.map((type) => (
                  <Card key={type}>
                    <CardHeader>
                      <CardTitle className="text-base">{type}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">
                          Visualization placeholder
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}