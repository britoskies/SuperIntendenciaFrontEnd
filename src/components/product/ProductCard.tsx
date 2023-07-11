import * as React from "react";

// Components
import ProductDeleteModal from "./ProductDeleteModal";
import ProductSaveModal from "./ProductSaveModal";

// Hooks
import { useModal } from "../../hooks/useModal";
import { useState } from "react";

// MUI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import { red } from "@mui/material/colors";
import { Box } from "@mui/material";

// Model
import { iProduct } from "./../../interfaces/models/iProduct";

interface Props {
  product: iProduct;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { open, handleOpen, handleClose } = useModal();

  // To handle delete modal
  const [openDelete, setOpen] = useState<boolean>(false);

  const handleDeleteOpen = () => {
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  const noImage = "/assets/no-image.jpg";

  return (
    <>
      {/* Modals */}

      <ProductSaveModal
        open={open}
        onClose={handleClose}
        mode="update"
        productId={product.id}
      />

      <ProductDeleteModal
        open={openDelete}
        onClose={handleDeleteClose}
        productId={product.id}
      />
      <Card sx={{ maxWidth: 270, minWidth: 270 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={product.name}
          subheader={product.categoryName}
        />
        <CardMedia
          sx={{ height: "194px", width: "100%", objectFit: "cover" }}
          component="img"
          image={product.imageUrl.length > 10 ? product.imageUrl : noImage}
          alt="Image url not provided"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <IconButton onClick={handleDeleteOpen} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Box>
          <Box>
            <Typography fontSize={14} fontWeight="bold" color="red">
              {`$${product.price} USD`}
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
