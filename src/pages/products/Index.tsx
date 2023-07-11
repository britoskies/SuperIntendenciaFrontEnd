import { Button, Grid } from "@mui/material";
import ProductList from "./../../components/product/ProductList";
import { useModal } from "./../../hooks/useModal";
import ProductSaveModal from "./../../components/product/ProductSaveModal";

const Products: React.FC = () => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <Grid item xs={12} mx={5}>
        <Button onClick={handleOpen} fullWidth variant="outlined" color="info">
          Create Product
        </Button>
        <ProductSaveModal open={open} onClose={handleClose} mode="add" />
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        gap={5}
        mx={0}
        mt={5}
      >
        <ProductList />
      </Grid>
    </>
  );
};

export default Products;
