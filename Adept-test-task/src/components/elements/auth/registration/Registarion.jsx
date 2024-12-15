import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../../../../store/AuthStore/hooks/useAuth';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  createTheme,
  Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../../../../../public/img/AQAKceG49gtx4TqVNTdNnstANxUJDzMn-401O-EtSP7DjOnmTWlGYHC8fkOXF2wA-EldKnBZwmiAalgc8NvPx-SiO_c.jpg";
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#543ea3' },
    secondary: { main: '#8b77ef' },
    background: { default: '#ffffff' },
  },
});

const styles = {
  container: { display: 'flex', height: '100vh' },
  backgroundImage: {
    flex: { xs: '0 0 0%', sm: '4 0 40%', md: '7 0 70%' },
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formContainer: {
    flex: { xs: '1 1 100%', sm: '8 1 60%', md: '5 1 30%' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bgcolor: '#ffffff',
  },
  avatar: { m: 1, bgcolor: 'white', border: '1px solid #543ea3' },
  button: { mt: 3, mb: 2 },
  inputField: { mt: 1 },
};

const Registration = observer(({ onToggle }) => {
  const { register, isAuth, formErrors } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'ADMIN', // Устанавливаем роль по умолчанию
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register(form.email, form.password, form.role);
  };

  useEffect(() => {
    if (isAuth) navigate('/success');
  }, [isAuth, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={styles.container}>
        <CssBaseline />

        <Box sx={styles.backgroundImage} />
        <Box component={Paper} elevation={6} square sx={styles.formContainer}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={styles.avatar}>
              <LockOutlinedIcon sx={{ color: '#543ea3' }} />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: '#543ea3' }}>
              Регистрация
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Почта"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email?.[0] || ''}
                autoFocus
                sx={styles.inputField}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                value={form.password}
                onChange={handleInputChange}
                error={!!formErrors.password}
                helperText={formErrors.password?.[0] || ''}
                sx={styles.inputField}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="role"
                label="Роль"
                type="text"
                id="role"
                value={form.role}
                onChange={handleInputChange}
                sx={styles.inputField}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={styles.button}
              >
                Зарегистрироваться
              </Button>
              <Button onClick={onToggle} fullWidth variant="text">
                У вас уже есть аккаунт? Войдите
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
});

export default Registration;
