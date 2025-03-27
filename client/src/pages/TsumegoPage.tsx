import { Link } from "react-router";
import { useTsumego } from "../providers/TsumegoProvider";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const TsumegoPage = () => {
  const { tsumegos, loading } = useTsumego();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tsumego Problems</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tsumegos.map((tsumego) => (
          <Link key={tsumego.id} to={`/tsumego/${tsumego.id}`}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <Typography variant="h6">{tsumego.title}</Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TsumegoPage;
