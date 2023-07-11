import { Outlet } from "react-router";

// Components
import Navbar from "../../components/common/Navbar";

// Mui components
import { Grid } from "@mui/material";

type Props = {};

function LoggedLayout({}: Props) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12} sm container>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default LoggedLayout;
