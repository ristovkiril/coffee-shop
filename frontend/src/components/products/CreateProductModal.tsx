import { Button, Fade, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import { IngredientRating } from "../ingredients/IngredientRating";
import axios from "../../config/axios";


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

export const CreateProductModal = (
  { open, handleClose, onRefresh, selectedProduct }:
    { open: boolean, handleClose: () => void, onRefresh: () => void, selectedProduct: null | Product }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | "">(0);
  const [selectedIngredients, setSelectedIngredients] = useState<ProductIngredient[]>([]);
  const { ingredients } = useAppContext();

  useEffect(() => {
    if (open) {
      let newName = "";
      let newDesc = "";
      let newPrice = 0;
      let newIngredients: ProductIngredient[] = [];
      if (selectedProduct) {
        newName = selectedProduct.name;
        newDesc = selectedProduct.description;
        newPrice = selectedProduct.price;
        newIngredients = selectedProduct.ingredients;
      }
      setName(newName);
      setDescription(newDesc);
      setPrice(newPrice)
      setSelectedIngredients(newIngredients);
    }
  }, [open, selectedProduct])


  const onSave = () => {
    if (!name || !description || !price || selectedIngredients?.length === 0) {
      toast.error("All fields are required");
      return;
    }
    const product = { id: null, name, description, price, ingredients: selectedIngredients };
    if (selectedProduct?.id) {
      axios.put(`/api/product/${selectedProduct?.id}`, { ...product })
        .then(() => {
          toast.success("Successfully updated product");
          handleClose()
          onRefresh();
        })
        .catch((error: any) => toast.error(error?.message || "Failed to update product"))
    } else {
      axios.post(`/api/product`, { ...product })
        .then(() => {
          toast.success("Successfully created product");
          handleClose()
          onRefresh();
        })
        .catch((error: any) => toast.error(error?.message || "Failed to create product"))
    }
  }

  const removeIngredient = (id: string) => {
    setSelectedIngredients(prev => {
      return prev.filter(i => i.id !== id);
    })
  }

  const remainedIngredients = ingredients?.filter(i1 => !selectedIngredients?.find(i2 => i2.id === i1.id));

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <Fade in={open} timeout={500}>
        <Stack direction={"column"} gap={2} sx={style}>
          <Typography variant="h2" color="primary">{selectedProduct?.id ? "Update" : "Create"} Product</Typography>
          <TextField
            value={name}
            label="Name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            value={description}
            label="Description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            type="number"
            value={price}
            label="Price"
            placeholder="Price"
            inputProps={{ min: 0 }}
            onChange={({ target: { value } }) => setPrice(isFinite(+value) ? +value : "")}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Add ingridient</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"none"}
              label="Add Ingredient"
              onChange={(e) => {
                const ingredient = ingredients?.find(i => i.id === e.target.value);
                if (ingredient) {
                  setSelectedIngredients((prev: ProductIngredient[]) => {
                    return [...prev, { ...ingredient, value: ingredient.min }]
                  })
                }
              }}
            >
              <MenuItem value={"none"}><em>Add new ingrident</em></MenuItem>
              {remainedIngredients?.map(ingredient => {
                return <MenuItem key={ingredient.id} value={ingredient.id}>{ingredient.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          {selectedIngredients?.map(productIngredient => (
            <IngredientRating
              key={productIngredient.id}
              productIngredient={productIngredient}
              readOnly={false}
              onRemove={removeIngredient}
              removeIngredient={true}
              onChange={(newValue) => {
                setSelectedIngredients(prev => {
                  return prev.map(item => {
                    if (item.id === newValue.id) {
                      return newValue;
                    }
                    return item;
                  })
                })
              }}
            />
          ))}

          <Stack direction={'row'} gap={1} >
            <Button
              variant={"contained"}
              color={"primary"}
              sx={{ borderRadius: 5, textTransform: "capitalize" }}
              onClick={onSave}
            >
              Save
            </Button>
            <Button
              variant={"outlined"}
              color={"primary"}
              sx={{ borderRadius: 5, textTransform: "capitalize" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Fade>
    </Modal>
  )
}