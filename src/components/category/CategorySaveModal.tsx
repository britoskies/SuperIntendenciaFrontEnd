// Hooks
import { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../api/categorySlice";

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

  // Querys & Mutations
  const { data } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const handleClose = () => {
    if (mode === "add") {
      setCategoryName("");
      setCategoryDescription("");
    }
    return onClose();
  };

  const handleAccept = async (event: any) => {
    if (categoryName && categoryDescription) {
      event.preventDefault();
      const newCategory = {
        name: categoryName,
        description: categoryDescription,
      };

      switch (mode) {
        case "add":
          await createCategory(newCategory);
          break;
        case "update":
          await updateCategory({ ...newCategory, id: categoryId });
          break;
        default:
          break;
      }
      return handleClose();
    }
  };

  useEffect(() => {
    if (categoryId) {
      const foundCategory = data?.find(
        (category) => category.id === categoryId
      );
      if (foundCategory) {
        setCategoryName(foundCategory.name);
        setCategoryDescription(foundCategory.description);
      }
    }
  }, [data, categoryId]);

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
            name="name"
            label="Name"
            type="text"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            id="description"
            name="description"
            label="Description"
            type="text"
            variant="outlined"
            multiline
            fullWidth
            value={categoryDescription}
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
