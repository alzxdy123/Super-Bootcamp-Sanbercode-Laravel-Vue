import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  Profile(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.post("/v1/profile", reqBody, config);
  },
};
