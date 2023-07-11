// Hooks
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  categoryId?: number;
};

function CategoryDeleteModal({ onClose, open, categoryId }: Props) {
  const { categories, getCategory, deleteCategory } = useCategories();
  const navigate = useNavigate();

  const handleAccept = async () => {
    await getCategory(`${categoryId}`);
    await deleteCategory(`${categoryId}`);

    // To reload and reflect changes
    window.location.reload();
    navigate("/categories");
  };

  // Filter using the categoryId passed by props
  const getCategoryName = () =>
    categories.filter((c) => c.id == categoryId).map((c) => c.name);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          Are you sure to delete category <b>{getCategoryName()}</b> ?!
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleAccept}>
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CategoryDeleteModal;
