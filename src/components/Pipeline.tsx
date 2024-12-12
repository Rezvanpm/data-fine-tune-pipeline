import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { PipelineResults } from "@/components/PipelineResults";
import { 
  DatasetStep, 
  PreprocessingStep, 
  ModelStep, 
  TrainingMethodStep, 
  MetricsStep, 
  VisualizationStep, 
  ReviewStep 
} from "./PipelineSteps";

// Define the common props interface
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

export const steps = [
  "Dataset Selection",
  "Preprocessing Methods",
  "Language Model",
  "Training Method",
  "Metrics Selection",
  "Visualization Types",
  "Review & Start",
  "Processing",
];

export function Pipeline() {
  const [currentStep, setCurrentStep] = useState(0);
  const [dataset, setDataset] = useState("");
  const [importedDataset, setImportedDataset] = useState<File | null>(null);
  const [selectedPreprocessing, setSelectedPreprocessing] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedVisuals, setSelectedVisuals] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDatasetImport = (file: File) => {
    setImportedDataset(file);
    setDataset(file.name);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startPipeline = () => {
    setIsProcessing(true);
    setCurrentStep(7);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
        toast({
          title: "Pipeline Complete",
          description: "Your model has been successfully trained and evaluated.",
        });
      }
    }, 100);
  };

  const commonProps: StepProps = {
    dataset,
    setDataset,
    selectedPreprocessing,
    setSelectedPreprocessing,
    selectedMetrics,
    setSelectedMetrics,
    selectedVisuals,
    setSelectedVisuals,
    startPipeline,
    importedDataset,
    onDatasetImport: handleDatasetImport,
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <DatasetStep {...commonProps} />;
      case 1:
        return <PreprocessingStep {...commonProps} />;
      case 2:
        return <ModelStep {...commonProps} />;
      case 3:
        return <TrainingMethodStep {...commonProps} />;
      case 4:
        return <MetricsStep {...commonProps} />;
      case 5:
        return <VisualizationStep {...commonProps} />;
      case 6:
        return <ReviewStep {...commonProps} />;
      case 7:
        return (
          <div className="space-y-4">
            {progress < 100 ? (
              <>
                <h2 className="text-xl font-semibold">Processing Pipeline</h2>
                <Progress value={progress} className="w-full" />
                <p className="text-center">{progress}% Complete</p>
              </>
            ) : (
              <PipelineResults
                dataset={dataset}
                metrics={selectedMetrics}
                visualTypes={selectedVisuals}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex items-center ${
              index !== steps.length - 1 ? "flex-1" : ""
            }`}
          >
            <div
              className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                index < currentStep
                  ? "bg-primary border-primary text-white"
                  : index === currentStep
                  ? "border-primary text-primary"
                  : "border-gray-300 text-gray-300"
              }`}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  index < currentStep ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 min-h-[300px]">
        {renderStepContent()}
      </div>

      {currentStep !== 7 && (
        <div className="flex justify-between mt-6">
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}
            variant="outline"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}