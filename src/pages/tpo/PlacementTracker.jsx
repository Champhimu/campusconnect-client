import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { FileUp, Upload } from "lucide-react";

export default function PlacementTrackerPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Placement Tracker"
        description="Upload offer letters and mark students as placed."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Offer Letter</CardTitle>
            <CardDescription>
              Select a student and upload their offer letter.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Student Registration No.</Label>
                <Input placeholder="Enter registration number" />
              </div>

              <div className="space-y-2">
                <Label>Company</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="innovatech">
                      Innovatech Solutions
                    </SelectItem>
                    <SelectItem value="quantum">
                      Quantum Dynamics
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Offer Letter</Label>
              <Label className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed">
                <div className="text-center space-y-1">
                  <FileUp className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p>Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground">PDF only</p>
                </div>
                <Input type="file" className="hidden" />
              </Label>
            </div>

            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Mark as Placed
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
