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
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Send,
} from "lucide-react";
import {
  getAvailableCompanies,
  sendCollaborationRequests,
  sendBulkCompanyInvites,
} from "../../api/collaborationApi";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export default function TPOCollaborationPage() {
  // REGISTERED COMPANIES TAB STATE
  const [availableCompanies, setAvailableCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [companiesError, setCompaniesError] = useState("");
  const [companiesMessage, setCompaniesMessage] = useState("");

  // SEND REQUESTS STATE
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitSummary, setSubmitSummary] = useState(null);

  // BULK INVITE STATE
  const [bulkEmails, setBulkEmails] = useState("");
  const [bulkMessage, setBulkMessage] = useState("");
  const [isBulkSubmitting, setIsBulkSubmitting] = useState(false);
  const [bulkError, setBulkError] = useState("");
  const [bulkSuccess, setBulkSuccess] = useState("");
  const [bulkSummary, setBulkSummary] = useState(null);

  // Fetch available companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      setCompaniesLoading(true);
      setCompaniesError("");
      try {
        const response = await getAvailableCompanies();
        setAvailableCompanies(response.data || []);
      } catch (error) {
        setCompaniesError(error.message || "Failed to fetch companies");
        console.error("Error fetching companies:", error);
      } finally {
        setCompaniesLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Handle company selection checkbox
  const handleCompanyToggle = (companyId) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  // Select/Deselect all companies
  const handleSelectAll = () => {
    if (selectedCompanies.length === availableCompanies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(availableCompanies.map((c) => c._id));
    }
  };

  // Validate registered companies form
  const validateRegisteredCompanies = () => {
    if (selectedCompanies.length === 0) {
      setSubmitError("Please select at least one company");
      return false;
    }
    return true;
  };

  // Submit collaboration requests to registered companies
  const handleSendCollaborationRequests = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    setSubmitSummary(null);

    if (!validateRegisteredCompanies()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendCollaborationRequests(
        selectedCompanies,
        companiesMessage.trim()
      );

      if (response.success) {
        setSubmitSuccess(response.message);
        setSubmitSummary(response.data?.summary);
        setSelectedCompanies([]);
        setCompaniesMessage("");

        // Refresh available companies list
        const refreshedResponse = await getAvailableCompanies();
        setAvailableCompanies(refreshedResponse.data || []);
      } else {
        setSubmitError("Failed to send collaboration requests");
      }
    } catch (error) {
      setSubmitError(error.message || "Failed to send collaboration requests");
      console.error("Error sending requests:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validate bulk invite form
  const validateBulkInvite = () => {
    if (!bulkEmails.trim()) {
      setBulkError("Please enter at least one email address");
      return false;
    }

    const emailList = bulkEmails
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e);

    if (emailList.length === 0) {
      setBulkError("Please enter valid email addresses");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emailList.filter((email) => !emailRegex.test(email));

    if (invalidEmails.length > 0) {
      setBulkError(
        `Invalid email format: ${invalidEmails.join(", ")}`
      );
      return false;
    }

    return true;
  };

  // Submit bulk invites
  const handleSendBulkInvites = async (e) => {
    e.preventDefault();
    setBulkError("");
    setBulkSuccess("");
    setBulkSummary(null);

    if (!validateBulkInvite()) {
      return;
    }

    const emailList = bulkEmails
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e);

    setIsBulkSubmitting(true);

    try {
      const response = await sendBulkCompanyInvites(
        emailList,
        bulkMessage.trim()
      );

      if (response.success) {
        setBulkSuccess(response.message);
        setBulkSummary(response.data?.summary);
        setBulkEmails("");
        setBulkMessage("");
      } else {
        setBulkError("Failed to send bulk invites");
      }
    } catch (error) {
      setBulkError(error.message || "Failed to send bulk invites");
      console.error("Error sending bulk invites:", error);
    } finally {
      setIsBulkSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader
        title="Manage Collaborations"
        description="Invite registered companies or bulk invite unregistered companies to collaborate."
      />

      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <Tabs defaultValue="registered-companies" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="registered-companies">
              Registered Companies
            </TabsTrigger>
            <TabsTrigger value="bulk-invite">
              Bulk Invite (Unregistered)
            </TabsTrigger>
          </TabsList>

          {/* ============= REGISTERED COMPANIES TAB ============= */}
          <TabsContent value="registered-companies" className="mt-6">
            <div className="grid gap-6">
              {/* Available Companies List */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Companies</CardTitle>
                  <CardDescription>
                    Companies not yet collaborated with your college
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {companiesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                      <span className="ml-2 text-gray-500">Loading companies...</span>
                    </div>
                  ) : companiesError ? (
                    <div className="flex gap-2 rounded-md bg-red-50 p-4 text-red-700">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <p>{companiesError}</p>
                    </div>
                  ) : availableCompanies.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                      <p>No available companies to collaborate with.</p>
                      <p className="text-sm">All registered companies are already collaborated.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Select All Checkbox */}
                      <div className="flex items-center gap-3 border-b pb-4">
                        <input
                          type="checkbox"
                          id="select-all"
                          checked={
                            selectedCompanies.length ===
                            availableCompanies.length
                          }
                          onChange={handleSelectAll}
                          className="h-4 w-4 cursor-pointer rounded border-gray-300"
                        />
                        <label
                          htmlFor="select-all"
                          className="cursor-pointer text-sm font-medium"
                        >
                          Select All ({availableCompanies.length})
                        </label>
                      </div>

                      {/* Companies List */}
                      <div className="max-h-96 space-y-3 overflow-y-auto">
                        {availableCompanies.map((company) => (
                          <div
                            key={company._id}
                            className="flex items-start gap-3 rounded-lg border p-3 hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              id={`company-${company._id}`}
                              checked={selectedCompanies.includes(
                                company._id
                              )}
                              onChange={() =>
                                handleCompanyToggle(company._id)
                              }
                              className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300"
                            />
                            <label
                              htmlFor={`company-${company._id}`}
                              className="cursor-pointer flex-grow"
                            >
                              <div className="font-medium">
                                {company.companyName}
                              </div>
                              <div className="text-sm text-gray-600">
                                {company.industry}
                              </div>
                              <div className="text-xs text-gray-500">
                                {company.contactEmail}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="text-sm text-gray-600 border-t pt-3">
                        Selected: {selectedCompanies.length} /{" "}
                        {availableCompanies.length}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Send Request Form */}
              {availableCompanies.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Send Collaboration Requests</CardTitle>
                    <CardDescription>
                      Add an optional message to your collaboration requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleSendCollaborationRequests}
                      className="space-y-6"
                    >
                      {/* Message Textarea */}
                      <div className="space-y-3">
                        <Label htmlFor="companies-message">
                          Message (Optional)
                        </Label>
                        <Textarea
                          id="companies-message"
                          placeholder="Enter an optional message to include with your collaboration request..."
                          value={companiesMessage}
                          onChange={(e) =>
                            setCompaniesMessage(e.target.value)
                          }
                          rows={4}
                          className="resize-none"
                        />
                        <p className="text-xs text-gray-500">
                          {companiesMessage.length}/500 characters
                        </p>
                      </div>

                      {/* Error Message */}
                      {submitError && (
                        <div className="flex gap-3 rounded-md bg-red-50 p-4 text-red-700">
                          <AlertCircle className="h-5 w-5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Error</p>
                            <p className="text-sm">{submitError}</p>
                          </div>
                        </div>
                      )}

                      {/* Success Message */}
                      {submitSuccess && (
                        <div className="space-y-3 rounded-md bg-green-50 p-4 text-green-700">
                          <div className="flex gap-3">
                            <CheckCircle className="h-5 w-5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">{submitSuccess}</p>
                              {submitSummary && (
                                <div className="mt-2 space-y-1 text-sm">
                                  <p>
                                    ✓ Sent:{" "}
                                    <strong>
                                      {submitSummary.successCount}
                                    </strong>
                                  </p>
                                  {submitSummary.failureCount > 0 && (
                                    <p>
                                      ✗ Failed:{" "}
                                      <strong>
                                        {submitSummary.failureCount}
                                      </strong>
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={
                          isSubmitting ||
                          selectedCompanies.length === 0
                        }
                        className="w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send to {selectedCompanies.length} Company
                            {selectedCompanies.length !== 1 ? "ies" : ""}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* ============= BULK INVITE TAB ============= */}
          <TabsContent value="bulk-invite" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Invite Unregistered Companies</CardTitle>
                <CardDescription>
                  Send collaboration invitations to companies via email. They will
                  receive a registration link to join CampusConnect.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendBulkInvites} className="space-y-6">
                  {/* Email List Textarea */}
                  <div className="space-y-3">
                    <Label htmlFor="bulk-emails">Email Addresses *</Label>
                    <Textarea
                      id="bulk-emails"
                      placeholder="Enter email addresses separated by commas&#10;Example: hr@company1.com, contact@company2.com, info@company3.com"
                      value={bulkEmails}
                      onChange={(e) => setBulkEmails(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                    <p className="text-xs text-gray-500">
                      {bulkEmails.split(",").filter((e) => e.trim()).length}{" "}
                      email(s) entered
                    </p>
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-3">
                    <Label htmlFor="bulk-message">Message (Optional)</Label>
                    <Textarea
                      id="bulk-message"
                      placeholder="Enter an optional message to include with your invitation..."
                      value={bulkMessage}
                      onChange={(e) => setBulkMessage(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-xs text-gray-500">
                      {bulkMessage.length}/500 characters
                    </p>
                  </div>

                  {/* Error Message */}
                  {bulkError && (
                    <div className="flex gap-3 rounded-md bg-red-50 p-4 text-red-700">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Error</p>
                        <p className="text-sm">{bulkError}</p>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {bulkSuccess && (
                    <div className="space-y-3 rounded-md bg-green-50 p-4 text-green-700">
                      <div className="flex gap-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{bulkSuccess}</p>
                          {bulkSummary && (
                            <div className="mt-2 space-y-1 text-sm">
                              <p>
                                ✓ Sent:{" "}
                                <strong>{bulkSummary.successCount}</strong>
                              </p>
                              {bulkSummary.failureCount > 0 && (
                                <p>
                                  ✗ Failed:{" "}
                                  <strong>
                                    {bulkSummary.failureCount}
                                  </strong>
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={
                      isBulkSubmitting ||
                      bulkEmails.trim().length === 0
                    }
                    className="w-full"
                  >
                    {isBulkSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Invites...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Invitations
                      </>
                    )}
                  </Button>

                  {/* Info Message */}
                  <div className="rounded-md bg-blue-50 p-4 text-blue-700 text-sm">
                    <p className="font-medium">💡 Tip</p>
                    <p className="mt-1">
                      Companies will receive an email with a registration link. Once they
                      register, the collaboration request will automatically appear in their
                      pending collaborations.
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
