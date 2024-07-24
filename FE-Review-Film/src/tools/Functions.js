import Crypto from "./crypto";
import router from "../router";

export default {
  // ToPage(page) {
  //   this.SaveSessionCustom("page", page);
  //   return router.replace(page).catch((error) => {
  //     return error;
  //   });
  // },

  SaveSessionCustom(key, value) {
    let ToJson = JSON.stringify(value);
    let encrypt = Crypto.encryption(ToJson);
    return localStorage.setItem(key, encrypt);
  },
  ReadSessionCustom(key) {
    let read = localStorage.getItem(key);
    if (read == "null") {
      return null;
    } else {
      let dencrypt = Crypto.dencrytion(read);
      if (dencrypt == "" || dencrypt == undefined) {
        // this.ToPage("/");
        return null;
      } else {
        let JsonToData = JSON.parse(dencrypt);
        return JsonToData;
      }
    }
  },

  RemoveSessionCustom(key) {
    let read = localStorage.getItem(key);
    if (read == "null") {
      return false;
    } else {
      localStorage.removeItem(key);
      return true;
    }
  },
};
