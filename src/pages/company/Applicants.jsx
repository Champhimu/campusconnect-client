import { AppHeader } from "../../components/app-header/AppHeader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { MoreHorizontal, FileText } from "lucide-react";

export default function ApplicantsPage() {
  const applicants = [
    {
      id: 1,
      name: "Alex Ray",
      status: "Shortlisted",
      offer: "Pending",
      round: "Round 2 Cleared",
    },
    {
      id: 2,
      name: "Mia Wong",
      status: "Rejected",
      offer: "N/A",
      round: "Rejected in Round 1",
    },
    {
      id: 3,
      name: "Ben Stone",
      status: "Offered",
      offer: "Accepted",
      round: "All Cleared",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Applicants"
        description="Manage and track applicants for your job postings."
      />

      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Applicants</CardTitle>
            <CardDescription>
              Narrow down applicants by college, status, or round.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>College</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select college" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xyz">XYZ Institute of Technology</SelectItem>
                  <SelectItem value="abc">ABC College of Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="offered">Offered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Round</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select round" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="r1">Round 1 Cleared</SelectItem>
                  <SelectItem value="r2">Round 2 Cleared</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applicants Table */}
        <Card>
          <CardHeader>
            <CardTitle>Applicants</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Round Progress</TableHead>
                  <TableHead>Offer Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {applicant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {applicant.name}
                    </TableCell>

                    <TableCell>
                      <Badge>{applicant.status}</Badge>
                    </TableCell>

                    <TableCell>{applicant.round}</TableCell>

                    <TableCell>{applicant.offer}</TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            {applicant.status === "Rejected"
                              ? "Reconsider"
                              : "Reject"}
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            Generate Offer Letter
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
export { ApplicantsPage }
