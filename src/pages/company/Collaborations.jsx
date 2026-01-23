import React, { useState, useEffect } from "react";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Send,
  Clock,
  CheckCheck,
  X,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import axiosInstance from "../../api/collaborationApi";

export default function CompanyCollaborationPage() {
  // PENDING COLLABORATIONS STATE
  const [pendingCollaborations, setPendingCollaborations] = useState([]);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [pendingError, setPendingError] = useState("");

  // ACCEPTED COLLABORATIONS STATE
  const [acceptedCollaborations, setAcceptedCollaborations] = useState([]);
  const [acceptedLoading, setAcceptedLoading] = useState(false);
  const [acceptedError, setAcceptedError] = useState("");

  // INVITE TPO STATE
  const [collegeId, setCollegeId] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [isInviteSubmitting, setIsInviteSubmitting] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  // ACTION STATE
  const [actionLoading, setActionLoading] = useState(null);
  const [actionError, setActionError] = useState("");

  // Fetch pending collaborations on mount
  useEffect(() => {
    fetchPendingCollaborations();
    fetchAcceptedCollaborations();
  }, []);

  // Fetch pending collaboration requests
  const fetchPendingCollaborations = async () => {
    setPendingLoading(true);
    setPendingError("");
    try {
      const response = await axiosInstance.get("/company/collaborations/pending");
      setPendingCollaborations(response.data?.data || []);
    } catch (error) {
      setPendingError(
        error.response?.data?.message ||
          "Failed to fetch pending collaborations"
      );
      console.error("Error fetching pending collaborations:", error);
    } finally {
      setPendingLoading(false);
    }
  };

  // Fetch accepted collaborations
  const fetchAcceptedCollaborations = async () => {
    setAcceptedLoading(true);
    setAcceptedError("");
    try {
      const response = await axiosInstance.get("/company/collaborations/accepted");
      setAcceptedCollaborations(response.data?.data || []);
    } catch (error) {
      setAcceptedError(
        error.response?.data?.message ||
          "Failed to fetch accepted collaborations"
      );
      console.error("Error fetching accepted collaborations:", error);
    } finally {
      setAcceptedLoading(false);
    }
  };

  // Accept a collaboration
  const handleAcceptCollaboration = async (collaborationId) => {
    setActionLoading(collaborationId);
    setActionError("");
    try {
      await axiosInstance.patch(
        `/company/collaborations/${collaborationId}/accept`,
        {}
      );
      setPendingCollaborations((prev) =>
        prev.filter((c) => c.collaborationId !== collaborationId)
      );
      fetchAcceptedCollaborations();
    } catch (error) {
      setActionError(
        error.response?.data?.message || "Failed to accept collaboration"
      );
      console.error("Error accepting collaboration:", error);
    } finally {
      setActionLoading(null);
    }
  };

  // Reject a collaboration
  const handleRejectCollaboration = async (collaborationId) => {
    const reason = window.prompt("Enter reason for rejection (optional):");
    if (reason === null) return; // User cancelled

    setActionLoading(collaborationId);
    setActionError("");
    try {
      await axiosInstance.patch(
        `/company/collaborations/${collaborationId}/reject`,
        { reason }
      );
      setPendingCollaborations((prev) =>
        prev.filter((c) => c.collaborationId !== collaborationId)
      );
    } catch (error) {
      setActionError(
        error.response?.data?.message || "Failed to reject collaboration"
      );
      console.error("Error rejecting collaboration:", error);
    } finally {
      setActionLoading(null);
    }
  };

  // Validate invite form
  const validateInvite = () => {
    if (!collegeId.trim()) {
      setInviteError("Please select a college");
      return false;
    }
    return true;
  };

  // Handle invite TPO
  const handleInviteTPO = async (e) => {
    e.preventDefault();
    setInviteError("");
    setInviteSuccess("");

    if (!validateInvite()) {
      return;
    }

    setIsInviteSubmitting(true);

    try {
      const response = await axiosInstance.post("/company/collaborations/invite", {
        collegeId,
        message: inviteMessage.trim(),
      });

      if (response.data?.success) {
        setInviteSuccess(response.data?.message);
        setCollegeId("");
        setInviteMessage("");
      } else {
        setInviteError("Failed to send invitation");
      }
    } catch (error) {
      setInviteError(
        error.response?.data?.message || "Failed to send invitation"
      );
      console.error("Error sending invitation:", error);
    } finally {
      setIsInviteSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader
        title="Manage Collaborations"
        description="View collaboration requests, accept or reject, and invite colleges."
      />

      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="accepted">Accepted Colleges</TabsTrigger>
            <TabsTrigger value="invite">Invite College</TabsTrigger>
          </TabsList>

          {/* ============= PENDING REQUESTS TAB ============= */}
          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Collaboration Requests</CardTitle>
                <CardDescription>
                  Colleges that have requested to collaborate with you
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                    <span className="ml-2 text-gray-500">Loading requests...</span>
                  </div>
                ) : pendingError ? (
                  <div className="flex gap-2 rounded-md bg-red-50 p-4 text-red-700">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p>{pendingError}</p>
                  </div>
                ) : pendingCollaborations.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    <p>No pending collaboration requests.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingCollaborations.map((collaboration) => (
                      <div
                        key={collaboration.collaborationId}
                        className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <h3 className="font-semibold">
                              {collaboration.collegeName}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600">
                            Contact: {collaboration.contactPersonName}
                          </p>
                          <p className="text-sm text-gray-600">
                            Email: {collaboration.contactEmail}
                          </p>
                          {collaboration.message && (
                            <p className="mt-2 border-l-2 border-gray-300 bg-gray-50 p-2 text-sm italic">
                              "{collaboration.message}"
                            </p>
                          )}
                          <p className="mt-1 text-xs text-gray-500">
                            Requested on:{" "}
                            {new Date(
                              collaboration.requestedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            disabled={actionLoading === collaboration.collaborationId}
                            onClick={() =>
                              handleAcceptCollaboration(
                                collaboration.collaborationId
                              )
                            }
                          >
                            {actionLoading ===
                            collaboration.collaborationId ? (
                              <>
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                Accepting...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Accept
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={actionLoading === collaboration.collaborationId}
                            onClick={() =>
                              handleRejectCollaboration(
                                collaboration.collaborationId
                              )
                            }
                          >
                            {actionLoading ===
                            collaboration.collaborationId ? (
                              <>
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                Rejecting...
                              </>
                            ) : (
                              <>
                                <X className="mr-1 h-3 w-3" />
                                Reject
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {actionError && (
                  <div className="mt-4 flex gap-2 rounded-md bg-red-50 p-4 text-red-700">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p>{actionError}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============= ACCEPTED COLLABORATIONS TAB ============= */}
          <TabsContent value="accepted" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Accepted Collaborations</CardTitle>
                <CardDescription>
                  Colleges that have accepted collaboration with you
                </CardDescription>
              </CardHeader>
              <CardContent>
                {acceptedLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                    <span className="ml-2 text-gray-500">Loading colleges...</span>
                  </div>
                ) : acceptedError ? (
                  <div className="flex gap-2 rounded-md bg-red-50 p-4 text-red-700">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p>{acceptedError}</p>
                  </div>
                ) : acceptedCollaborations.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    <p>No accepted collaborations yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {acceptedCollaborations.map((collaboration) => (
                      <div
                        key={collaboration.collaborationId}
                        className="rounded-lg border border-green-200 bg-green-50 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCheck className="h-5 w-5 flex-shrink-0 text-green-600 mt-1" />
                          <div className="flex-grow">
                            <h3 className="font-semibold text-green-900">
                              {collaboration.collegeName}
                            </h3>
                            <p className="text-sm text-green-800">
                              Contact: {collaboration.contactPersonName}
                            </p>
                            <p className="text-sm text-green-800">
                              Email: {collaboration.contactEmail}
                            </p>
                            <p className="text-sm text-green-800">
                              Phone: {collaboration.contactPhone || "N/A"}
                            </p>
                            <p className="mt-2 text-xs text-green-700">
                              Accepted on:{" "}
                              {new Date(
                                collaboration.acceptedAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============= INVITE COLLEGE TAB ============= */}
          <TabsContent value="invite" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Invite a College to Collaborate</CardTitle>
                <CardDescription>
                  Send a collaboration invitation to a college that you would like
                  to partner with
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInviteTPO} className="space-y-6">
                  {/* College ID Input */}
                  <div className="space-y-3">
                    <Label htmlFor="college-id">College ID *</Label>
                    <Input
                      id="college-id"
                      placeholder="Enter the College/TPO ID (MongoDB ObjectId)"
                      value={collegeId}
                      onChange={(e) => setCollegeId(e.target.value)}
                      type="text"
                    />
                    <p className="text-xs text-gray-500">
                      You can get this from your college contact
                    </p>
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-3">
                    <Label htmlFor="invite-message">Message (Optional)</Label>
                    <Textarea
                      id="invite-message"
                      placeholder="Enter a message to include with your invitation..."
                      value={inviteMessage}
                      onChange={(e) => setInviteMessage(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-xs text-gray-500">
                      {inviteMessage.length}/500 characters
                    </p>
                  </div>

                  {/* Error Message */}
                  {inviteError && (
                    <div className="flex gap-3 rounded-md bg-red-50 p-4 text-red-700">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Error</p>
                        <p className="text-sm">{inviteError}</p>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {inviteSuccess && (
                    <div className="flex gap-3 rounded-md bg-green-50 p-4 text-green-700">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Success!</p>
                        <p className="text-sm">{inviteSuccess}</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isInviteSubmitting || !collegeId.trim()}
                    className="w-full"
                  >
                    {isInviteSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Invitation...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Invitation
                      </>
                    )}
                  </Button>

                  {/* Info Message */}
                  <div className="rounded-md bg-blue-50 p-4 text-blue-700 text-sm">
                    <p className="font-medium">💡 How it works</p>
                    <p className="mt-1">
                      Once you send an invitation, the college will receive a
                      notification. They can accept or reject your collaboration
                      request from their dashboard.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
