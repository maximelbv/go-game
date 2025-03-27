import type React from "react";
import { Link } from "react-router";
import { AppBar, Toolbar, Button, Box, Container } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useUser } from "../providers/UserProvider";
import GridOnIcon from "@mui/icons-material/GridOn";

const Header: React.FC = () => {
  const { logout, user } = useUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static" className="bg-white shadow-md">
      <Container maxWidth="lg">
        <Toolbar className="flex justify-between items-center !px-2 !py-2">
          <Link to="/" className="no-underline">
            <Box className="flex items-center">
              <GridOnIcon />
              <span className="ml-2 text-xl font-bold">GoGamePlatform</span>
            </Box>
          </Link>

          <Box>
            {user ? (
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                className="!text-white"
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" className="no-underline">
                <Button
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  className="!text-white"
                >
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
