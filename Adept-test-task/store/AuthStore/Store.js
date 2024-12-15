import { makeAutoObservable } from "mobx";
import AuthService from "../../services/AuthService/AuthService";

export default class AuthStore {
  user = {}; // Данные пользователя
  isAuth = false; // Статус аутентификации
  loginMessage = ""; // Сообщение о входе
  formErrors = {}; // Ошибки формы

  constructor() {
    makeAutoObservable(this);
    this.refreshToken();
  }

  // Общие методы
  setAuth(auth) {
    this.isAuth = auth;
  }

  setLoginMessage(message) {
    this.loginMessage = message;
  }

  setFormErrors(errors) {
    this.formErrors = errors;
  }

  setUser(userData) {
    this.user = userData;
    this.isAuth = true;
  }

  // Методы авторизации
  async login(email, password,role) {
    this.setLoginMessage("");

    try {
      const response = await AuthService.login(email, password,role);
      localStorage.setItem("token", response.data.accessToken); // Сохраняем токен доступа
      this.setUser(response.data.user); // Сохраняем данные пользователя
      this.setAuth(true); // Устанавливаем статус аутентификации
    } catch (error) {
      this.setLoginMessage(error.response?.data?.error || "Ошибка входа");
    }
  }

  // Методы регистрации
  async registration(email, password, role) {
    try {
      const response = await AuthService.registration(email, password, role);
      localStorage.setItem("token", response.data.accessToken); // Сохраняем токен доступа
      this.setUser(response.data.user); // Сохраняем данные пользователя
      this.setAuth(true); // Устанавливаем статус аутентификации
    } catch (error) {
      this.setFormErrors(error.response?.data?.errors || {});
    }
  }



  // Метод обновления токена
  async refreshToken() {
    try {
      const response = await AuthService.refreshToken();
      localStorage.setItem("token", response.data.accessToken); // Сохраняем новый токен доступа
      this.setAuth(true);
      console.log("Токен успешно обновлен");
    } catch (error) {
      console.error("Ошибка при обновлении токена", error);
      
    }
  }
}
