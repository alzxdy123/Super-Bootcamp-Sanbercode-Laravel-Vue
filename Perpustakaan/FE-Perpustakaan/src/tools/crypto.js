import CryptoJS from "crypto-js";

const kunci_akses =
  "uKZH9BxtDrTi8kv2Aaqt7Z40lw5snrEGXsmgPFFU8kugOsBiEVfity1Sr3SVIH6V";

export default {
  encryption: function (data) {
    try {
      if (data == null) {
        return null;
      } else {
        let enkripsi = CryptoJS.AES.encrypt(data, kunci_akses).toString();
        return enkripsi;
      }
    } catch (error) {
      window.console.log(error);
      return null;
    }
  },
  dencrytion: function (data) {
    try {
      if (data == null) {
        return null;
      } else {
        let bytes = CryptoJS.AES.decrypt(data, kunci_akses);
        let terjemaah = bytes.toString(CryptoJS.enc.Utf8);
        return terjemaah;
      }
    } catch (error) {
      window.console.log(error);
      return null;
    }
  },
};
