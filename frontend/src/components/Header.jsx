import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const isLogin = useSelector((state) => state.isLogin);
  console.log(isLogin);
  const [value, setValue] = useState(0);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4">My Blog App</Typography>
        {isLogin && (
          <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab label="Blogs" component={Link} to="/blogs" />
              <Tab label="My Blogs" component={Link} to="/my-blogs" />
            </Tabs>
          </Box>
        )}

        <Box display={"flex"} marginLeft={"auto"}>
          {/* Adjusted the condition to render login and register buttons */}
          {!isLogin && (
            <>
              <Button
                sx={{ margin: 1 }}
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                sx={{ margin: 1 }}
                color="inherit"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
          {/* Logout button remains the same */}
          {isLogin && (
            <Button
              sx={{ margin: 1 }}
              color="inherit"
              component={Link}
              to="/logout"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
