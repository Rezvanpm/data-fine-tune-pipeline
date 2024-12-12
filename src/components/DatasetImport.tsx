import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

interface DatasetImportProps {
  onImport: (file: File) => void;
}

export function DatasetImport({ onImport }: DatasetImportProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file) {
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        onImport(file);
        toast({
          title: "Dataset Imported",
          description: `Successfully imported ${file.name}`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a CSV file",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? "border-primary bg-primary/10" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold">Import your dataset</h3>
      <p className="mt-1 text-sm text-gray-500">
        Drag and drop your CSV file here, or click to browse
      </p>
      <div className="mt-4">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".csv"
          onChange={handleFileInput}
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          Browse Files
        </Button>
      </div>
    </div>
  );
}