import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Paper,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { observer } from "mobx-react-lite";
import { useAuth } from "../../../../../store/AuthStore/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../../../public/img/shutterstock_1032639931.jpg";
const defaultTheme = createTheme({
  palette: {
    primary: { main: "#543ea3" },
    secondary: { main: "#8b77ef" },
    background: { default: "#ffffff" },
  },
});

const styles = {
  container: { display: "flex", height: "100vh" },
  backgroundImage: {
    flex: { xs: "0 0 0%", sm: "4 0 40%", md: "7 0 70%" },
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formContainer: {
    flex: { xs: "1 1 100%", sm: "8 1 60%", md: "5 1 30%" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "#ffffff",
  },
  avatar: { m: 1, bgcolor: "white", border: "1px solid #543ea3" },
  button: { mt: 3, mb: 2 },
  inputField: { mt: 1 },
};

const Login = observer(({ onToggle }) => {
  const { isAuth, isLoading, loginMessage, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "ADMIN", // Добавляем роль по умолчанию
  });

  useEffect(() => {
    if (isAuth) navigate("/success");
  }, [isAuth, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Выводим данные формы в консоль перед отправкой
    console.log("Данные для входа:", form);
    
    await login(form.email, form.password, form.role); // Передаем роль в метод login
  };
  

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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={styles.avatar}>
              <LockOutlinedIcon sx={{ color: "#543ea3" }} />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "#543ea3" }}>
              Вход
            </Typography>

            {loginMessage && (
              <Typography color="error" sx={{ mt: 2 }}>
                {loginMessage}
              </Typography>
            )}

            {!isLoading && (
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
                  sx={styles.inputField}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="role"
                  label="Роль"
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
                  Войти
                </Button>
                <Button onClick={onToggle} fullWidth variant="text">
                  У вас нет аккаунта? Зарегистрируйтесь
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
});

export default Login;