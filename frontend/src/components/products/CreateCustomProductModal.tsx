import { Button, Fade, Grid, IconButton, Modal, Rating, Stack, Typography } from "@mui/material"
import axios from "../../config/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IconCircle, IconCircleFilled, IconPencil, IconPlus } from "@tabler/icons-react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: { xs: "80vw", sm: "70vw", md: "50vw", lg: "30vw" },
  maxWidth: "80vw",
  maxHeight: "80vh",
  bgcolor: 'background.paper',
  borderRadius: "0.75rem",
  border: '0px solid #000',
  overflowY: 'auto',
  px: 3,
  py: 3,
};

export const CreateCustomProductModal = (
  { open, handleClose, handleSave }:
    { open: boolean, handleClose: () => void, handleSave: (product: Product) => void }) => {
  const [defaultProducts, setDefaultProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/product/default")
      .then(response => setDefaultProducts(response.data))
      .catch(error => toast.error(error.message));
  }, [])

  const onSave = (product: null | Product) => {
    let newProduct: Product = { id: null, name: "", description: "", owner: null, price: 0, ingredients: [] };
    if (product) {
      newProduct = { ...product, id: null }
    }
    handleSave(newProduct);
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <Fade in={open} timeout={500}>
        <Stack direction={"column"} gap={2} sx={style}>
          <Typography variant="h3" color="primary">Choose coffee</Typography>
          <Grid container sx={{ maxHeight: '100%', flex: 1 }}>
            <Grid item xs={12} sm={6}>
              <Stack direction="column" justifyContent={"center"} alignItems={"center"}
                sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: 5, m: 1 }}
              >
                <IconButton onClick={() => onSave(null)}>
                  <IconPlus />
                </IconButton>
                <Typography>Customize your own coffee</Typography>
              </Stack>
            </Grid>
            {
              defaultProducts?.map((product) => {
                return (
                  <Grid item key={product.id}
                    xs={12} sm={6}
                  >
                    <Stack
                      direction="column" gap={1}
                      onClick={() => onSave(product)}
                      sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: 2, m: 1, cursor: "pointer" }}
                    >
                      <Typography variant="h4" color="primary">{product?.name}</Typography>
                      <Typography>{product?.description}</Typography>
                      {product?.ingredients?.map(ingredient => (
                        <Stack key={ingredient.id} direction="row" alignItems="center" justifyContent={"space-between"}>
                          <Typography>{ingredient?.name}</Typography>
                          <Rating
                            value={ingredient?.value}
                            max={ingredient?.max}
                            sx={{ '& .MuiRating-iconFilled': { color: "#803030" } }}
                            icon={<IconCircleFilled color="#803030" />}
                            emptyIcon={<IconCircle color="#801010" />}
                          />
                        </Stack>
                      ))}
                    </Stack>
                  </Grid>
                )
              })
            }


          </Grid>

        </Stack>
      </Fade>
    </Modal>
  )
}