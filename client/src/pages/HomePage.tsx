import { useEffect, useState } from "react";
import { useTsumegoAttempt } from "../providers/TsumegoAttemptProvider";
import { useUser } from "../providers/UserProvider";
import { useTsumego } from "../providers/TsumegoProvider";
import { Link } from "react-router";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Divider,
  Chip,
  Avatar,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  CheckCircle,
  PlayArrow,
  Refresh,
  TrendingUp,
  EmojiEvents,
  AccessTime,
  GridOn,
} from "@mui/icons-material";

const HomePage = () => {
  const { user } = useUser();
  const { userAttempts } = useTsumegoAttempt();
  const { tsumegos, loading } = useTsumego();
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [notSolvedProblems, setNotSolvedProblems] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (Array.isArray(userAttempts)) {
      const solved = userAttempts.filter((attempt) => attempt.is_solved);
      const notSolved = userAttempts.filter((attempt) => !attempt.is_solved);
      setSolvedProblems(solved);
      setNotSolvedProblems(notSolved);
    }
  }, [userAttempts]);

  const totalProblems = solvedProblems.length + notSolvedProblems.length;
  const progressPercentage =
    totalProblems > 0
      ? Math.round((solvedProblems.length / totalProblems) * 100)
      : 0;
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          color: "white",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: "white",
                color: theme.palette.primary.main,
              }}
            >
              <GridOn fontSize="large" />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" fontWeight="bold">
              Welcome back, {user && user.username}
            </Typography>
            <Typography variant="subtitle1">
              Continue your journey in mastering Go problems
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="h6">Your Progress</Typography>
              <Typography variant="h4" fontWeight="bold">
                {progressPercentage}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <EmojiEvents color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Solved Problems</Typography>
              </Box>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {solvedProblems.length}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <PlayArrow color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">In Progress</Typography>
              </Box>
              <Typography variant="h3" color="secondary" fontWeight="bold">
                {notSolvedProblems.length}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  You can find your current progression below !
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", bgcolor: theme.palette.grey[50] }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <TrendingUp color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Attempts</Typography>
              </Box>
              <Typography variant="h3" color="info.main" fontWeight="bold">
                {totalProblems}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Keep practicing to improve your Go skills!
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          My progression
        </Typography>
        <Grid container spacing={2}>
          {notSolvedProblems.length > 0 ? (
            notSolvedProblems.map((problem) => (
              <Grid item xs={12} sm={6} md={4} key={problem.id}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`/tsumego/${problem.problem}`}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Chip
                          size="small"
                          label="In Progress"
                          color="warning"
                          variant="outlined"
                        />
                        <AccessTime fontSize="small" color="action" />
                      </Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {
                          tsumegos.find(
                            (tsumego) => tsumego.id === problem.problem
                          )?.title
                        }
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box display="flex" alignItems="center">
                          <GridOn color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Go Problem
                          </Typography>
                        </Box>
                        <IconButton size="small" color="primary">
                          <PlayArrow />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  bgcolor: theme.palette.grey[50],
                }}
              >
                <Typography variant="body1">
                  No problems in progress. Start solving new problems!
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          All Tsumego Problems
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <LinearProgress sx={{ width: "50%" }} />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {tsumegos?.length || 0} problems available
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {tsumegos &&
                tsumegos.map((tsumego) => {
                  const attempted = userAttempts?.some(
                    (attempt) => attempt.id === tsumego.id
                  );
                  const solved = solvedProblems.some(
                    (problem) => problem.id === tsumego.id
                  );

                  return (
                    <Grid item xs={12} sm={6} md={3} key={tsumego.id}>
                      <Card
                        sx={{
                          height: "100%",
                          transition: "all 0.3s",
                          borderLeft: solved
                            ? `4px solid ${theme.palette.success.main}`
                            : attempted
                            ? `4px solid ${theme.palette.warning.main}`
                            : `4px solid ${theme.palette.grey[300]}`,
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 6,
                          },
                        }}
                      >
                        <CardActionArea
                          component={Link}
                          to={`/tsumego/${tsumego.id}`}
                        >
                          <CardContent>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={1}
                            >
                              {solved ? (
                                <Chip
                                  size="small"
                                  label="Solved"
                                  color="success"
                                  icon={<CheckCircle fontSize="small" />}
                                />
                              ) : attempted ? (
                                <Chip
                                  size="small"
                                  label="In Progress"
                                  color="warning"
                                  variant="outlined"
                                />
                              ) : (
                                <Chip
                                  size="small"
                                  label="New"
                                  color="info"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                            <Typography
                              variant="h6"
                              fontWeight="medium"
                              gutterBottom
                              noWrap
                            >
                              {tsumego.title}
                            </Typography>

                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              mt={1}
                            >
                              <Box display="flex" alignItems="center">
                                <GridOn
                                  fontSize="small"
                                  color="action"
                                  sx={{ mr: 0.5 }}
                                />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Go Problem
                                </Typography>
                              </Box>
                              <IconButton size="small" color="primary">
                                <PlayArrow fontSize="small" />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              {(!tsumegos || tsumegos.length === 0) && (
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: "center",
                      bgcolor: theme.palette.grey[50],
                    }}
                  >
                    <Typography variant="body1">
                      No tsumego problems available.
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </>
        )}
      </Box>
      {solvedProblems.length > 0 && (
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, mt: 8 }}>
            Solved Problems
          </Typography>
          <Paper elevation={1} sx={{ borderRadius: 2 }}>
            <List>
              {solvedProblems.map((problem, index) => (
                <>
                  <ListItem
                    key={problem.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        component={Link}
                        to={`/tsumego/${problem.id}`}
                      >
                        <Refresh color="primary" />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                        <CheckCircle />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        tsumegos.find(
                          (tsumego) => tsumego.id === problem.problem
                        )?.title
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Solved successfully
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < solvedProblems.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </>
              ))}
            </List>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
