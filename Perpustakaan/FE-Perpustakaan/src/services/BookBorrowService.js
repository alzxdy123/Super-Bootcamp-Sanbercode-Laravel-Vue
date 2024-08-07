import { AXIOS } from "../services/common/server";
import header from "./common/header";

export default {
  GetAll(params) {
    const config = {
      ...header.authHeader(),
      params: params,
    };
    return AXIOS.get("v1/borrow", config);
  },

  Detail(id) {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.get("v1/borrow/" + id, config);
  },

  Add(reqBody) {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.post("v1/borrow", reqBody, config);
  },

  Update(id, reqBody) {
    const config = { ...header.authHeader() };
    return AXIOS.post("v1/borrow/" + id + "?_method=PUT", reqBody, config);
  },

  Delete(id) {
    const config = { ...header.authHeader() };
    return AXIOS.delete("v1/borrow/" + id, config);
  },

  Check(reqBody) {
    const config = { ...header.authHeader() };
    return AXIOS.post("v1/check", reqBody, config);
  },

  AddAdmin(reqBody) {
    const config = { ...header.authHeader() };
    return AXIOS.post("v1/borrow/admin", reqBody, config);
  },
};
