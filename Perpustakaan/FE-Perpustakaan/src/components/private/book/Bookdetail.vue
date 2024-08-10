<template>
  <div class="container mt-5 owner">
    <div class="d-flex justify-content-center mb-5" v-if="!book">
      <BSpinner style="width: 3rem; height: 3rem" />
    </div>
    <div class="book" v-else>
      <img :src="book.cover" alt="" style="max-width: 300px" />
      <div class="content">
        <h3><strong>Title : </strong>{{ book.title }}</h3>
        <p><strong>Stok : </strong>{{ book.stok }}</p>
        <p><strong>Summary : </strong>{{ book.summary }}</p>
        <p><strong>Author : </strong>{{ book.author }}</p>
        <p><strong>Category : </strong>{{ book.category.name }}</p>
      </div>
    </div>
    <div class="container footer">
      <button @click="Functions.ToPage('/dashboard/book')">Back</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Functions from "@/tools/Functions";
import BookService from "@/services/BookService";

const bookId = ref("");
const book = ref(null);
const isBusy = ref(false);

const getBook = () => {
  isBusy.value = true;
  BookService.GetDetail(bookId.value)
    .then((res) => {
      isBusy.value = false;
      book.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  bookId.value = Functions.ReadSessionCustom("bookId");
  getBook();
});
</script>

<style lang="scss">
@import "../../../assets/scss/common.scss";
</style>
