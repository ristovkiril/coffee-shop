import { Badge, Button, Container, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IconMenu2, IconShoppingCart } from "@tabler/icons-react";
import { NavDrawer } from "./NavDrawer";
import { navItems } from "../navItems"
import { useAppContext } from "../../context/AppContext";
import { CartDrawer } from "./CartDrawer";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, onLogout } = useAuth();
  const { cart } = useAppContext();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);

  const navButtons = useMemo(() => {
    return navItems?.map(item => {
      console.log(item, currentUser);
      console.log(item.isAuth && currentUser !== null)
      console.log(item.isAdmin && currentUser?.role !== "admin")
      if (item.isAuth && currentUser === null) return null;
      if (item.isAdmin && currentUser?.role !== "admin") return null;

      return (<Button
        key={item.pathname}
        component={NavLink}
        to={item.pathname}
        sx={{ borderBottom: 2, borderRadius: 0, borderColor: "transparent" }}
      >
        {item.label}
      </Button>)
    })
  }, [currentUser])

  const isAdmin = currentUser?.role === "admin";

  return (
    <>
      <NavDrawer
        open={openDrawer}
        handleClose={() => setOpenDrawer(false)}
        onLogout={onLogout}
      />
      <CartDrawer
        open={openCartDrawer}
        handleClose={() => setOpenCartDrawer(false)}
      />
      <Toolbar sx={{ gap: 2 }}>
        <Typography component={Link} to={"/"} variant="h5"
          color="#803030" fontFamily={"monospace"} fontWeight={1000}
          sx={{ "&:hover": { color: "#801010" } }}
        >
          CoffeLab
        </Typography>
        <Stack direction="row" gap={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {navButtons}
        </Stack>
        <Stack direction="row" gap={2} alignItems={"center"} sx={{ ml: "auto" }}>
          <IconButton color="primary" sx={{ mx: 1 }} onClick={() => setOpenCartDrawer(true)}>
            <Badge color="primary" badgeContent={cart.length} variant="standard" >
              <IconShoppingCart />
            </Badge>
          </IconButton>
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
                  display: { xs: isAdmin ? "none" : "block", md: "block" },
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
                  display: { xs: isAdmin ? "none" : "block", md: "block" },
                  px: 2,
                }}
              >
                Sign out
              </Button>
          }
          <IconButton
            sx={{ ml: "auto", display: { xs: 'block', md: 'none' } }}
            onClick={() => setOpenDrawer(true)}
          >
            <IconMenu2 />
          </IconButton>
        </Stack>



      </Toolbar>

      <Container>
        {children}
      </Container>
    </>
  )
}