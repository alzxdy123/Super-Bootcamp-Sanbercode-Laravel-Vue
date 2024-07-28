import Functions from "../../tools/Functions";

export default {
  authHeader() {
    let token = Functions.ReadSessionCustom("token");

    let config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    return config;
  },
  authHeaderMulti() {
    let token = Functions.ReadSessionCustom("token");

    let config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    };

    return config;
  },
};
