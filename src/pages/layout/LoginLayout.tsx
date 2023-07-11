import { Outlet } from "react-router";

// Mui
import { Box } from "@mui/material";

type Props = {};

function LoginLayout({}: Props) {
  return (
    <Box sx={{ px: 3 }}>
      <Outlet />
    </Box>
  );
}

export default LoginLayout;
