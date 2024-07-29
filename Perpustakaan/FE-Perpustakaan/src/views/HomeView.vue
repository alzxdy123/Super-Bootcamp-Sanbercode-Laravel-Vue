<template>
  <div>
    <BButton variant="primary" @click="show = !show">Click me</BButton>
    <BModal v-model="show">Test</BModal>
    <v-select :options="books" label="title"></v-select>
    {{ read }}
  </div>
</template>

<script setup lang="ts">
import Functions from "@/tools/Functions";
import { onMounted, ref } from "vue";
const show = ref(false);

const books = ref([
  { title: "Old Man's War" },
  { title: "The Lock Artist" },
  { title: "HTML5" },
  { title: "Right Ho Jeeves" },
  { title: "The Code of the Wooster" },
  { title: "Thank You Jeeves" },
]);

const test = ref("test");

const read = Functions.ReadSessionCustom("test");

onMounted(() => {
  Functions.SaveSessionCustom("test", test.value);
});
</script>
