import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  Review(reqbody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.post("/v1/review", reqbody, config);
  },
};
