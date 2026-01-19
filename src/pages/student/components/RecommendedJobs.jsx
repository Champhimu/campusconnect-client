import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

/**
 * TEMP NOTE:
 * - In Next.js this came from server actions
 * - For now we mock the data
 * - Later this will be replaced with API call
 */

import { jobs, companies } from "../../../utils/mockData";

export function RecommendedJobs() {
  const [recommendedJobIds, setRecommendedJobIds] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        setLoading(true);

        // 🔹 MOCKED RESPONSE (replace later with API)
        const response = {
          success: true,
          data: jobs.slice(0, 3).map(job => job.id),
        };

        if (response.success) {
          setRecommendedJobIds(response.data);
        } else {
          setError("Failed to fetch recommendations");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading recommendations...</p>;
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-600">
        <AlertTriangle size={16} />
        <span>{error}</span>
      </div>
    );
  }

  const recommendedJobs = jobs.filter(job =>
    recommendedJobIds?.includes(job.id)
  );

  if (recommendedJobs.length === 0) {
    return <p>No job recommendations found.</p>;
  }

  return (
    <div className="grid gap-4">
      {recommendedJobs.map(job => {
        const company = companies.find(c => c.id === job.companyId);

        return (
          <Card key={job.id}>
            <CardHeader className="flex justify-between items-center">
              <div>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>
                  {company?.name} · {job.location}
                </CardDescription>
              </div>

              <Button>
                <Link to="/student/jobs">View</Link>
              </Button>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
