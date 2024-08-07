import { AXIOS } from "../services/common/server";
import header from "./common/header";

export default {
  Login(reqBody) {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.post("v1/auth/login", reqBody, config);
  },

  Logout() {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.get("v1/auth/logout", config);
  },

  Register(reqBody) {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.post("v1/auth/register", reqBody, config);
  },

  getUser() {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.get("v1/user", config);
  },
};
