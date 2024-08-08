<template>
  <div>
    <div v-if="isBusy" class="text-center">
      <BSpinner />
    </div>
    <div v-else class="container mt-5">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category-section"
      >
        <h3>{{ category.name }}</h3>
        <div class="book-wrap" v-if="category.list_books">
          <BookCard v-for="book in category.list_books" :book="book" />
        </div>
        <div v-else class="no-books">Belum ada buku di category ini</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CategoryService from "@/services/CategoryService";
import BookCard from "../BookCard.vue";

const isBusy = ref(false);
const categories = ref([]);

const getCategory = () => {
  isBusy.value = true;

  CategoryService.GetAll()
    .then((res) => {
      isBusy.value = false;
      categories.value = res.data.data;
    })
    .catch((err) => {
      isBusy.value = false;
      console.log(err.response.data.message);
    });
};

onMounted(() => {
  getCategory();
});
</script>

<style lang="scss" scoped>
.category-section {
  margin-bottom: 50px;
  height: 540px;

  h3 {
    margin-bottom: 15px;
  }

  .book-wrap {
    display: flex;
    gap: 15px;
    padding-bottom: 10px;
    height: auto;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .no-books {
    font-size: 14px;
    color: #888;
  }
}
</style>
