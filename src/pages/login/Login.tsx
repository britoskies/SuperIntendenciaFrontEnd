import './Login.css'

// Mui
import { Box } from '@mui/material';

// Components
import LoginComponent from '../../components/login/LoginComponent';

const Login: React.FC = () => {
    return (
      <Box className="login-page">
        <LoginComponent/>
      </Box>
    );
  };

  export default Login;