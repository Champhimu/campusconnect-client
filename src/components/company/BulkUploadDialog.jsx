import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { useToast } from "../../hooks/use-toast";
import { FileText, FileUp, X, Download, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { bulkCreateTPOs, bulkUploadStudents } from "../../redux/slices/admin/userMgmtSlice";
import * as XLSX from "xlsx"; // npm install xlsx

export function BulkUploadDialog({ open, onOpenChange, userType }) {
  const title = `Bulk ${userType} Upload`;
  const description = `Upload an Excel file to add multiple ${userType.toLowerCase()}s at once.`;

  const expectedColumns =
    userType === "Student"
      ? ['RegNo', 'Name', 'Email', 'Department', 'Batch', 'CGPA', 'Backlogs']
      : ['Name', 'Email', 'Department'];

  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();
//   const { toast } = useToast();
  const dispatch = useDispatch();

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

    const handleUpload = async () => {
    setErrorMsg("");
    if (!file) {
    //   toast({ variant: "destructive", title: "No File Selected", description: "Please select a file to upload." });
      return;
    }

    startTransition(async () => {
      try {
        // Read file using XLSX
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" }); // defval="" ensures empty cells are captured
        // Validate columns
        const fileColumns = Object.keys(rows[0] || {});
        console.log("Parsed rows:", rows, fileColumns);
        console.log("Missing columns:", expectedColumns.filter(col => !fileColumns.includes(col)));
        const missingCols = expectedColumns.filter(col => !fileColumns.includes(col));
        if (missingCols.length) {
        //   toast({
        //     variant: "destructive",
        //     title: "Missing Columns",
        //     description: `Required columns missing: ${missingCols.join(", ")}`
        //   });
          return;
        }

        // Validate at least 1 row
        if (rows.length === 0) {
        //   toast({ variant: "destructive", title: "No Data", description: "File must have at least one row of data." });
          return;
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append("file", file);

        // Dispatch appropriate Redux action
        let response;
        if (userType === "Student") response = await dispatch(bulkUploadStudents(formData)).unwrap();
        else if (userType === "TPO") response = await dispatch(bulkCreateTPOs(formData)).unwrap();
        // else if (userType === "Academic") response = await dispatch(bulkUploadAcademic(formData)).unwrap();

        // toast({ title: "Upload Successful", description: `Processed ${rows.length} row(s)` });
        onOpenChange(false);
        setFile(null);
      } catch (err) {
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
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" asChild>
            <a
              href={`/sample-${userType.toLowerCase()}-template.xlsx`}
              download
              className="w-full flex items-center justify-center gap-2"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Sample Template
            </a>
          </Button>

          <p className="text-sm text-muted-foreground">Expected columns: {expectedColumns?.join(", ")}</p>
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
