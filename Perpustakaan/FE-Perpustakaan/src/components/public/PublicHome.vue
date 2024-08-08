<template>
  <div>
    <Hero />

    <div
      class="container-fluid d-flex justify-content-center flex-column align-items-center mt-5"
    >
      <!-- <div class="category">
        <h3>Category</h3>
        <CategoryBox
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </div> -->
      <div class="book">
        <div v-if="isBusyBook" class="text-center">
          <BSpinner style="width: 3rem; height: 3rem" />
        </div>
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
import { onMounted, ref } from "vue";
import CategoryBox from "../CategoryBox.vue";
import BookCard from "../BookCard.vue";
import Functions from "@/tools/Functions";
import CategoryService from "@/services/CategoryService";

const categories = ref();
const books = ref();
const isBusy = ref(false);
const isBusyBook = ref(false);
const errorMessage = ref({});

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

const getCategory = () => {
  isBusy.value = true;

  CategoryService.GetAll()
    .then((res) => {
      isBusy.value = false;
      categories.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getBook();
  // getCategory();
});
</script>

<style lang="scss" scoped></style>
