import { AppHeader } from "../../components/app-header/AppHeader"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Users } from "lucide-react"

export default function CompanyDashboardPage() {
  const colleges = [
    {
      name: "XYZ Institute of Technology",
      jobs: [
        { role: "SDE I", applicants: 125 },
        { role: "Frontend Developer", applicants: 78 },
        { role: "ML Engineer", applicants: 45 }
      ]
    },
    {
      name: "ABC College of Engineering",
      jobs: [{ role: "Data Analyst", applicants: 92 }]
    }
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Company Dashboard"
        description="Manage your campus recruitment drives."
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-8">
          <div>
            <h2 className="text-xl font-headline mb-4">
              Active Jobs by College
            </h2>
            <div className="grid gap-6">
              {colleges.map(college => (
                <Card key={college.name}>
                  <CardHeader>
                    <CardTitle className="font-headline">
                      {college.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {college.jobs.map(job => (
                      <Card key={job.role}>
                        <CardHeader>
                          <CardTitle className="font-headline text-lg">
                            {job.role}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span className="font-bold text-foreground text-2xl">
                              {job.applicants}
                            </span>
                            Applicants
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-headline mb-4">Pending Actions</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p> 3 offer letters pending approval for SDE I at XYZ Institute.</p>
                  <Badge variant="secondary">Awaiting Your Action</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
