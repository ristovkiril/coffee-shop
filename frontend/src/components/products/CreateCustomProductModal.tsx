import { Fade, Grid, Modal, Stack, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { IngredientRating } from "../ingredients/IngredientRating";

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
      .catch(error => console.error(error.message));
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
          <Grid container sx={{ maxHeight: '100%', flex: 1 }} gap={1}>
            <Grid item component={Stack}
              xs={12} sm={5.9}
              direction="column"
              alignItems={"center"}
              justifyContent={"center"}
              onClick={() => onSave(null)}
              sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: 5, cursor: "pointer" }}
            >
              <IconPlus />
              <Typography>Customize your own coffee</Typography>
            </Grid>
            {
              defaultProducts?.map((product) => {
                return (
                  <Grid item key={product.id} component={Stack}
                    xs={12} sm={5.9}
                    direction="column"
                    gap={1}
                    onClick={() => onSave(product)}
                    sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: 2, cursor: "pointer" }}
                  >
                    <Typography variant="h6" fontWeight={600} color="primary">{product?.name}</Typography>
                    <Typography>{product?.description}</Typography>
                    {product?.ingredients?.map(productIngredient => (
                      <IngredientRating
                        key={productIngredient.id}
                        productIngredient={productIngredient}
                        readOnly={true}
                        removeIngredient={true}
                      />
                    ))}
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