import { Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, onLogout } = useAuth();

  return (
    <>
      <Toolbar>
        <Typography component={Link} to={"/"} variant="h5"
          color="#803030" fontFamily={"monospace"} fontWeight={1000}
          sx={{ "&:hover": { color: "#801010" } }}
        >
          CoffeLab
        </Typography>

        {
          !currentUser ?
            <Button
              component={Link}
              to="/login"
              sx={{
                bgcolor: "#803030",
                color: "#f1f1f1 !important",
                borderRadius: 5,
                textTransform: "none",
                px: 2,
                ml: "auto",
                "&:hover": { bgcolor: "#801010", color: "#f1f1f1 !important" }
              }}
            >
              Sign in
            </Button> :
            <Button
              onClick={onLogout}
              sx={{
                bgcolor: "#803030",
                color: "#f1f1f1 !important",
                borderRadius: 5,
                textTransform: "none",
                px: 2,
                ml: "auto",
                "&:hover": { bgcolor: "#801010", color: "#f1f1f1 !important" }
              }}
            >
              Sign out
            </Button>
        }

      </Toolbar>

      {children}
    </>
  )
}