import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Functions from "@/tools/Functions";

export const useUserStore = defineStore("user", () => {
  const userStorage = Functions.ReadSessionCustom("user");
  const verified = Functions.ReadSessionCustom("isVerified");
  const admin = Functions.ReadSessionCustom("isAdmin");

  const currentUser = ref(userStorage);
  const isVerified = ref(verified);
  const isAdmin = ref(admin);

  function setCurrentUser(user) {
    currentUser.value = user;

    if (user.role_id == "9c63724b-4f2e-482b-9fc2-350c0f68a4a5") {
      isAdmin.value = true;
      Functions.SaveSessionCustom("isAdmin", true);
    } else {
      isAdmin.value = false;
      Functions.SaveSessionCustom("isAdmin", false);
    }

    if (user.email_verified_at != null) {
      isVerified.value = true;
      Functions.SaveSessionCustom("isVerified", true);
    } else {
      isVerified.value = false;
      Functions.SaveSessionCustom("isVerified", false);
    }
  }

  return { currentUser, setCurrentUser, isVerified };
});
