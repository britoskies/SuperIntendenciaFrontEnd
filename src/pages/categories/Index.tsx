import { Button, Grid } from "@mui/material";
import { useModal } from "./../../hooks/useModal";
import CategorySaveModal from "./../../components/category/CategorySaveModal";
import CategoryList from "../../components/category/CategoryList";

const Categories: React.FC = () => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <Grid item xs={12} mx={5}>
        <Button onClick={handleOpen} fullWidth variant="outlined" color="info">
          Create Category
        </Button>
        <CategorySaveModal open={open} onClose={handleClose} mode="add" />
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
        <CategoryList />
      </Grid>
    </>
  );
};

export default Categories;
