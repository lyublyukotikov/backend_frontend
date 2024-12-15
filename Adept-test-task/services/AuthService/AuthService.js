import $api from "../../src/http/index";

export default class AuthService {
  // Регистрация
  static async registration(email, password, role) {
    return $api.post("/registration", {
      email,
      password,
      role,
    });
  }

  // Авторизация
  static async login(email, password,role) {
    return $api.post("/login", {
      email,
      password,
      role,
    });
  }



  // Обновление токена
  static async refreshToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Токен отсутствует");
    }
    const response = await $api.post(
      "/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem("token", response.data.accessToken); // Сохраняем новый токен доступа
    return response;
  }
}
