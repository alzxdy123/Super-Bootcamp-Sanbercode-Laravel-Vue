<template>
  <div>
    <Hero />

    <div class="container mt-5">
      <h3 class="mb-4 font-weight-bold" style="font-weight: bold">Category</h3>
      <div class="category">
        <BSpinner v-if="isBusy" style="width: 3rem; height: 3rem" />
        <div
          v-else
          v-for="category in categories"
          :key="category.id"
          class="box"
        >
          {{ category.name }}
        </div>
      </div>
    </div>

    <div class="container book">
      <h3>Book</h3>
      <div class="book-wrap">
        <BSpinner v-if="isBusy" style="width: 3rem; height: 3rem" />
        <div class="book-card" v-else v-for="book in books">
          <img :src="book.cover" />
          <div class="content">
            <div class="avaible" v-if="book.status == 'A'">Tersedia</div>
            <div class="unavaible" v-if="book.status == 'N'">
              Tidak tersedia
            </div>
            <h5>{{ book.title }}</h5>
            <div>{{ book.category.name }}</div>
            <div>{{ book.author }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Hero from "@/components/Hero.vue";
import BookService from "@/services/BookService";
import CategoryService from "@/services/CategoryService";
import { onMounted, ref } from "vue";

const categories = ref();
const books = ref();
const isBusy = ref(false);
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
  getCategory();
  getBook();
});
</script>

<style lang="scss" scoped></style>
