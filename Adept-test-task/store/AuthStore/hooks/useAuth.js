import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../StoreContext';

export const useAuth = () => {
  const { authStore } = useStore();
  const navigate = useNavigate();

  const login = async (email, password,role) => {
    await authStore.login(email, password,role);
    if (authStore.isAuth) {
      navigate('/success'); // Перенаправление в кабинет врача
    }
  };

  const register = async (email, password, role) => {
    await authStore.registration(email, password, role);
    if (authStore.isAuth) {
      navigate('/success'); // Перенаправление в кабинет врача
    }
  };

  useEffect(() => {
    if (authStore.isAuth) {
      // Здесь можно добавить логику для загрузки данных пользователя, если это необходимо
    }
  }, [authStore.isAuth]);

  return {
    isAuth: authStore.isAuth,
    loginMessage: authStore.loginMessage,
    formErrors: authStore.formErrors,
    login,
    register,

    user: authStore.user,
  };
};
