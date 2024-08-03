<template>
  <div class="container book">
    <div class="book-wrap">
      <BSpinner v-if="isBusy" style="width: 3rem; height: 3rem" />
      <div class="book-card" v-else v-for="book in books">
        <img :src="book.cover" />
        <div class="content">
          <div class="avaible" v-if="book.status == 'A'">Tersedia</div>
          <div class="unavaible" v-if="book.status == 'N'">Tidak tersedia</div>
          <h5>{{ book.title }}</h5>
          <div>{{ book.category.name }}</div>
          <div>{{ book.author }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BookService from "@/services/BookService";
import { onMounted, ref } from "vue";

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
