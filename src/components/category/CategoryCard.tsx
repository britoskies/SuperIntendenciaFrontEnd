import * as React from "react";

// MUI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";

// Model
import { iCategory } from "./../../interfaces/models/iCategory";

// Hooks
import { useModal } from "../../hooks/useModal";
import { useState } from "react";

// Components
import CategoryDeleteModal from "./CategoryDeleteModal";
import CategorySaveModal from "./CategorySaveModal";

interface Props {
  category: iCategory;
}

const CategoryCard: React.FC<Props> = ({ category }) => {
  const { open, handleOpen, handleClose } = useModal();

  // To handle delete modal
  const [openDelete, setOpen] = useState<boolean>(false);

  const handleDeleteOpen = () => {
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 270, minWidth: 270 }}>
        <CardHeader title={category.name} subheader={"Category"} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {category.description}
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
            <IconButton onClick={handleOpen} aria-label="delete">
              <EditIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>

      {/* Modals */}

      <CategorySaveModal
        open={open}
        onClose={handleClose}
        mode="update"
        categoryId={category.id}
      />

      <CategoryDeleteModal
        open={openDelete}
        onClose={handleDeleteClose}
        categoryId={category.id}
      />
    </>
  );
};

export default CategoryCard;
