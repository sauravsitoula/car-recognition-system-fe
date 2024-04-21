import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MdLockOutline } from "react-icons/md";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../commons/Loader/Loader";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      isValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!password) {
      isValid = false;
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      isValid = false;
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    if (validateForm()) {
      const data = axios
        // .post("http://3.145.76.78:3001/auth/login", {
        .post("http://18.224.215.79:3001/auth/login", {
          email,
          password,
        })
        .then((data) => {
          const authData = {
            token: data.data.token,
            user: data.data.user,
          };
          setLoader(false);
          setAuth(authData);
          localStorage.setItem("refreshToken", data.data.user.refreshToken);
          navigate("/");
        })
        .catch((error) => {
          setLoader(false);
          let errorMessage = "";
          if (!error?.response) {
            errorMessage = "No response from server";
          } else if (error?.response?.status === 400) {
            errorMessage = "Provide Email and Password correctly";
          } else if (error?.response?.status === 401) {
            errorMessage = "Invalid credentials";
          } else {
            errorMessage = "Login failed";
          }
        });
    }
  };

  return (
    <div>
      {loader ? <Loader /> : ""}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <MdLockOutline />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setpassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
