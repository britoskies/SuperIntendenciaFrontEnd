import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../api/productSlice";

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
  productId?: number;
};

function ProductDeleteModal({ onClose, open, productId }: Props) {
  const { data } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAccept = async () => await deleteProduct(productId);

  // Filter using the productId passed by props
  const getProductName = () =>
    data?.filter((p) => p.id == productId).map((p) => p.name);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Are you sure to delete product <b>{getProductName()}</b> ?!
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

export default ProductDeleteModal;
