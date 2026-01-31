import { useState } from "react";

import {AppHeader} from "../../components/app-header/AppHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";

/**
 * TYPES
 */
const initialActiveJobs = [
  {
    id: 1,
    role: "SDE I",
    college: "XYZ Institute of Technology",
    status: "Active",
  },
  {
    id: 2,
    role: "Data Analyst",
    college: "ABC College of Engineering",
    status: "Active",
  },
];

export default function CompanyJobsPage() {
  const [jobs, setJobs] = useState(initialActiveJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: "Closed" } : job
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Active Jobs"
        description="View your active job postings for campus drives."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle className="font-headline">
                  {job.role}
                </CardTitle>
                <CardDescription>{job.college}</CardDescription>
              </CardHeader>

              <CardContent>
                <Badge
                  variant={job.status === "Active" ? "default" : "secondary"}
                >
                  Status: {job.status}
                </Badge>
              </CardContent>

              <CardContent>
                <Button
                  variant="outline"
                  onClick={() => handleOpenModal(job)}
                  disabled={job.status === "Closed"}
                >
                  {job.status === "Active"
                    ? "Update Status"
                    : "Drive Ended"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <UpdateStatusDialog
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        job={selectedJob}
        onConfirmEndDrive={handleUpdateStatus}
      />
    </div>
  );
}

/**
 * MODAL COMPONENT
 */
function UpdateStatusDialog({
  isOpen,
  onOpenChange,
  job,
  onConfirmEndDrive,
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!job) return null;

  const handleEndDriveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    onConfirmEndDrive(job.id);
    setShowConfirmation(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setShowConfirmation(false), 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">
            Update Drive Status
          </DialogTitle>

          {!showConfirmation && (
            <DialogDescription>
              Manage the status of the campus drive for {job.role}.
            </DialogDescription>
          )}
        </DialogHeader>

        {showConfirmation ? (
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to end this campus drive?
              Students will no longer be able to apply.
            </p>
          </div>
        ) : (
          <div className="py-4">
            <p className="text-sm font-medium">
              Current status:{" "}
              <Badge variant="secondary">{job.status}</Badge>
            </p>
          </div>
        )}

        <DialogFooter>
          {showConfirmation ? (
            <>
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirm}
              >
                Confirm (End Drive)
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleEndDriveClick}
              >
                End / Deactivate Drive
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
