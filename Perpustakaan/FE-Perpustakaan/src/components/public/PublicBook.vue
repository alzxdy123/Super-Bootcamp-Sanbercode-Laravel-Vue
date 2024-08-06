<template>
  <div class="container book">
    <div class="book-wrap">
      <BSpinner v-if="isBusy" style="width: 3rem; height: 3rem" />
      <BookCard v-else v-for="book in books" :key="book.id" :book="book" />
    </div>
  </div>
</template>

<script setup>
import BookService from "@/services/BookService";
import { onMounted, ref } from "vue";
import BookCard from "../BookCard.vue";

const isBusy = ref(false);
const books = ref();

const getBook = () => {
  isBusy.value = true;

  BookService.GetAll()
    .then((res) => {
      isBusy.value = false;

      books.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getBook();
});
</script>

<style lang="scss" scoped></style>
