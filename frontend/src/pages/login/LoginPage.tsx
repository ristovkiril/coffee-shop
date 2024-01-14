import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const LoginPage = () => {
  const { onLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email, password });
    }
  }

  return (
    <Stack
      component={"form"} onSubmit={onSubmit}
      direction="row" alignItems="center" justifyContent="center"
      sx={{ p: 0, height: "100%" }}
    >
      <Box sx={{ maxWidth: "330px", width: "100%", p: { xs: 2, sm: 4 }, bgcolor: "#fff", borderRadius: 5, textAlign: "center" }}>
        <Typography
          component={Link} to="/"
          variant="h3"
          color="#803030" fontFamily={"monospace"} fontWeight={1000}
          sx={{ "&:hover": { color: "#801010" } }}
        >
          CoffeLab
        </Typography>
        <Typography sx={{ my: 1 }}>
          Dont have account? Create now <Link to="/register">here</Link>
        </Typography>

        <TextField
          type="email"
          size="small"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ my: 1 }}
          placeholder="Email"
        />
        <TextField
          type="password"
          size="small"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ my: 1 }}
          placeholder="Password"
        />

        <Button
          type="submit"
          fullWidth
          sx={{
            bgcolor: "#803030",
            color: "#f1f1f1",
            textTransform: "none",
            px: 2,
            ml: "auto",
            "&:hover": { bgcolor: "#801010" }
          }}
        >
          Sign in
        </Button>
      </Box>
    </Stack>
  )
}