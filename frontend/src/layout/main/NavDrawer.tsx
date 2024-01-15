import { Divider, Drawer, IconButton, List, ListItemButton, Stack, Typography } from "@mui/material";
import { IconMenu2 } from "@tabler/icons-react";
import { navItems } from "../navItems";
import { NavLink } from "react-router-dom";

export const NavDrawer = (
  { open, handleClose, onLogout }:
    { open: boolean, handleClose: () => void, onLogout: () => void }
) => {

  return (
    <>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={handleClose}
        sx={{ maxWidth: "400px", width: "100%" }}
        PaperProps={{
          sx: { bgcolor: "rgba(255,255,255, 1) !important", maxWidth: "400px", width: "100%", p: 2 }
        }}
      >
        <Stack direction="row" justifyContent={"space-between"} sx={{ width: "100%", }}>
          <Typography variant="h5"
            color="#803030" fontFamily={"monospace"} fontWeight={1000}
            sx={{ "&:hover": { color: "#801010" } }}
          >
            CoffeLab
          </Typography>
          <IconButton onClick={handleClose}>
            <IconMenu2 />
          </IconButton>
        </Stack>
        <List>
          {navItems?.map(item => {
            return <ListItemButton
              key={item.pathname}
              component={NavLink}
              to={item.pathname}
              sx={{ borderBottom: 0, fontWeight: 400, borderRadius: 0, borderColor: "transparent" }}
            >
              {item.label}
            </ListItemButton>
          })}
          <Divider sx={{ my: 3 }} />
          <ListItemButton
            onClick={onLogout}
            sx={{
              color: "#803030 !important",
              borderRadius: 0,
              textTransform: "none",
              fontWeight: 700,
              px: 2,
              "&:hover": { color: "#801010 !important" }
            }}
          >
            Sign out
          </ListItemButton>
        </List>


      </Drawer >
    </>
  )
}