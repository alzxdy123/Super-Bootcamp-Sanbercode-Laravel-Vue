import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  GetAll() {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/movie", config);
  },

  Add(reqBody) {
    let config = {};
    config = header.authHeaderMulti();
    return AXIOS.post("/v1/movie", reqBody, config);
  },

  Detail(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/movie/" + id, config);
  },

  Update(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.put("/v1/movie/" + reqBody.id, reqBody, config);
  },

  Delete(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.delete("/v1/movie/" + id, config);
  },
};
