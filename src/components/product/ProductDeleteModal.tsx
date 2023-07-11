import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";

type Props = {
  open: boolean;
  onClose: () => void;
  productId?: number;
};

function ProductDeleteModal({ onClose, open, productId }: Props) {
  const { products, getProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const handleAccept = async () => {
    await getProduct(`${productId}`);
    await deleteProduct(`${productId}`);

    // To reload and reflect changes
    window.location.reload();
    navigate("/products");
  };

  // Filter using the productId passed by props
  const getProductName = () =>
    products.filter((p) => p.id == productId).map((p) => p.name);

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
