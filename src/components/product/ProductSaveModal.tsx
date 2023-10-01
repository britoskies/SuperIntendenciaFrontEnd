// Hooks
import { useEffect, useState } from "react";
import { useCreateProductMutation, useGetProductsQuery, useUpdateProductMutation } from "../../api/productSlice";
import { useGetCategoriesQuery } from "../../api/categorySlice";

// Mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  mode: string;
  productId?: number;
};

function ProductSaveModal({ onClose, open, mode, productId }: Props) {
  // State
  const [productState, setProductState] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    categoryId: ""
  });

  // Mutations
  const {data: products} = useGetProductsQuery();
  const {data: categories} = useGetCategoriesQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  // Handles
  const handleChange = (event: any) => {
    setProductState({...productState, [event.target.name]: event.target.value});
  }
  
  const handleClose = () => {
    if (mode === "add") setProductState(prevState => ({...prevState}));
    return onClose();
  };

  const handleAccept = async (event: any) => {
    const { name, description, imageUrl, price, categoryId } = productState;
  
    if (name && description && imageUrl && price && categoryId) {
      event.preventDefault();
      switch (mode) {
        case "add":
          await createProduct(productState);
          break;
        case "update":
          await updateProduct({...productState, id: productId});
          break;
        default:
          break;
      }
      return handleClose();
    }
  };

  useEffect(() => {
    if (productId) {
      const foundProduct = products?.find(
        (product) => product.id === productId
      );
      if (foundProduct) {
        setProductState({
          name: foundProduct.name,
          description: foundProduct.description,
          imageUrl: foundProduct.imageUrl,
          price: foundProduct.price.toString(),
          categoryId: foundProduct.categoryId ? foundProduct.categoryId.toString() : ""
        });
      }
    }
  },[products, productId]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {mode === "update" ? "Update Product" : "New Product"}
      </DialogTitle>
      <DialogContent>
        <FormControl
          sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 3, mt: 3 }}
          fullWidth
        >
          <TextField
            name="name"
            label="Name"
            type="text"
            defaultValue={productState.name}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            name="imageUrl"
            label="Image URL"
            type="text"
            defaultValue={productState.imageUrl}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel id="categoryId">Category</InputLabel>
          <Select
            labelId="categories-label"
            name="categoryId"
            id="categoryId"
            defaultValue={productState.categoryId}
            label="Categories"
            onChange={handleChange}
          >
            {categories ? (
              categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No categories created</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={productState.price}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            name="description"
            label="Description"
            type="text"
            multiline
            fullWidth
            variant="outlined"
            defaultValue={productState.description}
            onChange={handleChange}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleAccept}
          disabled={
            !(
              productState.name &&
              productState.description &&
              productState.price &&
              productState.categoryId
            )
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductSaveModal;