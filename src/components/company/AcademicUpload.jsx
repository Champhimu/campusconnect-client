import React, { useState, useTransition } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { FileText, FileUp, X, Download, Loader2 } from "lucide-react";


export function AcademicUpload(){
    const [file, setFile] = useState(null);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const expectedColumns = "RegNo, CGPA, Backlogs, AcademicYear";

    const handleFileChange = (e) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        const allowedExtensions = [".xlsx", ".xls", ".csv"];
        const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf("."));
        if (allowedExtensions.includes(fileExtension.toLowerCase())) {
          setFile(selectedFile);
        } else {
          toast({
            variant: "destructive",
            title: "Invalid File Type",
            description: "Please upload a .xlsx, .xls, or .csv file.",
          });
          e.target.value = "";
        }
      }
    };

    const handleUpload = () => {
      if (!file) {
        toast({ variant: "destructive", title: "No File Selected", description: "Please select a file to upload." });
        return;
      }
      startTransition(() => {
        setTimeout(() => {
          toast({ title: "Upload Successful", description: `${file.name} has been processed.` });
          setFile(null);
        }, 1500);
      });
    };

    return (
      <div className="space-y-4">
        {file ? (
          <div className="space-y-4">
            <p className="text-sm font-medium">Uploaded File</p>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Label
            htmlFor="academic-data-upload"
            className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border text-center"
          >
            <div className="space-y-1">
              <FileUp className="mx-auto h-8 w-8 text-muted-foreground" />
              <p>Click to upload or drag & drop</p>
              <p className="text-xs text-muted-foreground">XLSX, XLS, or CSV file</p>
            </div>
            <Input
              id="academic-data-upload"
              type="file"
              className="hidden"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
            />
          </Label>
        )}

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 flex items-center justify-center gap-2" asChild>
            <a href="/sample-template.xlsx" download className="flex-1 flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Download Sample Template
            </a>
          </Button>

          <Button onClick={handleUpload} disabled={isPending} className="flex-1 flex items-center justify-center gap-2">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload Data
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">Expected columns: {expectedColumns}</p>
      </div>
    );
  }