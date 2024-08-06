<template>
  <div>
    <BContainer>
      <section class="d-flex justify-content-between">
        <BSpinner v-if="isBusy" />
        <h3 v-else>{{ category.name }}</h3>

        <div class="action">
          <button @click="Functions.ToPage('/dashboard/category/edit')">
            Edit
          </button>
          <button @click="Functions.ToPage('/dashboard/category/edit')">
            Delete
          </button>
        </div>
      </section>
    </BContainer>
    <BContainer
      class="mt-5"
      v-if="category.list_books && category.list_books.length"
    >
      <section class="p-5">
        <h3 class="mb-5">List Book</h3>

        <BSpinner v-if="isBusy" />
        <div v-else class="book">
          <BookCard
            v-for="book in category.list_books"
            :key="book.id"
            :book="book"
          />
        </div>
      </section>
    </BContainer>
    <footer class="container">
      <section>
        <button
          class="btn-back"
          @click="Functions.ToPage('/dashboard/category')"
        >
          Back
        </button>
      </section>
    </footer>
  </div>
</template>

<script setup>
import BookCard from "@/components/BookCard.vue";
import CategoryService from "@/services/CategoryService";
import Functions from "@/tools/Functions";
import { onMounted, ref } from "vue";

const categoryId = ref("");
const category = ref({});
const isBusy = ref(false);

const getCategories = () => {
  isBusy.value = true;
  CategoryService.Detail(categoryId.value)
    .then((res) => {
      isBusy.value = false;
      category.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  categoryId.value = Functions.ReadSessionCustom("categoryId");
  getCategories();
});
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  gap: 10px;

  button {
    width: 100px;
    height: 40px;
    background: #000;
    color: white;
  }
}

.btn-back {
  width: 100px;
  height: 40px;
  background: #000;
  color: white;
}

.book {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  margin: 0 !important;
}
</style>
