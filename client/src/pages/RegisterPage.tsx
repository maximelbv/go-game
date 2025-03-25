import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router";
import { useUser } from "../providers/UserProvider";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface APIErrorResponse {
  error: string[];
}

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setErrors(["Please fill in all fields"]);
      return;
    }

    setErrors([]);
    setIsSubmitting(true);

    try {
      await register({ username, email, password, confirmPassword });
      navigate("/");
    } catch (err: any) {
      const responseError = err.response?.data as APIErrorResponse;
      if (responseError?.error) {
        setErrors(responseError.error);
      } else {
        setErrors(["Registration failed. Please try again."]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className="flex flex-col items-center justify-center min-h-screen">
        <Paper elevation={3} className="p-8 w-full max-w-md">
          <Box className="flex flex-col items-center mb-6">
            <Typography component="h1" variant="h5" className="font-bold">
              Sign Up
            </Typography>
          </Box>

          {errors.length > 0 && (
            <Box className="mb-4">
              {errors.map((error, index) => (
                <Alert key={index} severity="error">
                  {error}
                </Alert>
              ))}
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit} className="mt-2 p-4">
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              className="mb-4"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="mb-4"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="mb-4"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
              className="mb-6"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              className="mb-4 py-3"
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>

            <Box className="flex justify-between mt-4">
              <Link component={RouterLink} to="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
