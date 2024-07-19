import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useHomeStore = defineStore("home", () => {
  const name = ref("aldy");
  const profession = ref("fullstack web developer");
  const bio = ref(
    "Working within Vue Js & Laravel, transform ideas into digital realities that are <br /> easily accessible and inclusive for web users."
  );

  const ExperienceLists = reactive([
    {
      name: "Frontend Developer",
      company: "PT. Sarana Pactindo",
      location: "Bandung",
      date: "October 2023 - May 2024",
    },
  ]);

  return { name, profession, bio, ExperienceLists };
});
