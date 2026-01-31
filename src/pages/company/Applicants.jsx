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
} from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
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
import { MoreHorizontal } from "lucide-react";

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
        description="View and manage applicants for your campus drives."
      />

      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Filter Applicants</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Select>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Select college" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xyz-institute">XYZ Institute of Technology</SelectItem>
                  <SelectItem value="abc-college">ABC College of Engineering</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="offered">Offered</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by Round" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round1">Round 1 Cleared</SelectItem>
                  <SelectItem value="round2">Round 2 Cleared</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]"></TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Round Progress</TableHead>
                  <TableHead>Offer Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map(applicant => (
                  <TableRow key={applicant.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={`https://picsum.photos/seed/${applicant.id}/40/40`} />
                        <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>
                      <Badge variant={applicant.status === "Rejected" ? "destructive" : "secondary"}>{applicant.status}</Badge>
                    </TableCell>
                    <TableCell>{applicant.round}</TableCell>
                    <TableCell>{applicant.offer}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>
                            {applicant.status === "Rejected" ? "Reconsider" : "Reject"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>Generate Offer Letter</DropdownMenuItem>
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
