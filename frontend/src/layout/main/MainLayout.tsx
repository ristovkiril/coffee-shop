import { Button, Container, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IconMenu2 } from "@tabler/icons-react";
import { NavDrawer } from "./NavDrawer";
import { navItems } from "../navItems"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, onLogout } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);

  const navButtons = navItems?.map(item => <Button
    key={item.pathname}
    component={NavLink}
    to={item.pathname}
    sx={{ borderBottom: 2, borderRadius: 0, borderColor: "transparent" }}
  >
    {item.label}
  </Button>)

  const isAdmin = currentUser?.role === "admin";

  return (
    <>
      <NavDrawer
        open={openDrawer}
        handleClose={() => setOpenDrawer(false)}
        onLogout={onLogout}
      />
      <Toolbar sx={{ gap: 2 }}>
        <Typography component={Link} to={"/"} variant="h5"
          color="#803030" fontFamily={"monospace"} fontWeight={1000}
          sx={{ "&:hover": { color: "#801010" } }}
        >
          CoffeLab
        </Typography>
        {
          isAdmin &&
          <>
            <Stack direction="row" gap={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {navButtons}
            </Stack>
            <IconButton
              sx={{ ml: "auto", display: { xs: 'block', sm: 'none' } }}
              onClick={() => setOpenDrawer(true)}
            >
              <IconMenu2 />
            </IconButton>
          </>
        }

        {
          !currentUser ?
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                color: "#f1f1f1 !important",
                borderRadius: 5,
                textTransform: "none",
                px: 2,
                ml: "auto",
                display: { xs: isAdmin ? "none" : "block", sm: "block" },
                "&:hover": { color: "#f1f1f1 !important" }
              }}
            >
              Sign in
            </Button> :
            <Button
              variant="outlined"
              onClick={onLogout}
              sx={{
                borderRadius: 5,
                textTransform: "none",
                px: 2,
                ml: "auto",
                display: { xs: isAdmin ? "none" : "block", sm: "block" },
              }}
            >
              Sign out
            </Button>
        }


      </Toolbar>

      <Container>
        {children}
      </Container>
    </>
  )
}