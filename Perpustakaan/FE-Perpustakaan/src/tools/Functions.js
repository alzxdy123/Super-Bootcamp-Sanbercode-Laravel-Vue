import { useI18n } from "vue-i18n";
import Crypto from "./crypto";

export default {
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
