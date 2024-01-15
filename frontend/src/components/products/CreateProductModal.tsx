import { Button, Fade, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material"
import axios from "../../config/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


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
  { open, handleClose, handleSave, selectedProduct }:
    { open: boolean, handleClose: () => void, handleSave: (product: Product) => void, selectedProduct: null | Product }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedIngredients, setSelectedIngredients] = useState<ProductIngredient[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    axios.get("/api/ingredient")
      .then(response => setIngredients(response.data))
      .catch(error => toast.error(error.message));
  }, [])

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
    handleSave({ id: null, owner: null, name, description, price, ingredients: selectedIngredients })

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
          <Typography variant="h2" color="primary">{selectedProduct ? "Update" : "Create"} Product</Typography>
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
            onChange={(e) => setPrice(+e.target.value)}
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
                    return [...prev, { id: ingredient?.id, name: ingredient?.name, description: ingredient?.description, value: 1, min: 0, max: 5 }]
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
          {selectedIngredients?.map(productIngredient => {
            return (
              <Stack key={productIngredient.id} direction={"row"} gap={1} flexWrap={"wrap"}>
                <Typography sx={{ width: '100%' }}>{productIngredient.name}</Typography>
                <TextField
                  type="number"
                  label="Min"
                  value={productIngredient?.min}
                  sx={{ flex: 1 }}
                  onChange={(e) => {
                    setSelectedIngredients(prev => {
                      const newValue = { ...productIngredient };
                      newValue.min = +e.target.value;
                      return prev.map(item => {
                        if (item.id === newValue.id) {
                          return newValue;
                        }
                        return item;
                      })
                    })
                  }}
                />
                <TextField
                  type="number"
                  label="Max"
                  value={productIngredient?.max}
                  sx={{ flex: 1 }}
                  onChange={(e) => {
                    setSelectedIngredients(prev => {
                      const newValue = { ...productIngredient };
                      newValue.max = +e.target.value;
                      return prev.map(item => {
                        if (item.id === newValue.id) {
                          return newValue;
                        }
                        return item;
                      })
                    })
                  }}
                />
                <TextField
                  type="number"
                  label="Default"
                  value={productIngredient?.value}
                  sx={{ flex: 1 }}
                  onChange={(e) => {
                    setSelectedIngredients(prev => {
                      const newValue = { ...productIngredient };
                      newValue.value = +e.target.value;
                      return prev.map(item => {
                        if (item.id === newValue.id) {
                          return newValue;
                        }
                        return item;
                      })
                    })
                  }}
                />
              </Stack>
            )
          })}

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