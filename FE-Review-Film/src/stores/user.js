import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Functions from "@/tools/Functions";

export const useUserStore = defineStore("user", () => {
  const userStorage = Functions.ReadSessionCustom("user");
  const verified = Functions.ReadSessionCustom("isVerified");

  const currentUser = ref(userStorage);
  const isVerified = ref(verified);

  function setCurrentUser(user) {
    currentUser.value = user;

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
