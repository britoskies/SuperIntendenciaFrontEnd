import { Grid } from "@mui/material";
import ProductList from "./../../components/product/ProductList";

const Home: React.FC = () => {
  return (
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
  );
};

export default Home;
