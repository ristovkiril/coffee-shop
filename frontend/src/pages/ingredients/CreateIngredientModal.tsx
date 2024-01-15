import { Button, Fade, Modal, Stack, TextField, Typography } from "@mui/material"
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
  px: 3,
  py: 3,
};

export const CreateIngredientModal = (
  { open, handleClose, handleSave, selectedIngredient }:
    { open: boolean, handleClose: () => void, handleSave: () => void, selectedIngredient: null | Ingredient }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [min, setMin] = useState<number | "">("");
  const [max, setMax] = useState<number | "">("");

  useEffect(() => {
    if (open) {
      let newName = "";
      let newDesc = "";
      if (selectedIngredient) {
        newName = selectedIngredient.name;
        newDesc = selectedIngredient.description;
      }
      setName(newName);
      setDescription(newDesc);
    }
  }, [open, selectedIngredient])

  const onSave = () => {
    if (!name || !description || min === "" || max === "") {
      toast.error("All fields are required");
      return;
    }
    if (selectedIngredient) {
      axios.put(`/api/ingredient/${selectedIngredient?.id}`, { name, description, min, max })
        .then(() => {
          toast.success("Successfully updated ingredient");
          handleClose();
          handleSave();
        })
        .catch(error => toast.error(error?.message || "Failed to update ingredient"))
    } else {
      axios.post(`/api/ingredient`, { name, description, min, max })
        .then(() => {
          toast.success("Successfully created ingredient");
          handleClose();
          handleSave();
        })
        .catch(error => toast.error(error?.message || "Failed to create ingredient"))
    }
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
          <Typography variant="h2" color="primary">{selectedIngredient ? "Update" : "Create"} Ingredient</Typography>
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
            value={min}
            label="Min"
            placeholder="Min"
            onChange={({ target: { value } }) => setMin(isFinite(+value) ? +value : "")}
          />
          <TextField
            value={max}
            label="Max"
            placeholder="Max"
            onChange={({ target: { value } }) => setMax(isFinite(+value) ? +value : "")}
          />
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