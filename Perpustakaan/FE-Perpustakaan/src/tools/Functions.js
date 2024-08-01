import { useI18n } from "vue-i18n";
import Crypto from "./crypto";
import router from "@/router";
import { notify } from "@kyvg/vue3-notification";

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

  GenerateCaptcha(length) {
    let chapcha = "";
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      chapcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return chapcha;
  },

  ToPage(route) {
    router.push(route);
  },

  Notification(type, title, message) {
    notify({
      type: type,
      title: title,
      text: message,
    });
  },

  ErrorMessage(error) {
    for (let i = 0; i < error.length; i++) {
      return error[i];
    }
  },
};
