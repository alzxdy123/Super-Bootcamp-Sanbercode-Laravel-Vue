import { AXIOS } from "../services/common/server";
import header from "./common/header";

export default {
  GetAll() {
    const config = {
      ...header.authHeader(),
    };
    return AXIOS.get("v1/category", config);
  },
};
