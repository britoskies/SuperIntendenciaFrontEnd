import "./LoginDesign.css";

// Hooks
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// MUI
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";


const LoginComponent: React.FC = () => {
  const navigateTo = useNavigate();
  const [showPassword, setShow] = useState<boolean>(false);
  return (
    <Paper className="signin-form" elevation={10}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, fontWeight: 500 }}
      >
        Login
      </Typography>
      <Box className="signin-form-inputs">
        <TextField
          variant="outlined"
          label="Email"
          type={"email"}
          //onChange={(e) => handleEmail(e)}
          className="signin-input"
          sx={{ pb: 3 }}
          //error={emailError}
          //onKeyDown={(e) => handleEnter(e)}
          //helperText={emailError ? "No se permiten campos vacios" : null}
          fullWidth
        />
        <FormControl sx={{ width: "100%", pb: 2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={!showPassword ? "text" : "password"}
            //onChange={(e) => handlePassword(e)}
            className="signin-input"
            //error={passwordError}
            //onKeyDown={(e) => handleEnter(e)}
            //helperText={passwordError ? "Please fill this field" : null}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShow(!showPassword)}
                  //onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText>
            {/* {passwordError ? "No se permiten campos vacios" : null} */}
          </FormHelperText>
        </FormControl>
        <FormControlLabel
          control={<Checkbox />}
          label="Recordarme"
          sx={{ pb: 1 }}
        />
        <Button
          variant="contained"
          color="info"
          onClick={() => navigateTo("/home")}
          fullWidth
          disableElevation
        >
          LOG IN
        </Button>
      </Box>
      <Box
        className="signin-form-helpers"
        sx={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 0
        }}
      >
        <FormHelperText sx={{ fontSize: "1rem" }} error>
          {/* {signinError ? "Credenciales desconocidas!" : null} */}
        </FormHelperText>
      </Box>
    </Paper>
  );
};

export default LoginComponent;
