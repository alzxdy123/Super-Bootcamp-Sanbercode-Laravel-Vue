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

    if (
      (user.role_id =
        "$2y$10$fhLKVMRfS5TBeVE6l4zD5e7xMf.UX54cSoPBFvQhRzTW2.1lXHOAW")
    ) {
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
