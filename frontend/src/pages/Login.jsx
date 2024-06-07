import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );

      console.log("Response data:", data); // Debugging: Log the entire response data

      if (data.success) {
        console.log("Login success:", data.success); // Debugging: Log the success status
        if (data.user && data.user.id) {
          console.log("User data:", data.user); // Debugging: Log the user data
          localStorage.setItem("userId", data.user.id);
          dispatch(authActions.login());
          toast.success("User login successfully");

          // Ensure navigate is called after state updates
          setTimeout(() => {
            console.log("Navigating to home"); // Debugging: Log before navigating
            navigate("/");
          }, 0); // Setting a timeout to ensure state updates complete
        } else {
          console.error("User data is missing in the response:", data); // Debugging: Log the entire response if user data is missing
          toast.error("Login failed: User data is missing in the response.");
        }
      } else {
        console.error("Login failed with message:", data.message); // Debugging: Log the failure message
        toast.error("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error occurred during login:", error); // Debugging: Log the error
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>

          <TextField
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type="email"
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type="password"
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a user? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
