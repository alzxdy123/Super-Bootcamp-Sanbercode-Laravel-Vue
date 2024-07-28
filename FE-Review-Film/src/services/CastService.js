import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  GetAll() {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/cast", config);
  },

  Add(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.post("/v1/cast", reqBody, config);
  },

  Detail(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/cast/" + id, config);
  },

  Update(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.put("/v1/cast/" + reqBody.id, reqBody, config);
  },

  Delete(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.delete("/v1/cast/" + id, config);
  },
};
