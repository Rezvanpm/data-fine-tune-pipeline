import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatasetImport } from "./DatasetImport";

export const datasets = [
  "IMDB Reviews",
  "Amazon Product Reviews",
  "Twitter Sentiment",
];

export const preprocessingMethods = [
  "Text Cleaning",
  "Tokenization",
  "Stop Words Removal",
  "Lemmatization",
  "Stemming",
];

export const metrics = [
  "Accuracy",
  "Precision",
  "Recall",
  "F1-Score",
  "ROC Curve",
];

export const visualTypes = [
  "Line Chart",
  "Bar Chart",
  "Confusion Matrix",
  "ROC Curve Plot",
];

interface StepProps {
  dataset: string;
  setDataset: (value: string) => void;
  selectedPreprocessing: string[];
  setSelectedPreprocessing: (value: string[]) => void;
  selectedMetrics: string[];
  setSelectedMetrics: (value: string[]) => void;
  selectedVisuals: string[];
  setSelectedVisuals: (value: string[]) => void;
  startPipeline: () => void;
  importedDataset: File | null;
  onDatasetImport: (file: File) => void;
}

export function DatasetStep({ dataset, setDataset, importedDataset, onDatasetImport }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Dataset</h2>
      <Select onValueChange={setDataset}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a dataset" />
        </SelectTrigger>
        <SelectContent>
          {datasets.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Or Import Your Own Dataset</h3>
        <DatasetImport onImport={onDatasetImport} />
        {importedDataset && (
          <p className="mt-2 text-sm text-green-600">
            Imported: {importedDataset.name}
          </p>
        )}
      </div>
    </div>
  );
}

export function PreprocessingStep({ selectedPreprocessing, setSelectedPreprocessing }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Preprocessing Methods</h2>
      <div className="grid grid-cols-2 gap-4">
        {preprocessingMethods.map((method) => (
          <div key={method} className="flex items-center space-x-2">
            <Checkbox
              id={method}
              checked={selectedPreprocessing.includes(method)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedPreprocessing([...selectedPreprocessing, method]);
                } else {
                  setSelectedPreprocessing(
                    selectedPreprocessing.filter((m) => m !== method)
                  );
                }
              }}
            />
            <label htmlFor={method}>{method}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ModelStep() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Language Model</h2>
      <Select disabled value="phi-3.5">
        <SelectTrigger>
          <SelectValue placeholder="Phi-3.5" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="phi-3.5">Phi-3.5</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function TrainingMethodStep() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Training Method</h2>
      <Select disabled value="fine-tuning">
        <SelectTrigger>
          <SelectValue placeholder="Fine-tuning" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fine-tuning">Fine-tuning</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function MetricsStep({ selectedMetrics, setSelectedMetrics }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric} className="flex items-center space-x-2">
            <Checkbox
              id={metric}
              checked={selectedMetrics.includes(metric)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedMetrics([...selectedMetrics, metric]);
                } else {
                  setSelectedMetrics(
                    selectedMetrics.filter((m) => m !== metric)
                  );
                }
              }}
            />
            <label htmlFor={metric}>{metric}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VisualizationStep({ selectedVisuals, setSelectedVisuals }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Visualization Types</h2>
      <div className="grid grid-cols-2 gap-4">
        {visualTypes.map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              id={type}
              checked={selectedVisuals.includes(type)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedVisuals([...selectedVisuals, type]);
                } else {
                  setSelectedVisuals(
                    selectedVisuals.filter((t) => t !== type)
                  );
                }
              }}
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewStep({ dataset, selectedPreprocessing, selectedMetrics, selectedVisuals }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Review & Start</h2>
      <div className="space-y-2">
        <p><strong>Dataset:</strong> {dataset}</p>
        <p><strong>Preprocessing:</strong> {selectedPreprocessing.join(", ")}</p>
        <p><strong>Model:</strong> Phi-3.5</p>
        <p><strong>Method:</strong> Fine-tuning</p>
        <p><strong>Metrics:</strong> {selectedMetrics.join(", ")}</p>
        <p><strong>Visualizations:</strong> {selectedVisuals.join(", ")}</p>
      </div>
    </div>
  );
}
