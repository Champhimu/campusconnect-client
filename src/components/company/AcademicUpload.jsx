import React, { useState, useTransition } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { FileText, FileUp, X, Download, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { bulkUploadAcademic } from "../../redux/slices/admin/userMgmtSlice";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function AcademicUpload() {
  const [file, setFile] = useState(null);
  const [isPending] = useTransition();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const { bulkResult } = useSelector((state) => state.admin);
  const expectedColumns = "RegNo, CGPA, Backlogs, Semester";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

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
        alert("Please upload a .xlsx, .xls, or .csv file.");
        e.target.value = "";
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({ variant: "destructive", title: "No File Selected", description: "Please select a file to upload." });
      alert("Select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    dispatch(bulkUploadAcademic(formData))
      .unwrap()
      .then((res) => {
        toast({ title: "Upload Successful", description: "Academic data uploaded successfully!" });
        alert("Successfull Data Uploaded");
        setFile(null);
      })
      .catch((err) => {
        // toast({ variant: "destructive", title: "Upload Failed", description: err });
        alert(err);
      });

    // startTransition(() => {
    //   setTimeout(() => {
    //     toast({ title: "Upload Successful", description: `${file.name} has been processed.` });
    //     setFile(null);
    //   }, 1500);
    // });
  };

  const handleDownloadTemplate = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    const wsData = [expectedColumns.split(",").map(h => h.trim())];; // add headers row
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Template");

    // Convert to blob and download
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "academic-template.xlsx");
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
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={handleDownloadTemplate}
        >
          <Download className="h-4 w-4" />
          Download Sample Template
        </Button>

        <Button
          onClick={handleUpload}
          disabled={isPending}
          className="flex-1 flex items-center justify-center gap-2"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Upload Data
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">Expected columns: {expectedColumns}</p>

      {bulkResult && bulkResult.data && bulkResult.data.length > 0 && (
        <div className="mt-4 p-2 border rounded bg-red-50">
          <p className="font-medium text-red-600">{bulkResult.message}</p>
          <ul className="list-disc ml-5 text-sm text-red-700">
            {bulkResult.data.map((row, idx) => (
              <li key={idx}>
                {row.registrationNumber}: {row.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
