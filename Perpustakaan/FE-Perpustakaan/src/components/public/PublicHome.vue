<template>
  <div>
    <Hero />

    <div class="container mt-5">
      <h3 class="mb-4 font-weight-bold" style="font-weight: bold">Category</h3>
      <div class="category">
        <BSpinner v-if="isBusy" style="width: 3rem; height: 3rem" />
        <CategoryBox
          v-else
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </div>
      <div class="book">
        <h3>Book</h3>
        <BSpinner v-if="isBusyBook" style="width: 3rem; height: 3rem" />
        <div class="book-wrap" v-else>
          <BookCard v-for="book in books" :key="book.id" :book="book" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Hero from "@/components/common/Hero.vue";
import BookService from "@/services/BookService";
import CategoryService from "@/services/CategoryService";
import { onMounted, ref } from "vue";
import CategoryBox from "../CategoryBox.vue";
import BookCard from "../BookCard.vue";

const categories = ref();
const books = ref();
const isBusy = ref(false);
const isBusyBook = ref(false);
const errorMessage = ref({});

const getCategory = () => {
  isBusy.value = true;
  CategoryService.GetAll()
    .then((res) => {
      isBusy.value = false;
      categories.value = res.data.data;
    })
    .catch((err) => {
      errorMessage.value = err.response.data.message;
    });
};

const getBook = () => {
  isBusyBook.value = true;

  BookService.GetAll()
    .then((res) => {
      isBusyBook.value = false;

      books.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getCategory();
  getBook();
});
</script>

<style lang="scss" scoped></style>
