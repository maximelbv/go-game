import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";

const features = [
  {
    title: "Play Online",
    description:
      "Challenge players from around the world in real-time matches with flexible time controls.",
    icon: <PeopleIcon fontSize="large" color="primary" />,
  },
  {
    title: "Tournaments",
    description:
      "Participate in daily, weekly and monthly tournaments with prizes and ranking points.",
    icon: <EmojiEventsIcon fontSize="large" color="primary" />,
  },
  {
    title: "Learn & Improve",
    description:
      "Access tutorials, puzzles, and AI analysis to enhance your Go skills at any level.",
    icon: <SchoolIcon fontSize="large" color="primary" />,
  },
];

const LandingPage = () => {
  return (
    <Box>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "500px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        />
        <Grid container>
          <Container maxWidth="lg">
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
                height: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Master the Ancient Game of Go
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Play, learn, and connect with Go enthusiasts from around the
                world. Challenge yourself with the most elegant strategic board
                game ever created.
              </Typography>
              <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/register"
                  endIcon={<ArrowForwardIcon />}
                >
                  Join Now
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Paper>

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Why Choose Our Platform
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Experience the best online Go platform with features designed for
          players of all levels
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  p: 2,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ my: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Start Your Go Journey?
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          paragraph
          sx={{ mb: 4 }}
        >
          Join thousands of players already enjoying our platform. Create an
          account to track your progress, join tournaments, and connect with the
          community.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/register"
          sx={{ px: 4, py: 1 }}
        >
          Sign Up Now
        </Button>
      </Container>
    </Box>
  );
};

export default LandingPage;
