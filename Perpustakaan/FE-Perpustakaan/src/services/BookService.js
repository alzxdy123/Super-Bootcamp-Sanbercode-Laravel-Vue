import { AXIOS } from "../services/common/server";
import header from "./common/header";

export default {
  GetAll(params) {
    const config = {
      ...header.authHeader(),
      params: params,
    };
    return AXIOS.get("v1/book", config);
  },
  GetDetail(id) {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.get("v1/book/" + id, config);
  },
  Add(reqBody) {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.post("v1/book", reqBody, config);
  },
  Edit(id, reqBody) {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.post("v1/book/" + id + "?_method=PUT", reqBody, config);
  },
  Delete(id) {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.delete("v1/book/" + id, config);
  },
};
