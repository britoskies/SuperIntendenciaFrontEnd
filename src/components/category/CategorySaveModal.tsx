// Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

// Mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  mode: string;
  categoryId?: number;
};

function CategorySaveModal({ onClose, open, mode, categoryId }: Props) {
  // States
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");

  // Hooks
  const { categories, getCategory, createCategory, updateCategory } =
    useCategories();

  const navigate = useNavigate();

  const handleClose = () => {
    if (mode === "add") {
      setCategoryName("");
      setCategoryDescription("");
    }
    return onClose();
  };

  const handleAccept = () => {
    if (categoryName && categoryDescription) {
      save();
      return handleClose();
    }
  };

  const save = async () => {
    const newCategory = {
      name: categoryName,
      description: categoryDescription,
    };

    if (mode === "add") await createCategory(newCategory);
    else {
      if (categoryId) await updateCategory(`${categoryId}`, newCategory);
    }

    // To reload and reflect changes
    window.location.reload();
    navigate("/categories");
  };

  const updateStates = async () => {
    if (categoryId) {
      await getCategory(`${categoryId}`);
      categories.map((category) => {
        setCategoryName(category.name);
        setCategoryDescription(category.description);
      });
    }
  };

  useEffect(() => {
    updateStates();
  }, [categories]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {mode === "update" ? "Update Category" : "New Category"}
      </DialogTitle>
      <DialogContent>
        <FormControl
          sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 3, mt: 3 }}
          fullWidth
        >
          <TextField
            id="name"
            label="Name"
            type="text"
            defaultValue={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            id="description"
            label="Description"
            type="text"
            multiline
            fullWidth
            variant="outlined"
            defaultValue={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleAccept}
          disabled={!(categoryName && categoryDescription)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CategorySaveModal;
