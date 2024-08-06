<template>
  <div>
    <div class="container mt-5">
      <div class="category">
        <BSpinner v-if="isBusy" style="width: 3rem; height: 3rem" />
        <CategoryBox
          v-else
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CategoryService from "@/services/CategoryService";
import { onMounted, ref } from "vue";
import CategoryBox from "../CategoryBox.vue";

const isBusy = ref(false);
const categories = ref();

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

onMounted(() => {
  getCategory();
});
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;

  .box {
    min-width: 200px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    white-space: normal;
  }
}
</style>
