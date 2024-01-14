import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

export const RegisterPage = () => {
  const { onRegister } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      onRegister({ name, email, password });
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
          Already have account? Sign in <Link to="/login">here</Link>
        </Typography>

        <TextField
          size="small"
          fullWidth
          sx={{ my: 1 }}
          onChange={e => setName(e.target.value)}
          placeholder="Full name"
        />
        <TextField
          type="email"
          size="small"
          fullWidth
          onChange={e => setEmail(e.target.value)}
          sx={{ my: 1 }}
          placeholder="Email"
        />
        <TextField
          type={showPassword ? "text" : "password"}
          size="small"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IconEye /> : <IconEyeClosed />}
              </IconButton>
            </InputAdornment>
          }}
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
            my: 1,
            ml: "auto",
            "&:hover": { bgcolor: "#801010" }
          }}
        >
          Sign up
        </Button>
      </Box>
    </Stack>
  )
}