import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { IconMenu2, IconTrash } from "@tabler/icons-react";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";

export const CartDrawer = (
  { open, handleClose }:
    { open: boolean, handleClose: () => void }
) => {
  const { cart, updateCart } = useAppContext();
  const [displayName, setDisplayName] = useState<string>("");

  const handleOrder = () => {
    if (!displayName && !cart.length) {
      toast.error("Name and coffee is required");
      return;
    }
    axios.post("/api/order", { displayName, products: cart })
      .then(response => {
        console.log(response.data);
        toast.success("Order placed!");
        updateCart([]);
        setDisplayName("");
      })
      .catch(error => toast.error(error.message || "Failed to order"))
  }

  const total = cart?.map(product => product.price)
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

  return (
    <>
      <Drawer
        anchor={"right"}
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
          {
            cart?.map((product, index) => {
              return (
                <ListItem key={`${product.id}-${index}`}>
                  <ListItemIcon>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => {
                        const newItems = cart?.filter((p, ind) => p.id === product.id && index === ind);
                        updateCart(newItems);
                      }}
                    >
                      <IconTrash size={18} />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary={product?.name} secondary={product.description} primaryTypographyProps={{ fontWeight: 700 }} />
                  <Typography fontSize={18} fontWeight={700} fontStyle={"italic"} color="primary">${product.price}</Typography>
                </ListItem>
              )
            })
          }

          <Divider sx={{ my: 2 }} />
          <TextField
            size="small"
            fullWidth
            label="Order Name"
            placeholder="Order name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <ListItem>
            <ListItemText primary={"Total Items"} primaryTypographyProps={{ fontWeight: 700 }} />
            <Typography fontSize={18} fontWeight={700} fontStyle={"italic"} color="primary">{cart.length}</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Total Cost"} primaryTypographyProps={{ fontWeight: 700 }} />
            <Typography fontSize={18} fontWeight={700} fontStyle={"italic"} color="primary">${total}</Typography>
          </ListItem>
          <ListItemButton
            onClick={handleOrder}
            disabled={cart.length === 0 || !displayName}
            sx={{
              color: "#FFF !important",
              bgcolor: "#803030 !important",
              textTransform: "none",
              fontWeight: 700,
              px: 2,
              borderRadius: 3,
              "&:hover": { bgcolor: "#801010 !important" }
            }}
          >
            <ListItemText primary={"Order Now"} primaryTypographyProps={{ textAlign: 'center' }} />
          </ListItemButton>
        </List>


      </Drawer >
    </>
  )
}