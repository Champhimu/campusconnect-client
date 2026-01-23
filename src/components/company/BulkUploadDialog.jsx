import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { FileText, FileUp, X, Download, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { bulkCreateTPOs, bulkUploadStudents, fetchStudents } from "../../redux/slices/admin/userMgmtSlice";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function BulkUploadDialog({ open, onOpenChange, userType }) {
  const title = `Bulk ${userType} Upload`;
  const description = `Upload an Excel file to add multiple ${userType.toLowerCase()}s at once.`;

  const expectedColumns =
    userType === "Student"
      ? "RegNo, Name, Email, Department, Batch, CGPA, Backlogs"
      : "Name, Email, Department";

  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { bulkLoading, bulkResult, bulkError } = useSelector((state) => state.admin);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedExtensions = [".xlsx", ".xls", ".csv"];
      const ext = selectedFile.name.slice(selectedFile.name.lastIndexOf("."));
      if (allowedExtensions.includes(ext.toLowerCase())) {
        setFile(selectedFile);
      } else {
        // toast({ variant: "destructive", title: "Invalid File Type", description: "Use .xlsx, .xls, or .csv file" });
        e.target.value = "";
      }
    }
  };

  const handleDownloadTemplate = () => {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      const wsData = [expectedColumns.split(",").map(h => h.trim())]; // add headers row
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, "Template");
  
      // Convert to blob and download
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, `sample-${userType.toLowerCase()}-template.xlsx`);
    };

    const handleUpload = async () => {
    setErrorMsg("");
    if (!file) {
      toast({ variant: "destructive", title: "No File Selected", description: "Please select a file to upload." });
      alert("Select a file to upload")
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      try {

        // Dispatch appropriate Redux action
        let response;
        if (userType === "Student") response = await dispatch(bulkUploadStudents(formData)).unwrap();
        else if (userType === "TPO") response = await dispatch(bulkCreateTPOs(formData)).unwrap();
        // else if (userType === "Academic") response = await dispatch(bulkUploadAcademic(formData)).unwrap();
        dispatch(fetchStudents);
        // toast({ title: "Upload Successful", description: `Processed ${rows.length} row(s)` });
        alert("success");
        setFile(null);
      } catch (err) {
        alert(err);
        setFile(null);
        // toast({ variant: "destructive", title: "Upload Failed", description: err?.message || "Something went wrong" });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-4 px-6 py-4">
          {file ? (
            <div className="flex justify-between items-center border rounded p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span>{file.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Label
              htmlFor={`bulk-${userType}-upload`}
              className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border text-center"
            >
              <div className="space-y-1">
                <FileUp className="mx-auto h-8 w-8 text-muted-foreground" />
                <p>Click to upload or drag & drop</p>
                <p className="text-xs text-muted-foreground">XLSX, XLS, or CSV file</p>
              </div>
              <Input
                id={`bulk-${userType}-upload`}
                type="file"
                className="hidden"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
              />
            </Label>
          )}
            {errorMsg && <p className="text-red-600 font-medium">{errorMsg}</p>}
          <Button onClick={handleDownloadTemplate} variant="outline" className="w-full flex items-center justify-center gap-2">
              <Download className="mr-2 h-4 w-4" />
              Download Sample Template
          </Button>

          <p className="text-sm text-muted-foreground">Expected columns: {expectedColumns}</p>

          {bulkResult && bulkResult.data && bulkResult.data.length > 0 && (
        <div className="mt-4 p-2 border rounded bg-red-50">
          <p className="font-medium text-red-600">{bulkResult.message}</p>
          <ul className="list-disc ml-5 text-sm text-red-700">
            {bulkResult.data.map((row, idx) => (
              <li key={idx}>
                {row.email}: {row.reason}: {row.status}
              </li>
            ))}
          </ul>
        </div>
      )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleUpload()} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
