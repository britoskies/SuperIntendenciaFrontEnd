// Hooks
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../api/categorySlice";

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
  const { data } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleAccept = async () => {
    await deleteCategory(categoryId);
  };

  // Filter using the categoryId passed by props
  const getCategoryName = () =>
    data?.filter((c) => c.id == categoryId).map((c) => c.name);

  return (
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
  );
}

export default CategoryDeleteModal;
