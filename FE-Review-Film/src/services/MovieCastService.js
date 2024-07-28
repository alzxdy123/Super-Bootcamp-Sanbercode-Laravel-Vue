import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  GetAll() {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/cast-movie", config);
  },

  Add(reqBody) {
    let config = {};
    config = header.authHeaderMulti();
    return AXIOS.post("/v1/cast-movie", reqBody, config);
  },

  Detail(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/cast-movie/" + id, config);
  },

  Update(id, reqBody) {
    let config = {};
    config = header.authHeaderMulti();
    return AXIOS.post("/v1/cast-movie/" + id + "?_method=PUT", reqBody, config);
  },

  Delete(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.delete("/v1/cast-movie/" + id, config);
  },
};
