import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  Login(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.post("/v1/auth/login", reqBody, config);
  },

  Logout() {
    let config = {
      ...header.authHeader(),
    };
    return AXIOS.get("/v1/auth/logout", config);
  },

  Regis(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.post("/v1/auth/register", reqBody, config);
  },

  Me() {
    let config = {
      ...header.authHeader(),
    };
    return AXIOS.get("/v1/auth/me", config);
  },

  Verifikasi(reqBody) {
    let config = {
      ...header.authHeader(),
    };
    return AXIOS.post("/v1/auth/verifikasi", reqBody, config);
  },

  GenerateOTP() {
    let config = {
      ...header.authHeader(),
    };
    return AXIOS.post("/v1/auth/generate-otp", null, config);
  },
};
