import { useEffect, useState } from "react";

// Hooks
import { useCategories } from "./../../hooks/useCategories";
import { useProducts } from "./../../hooks/useProducts";
import { useNavigate } from "react-router-dom";

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
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");

  const { products, getProduct, createProduct, updateProduct } = useProducts();
  const { categories } = useCategories();
  const navigate = useNavigate();

  const handleClose = () => {
    if (mode === "add") {
      setProductName("");
      setProductDescription("");
      setProductImage("");
      setProductPrice("");
      setProductCategory("");
    }
    return onClose();
  };

  const handleAccept = () => {
    if (
      productName &&
      productDescription &&
      productImage &&
      productPrice &&
      productCategory
    ) {
      save();
      return handleClose();
    }
  };

  const save = async () => {
    const newProduct = {
      name: productName,
      description: productDescription,
      imageUrl: productImage,
      price: Number(productPrice),
      categoryId: Number(productCategory),
    };

    if (mode === "add") await createProduct(newProduct);
    else {
      if (productId) {
        await updateProduct(`${productId}`, newProduct);
      }
    }

    // To reload and reflect changes
    window.location.reload();
    navigate("/products");
  };

  const updateStates = async () => {
    if (productId) {
      await getProduct(`${productId}`);
      products.map((product) => {
        setProductName(product.name);
        setProductDescription(product.description);
        setProductImage(product.imageUrl);
        setProductPrice(product.price.toString());
        setProductCategory(`${product.categoryId}` || "");
      });
    }
  };

  useEffect(() => {
    updateStates();
  }, [products]);

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
            id="name"
            label="Name"
            type="text"
            defaultValue={productName}
            onChange={(e) => setProductName(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            id="image-url"
            label="Image URL"
            type="text"
            defaultValue={productImage}
            onChange={(e) => setProductImage(e.target.value)}
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
            id="categoryId"
            defaultValue={productCategory}
            label="Categories"
            onChange={(e) => setProductCategory(e.target.value)}
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
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
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
            defaultValue={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleAccept}
          disabled={
            !(
              productName &&
              productDescription &&
              productPrice &&
              productCategory
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
