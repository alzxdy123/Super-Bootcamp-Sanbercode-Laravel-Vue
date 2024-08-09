<template>
  <div class="container mt-5 owner">
    <div class="header">
      <h3>Category</h3>
      <button @click="HandleAdd()">Add</button>
    </div>
    <div class="table table-responsive">
      <div class="filter">
        <BFormGroup class="d-flex">
          <BFormInput
            class="me-2"
            style="height: 49px"
            placeholder="Search"
            v-model="filterQuery.name"
          />
        </BFormGroup>
      </div>
      <BTable
        :items="categories"
        :fields="fields"
        :busy="isBusy"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #table-busy>
          <div class="d-flex justify-content-center mt-5">
            <span v-if="errorMessage">{{ errorMessage }}</span>
            <BSpinner v-else />
          </div>
        </template>

        <template #cell(action)="data">
          <div class="content-action">
            <button @click="HandleDetail(data.item)">Detail</button>
            <button @click="HandleEdit(data.item)">Edit</button>
            <button @click="HandleDelete(data.item)">Hapus</button>
          </div>
        </template>
      </BTable>
      <div class="pagination-tables">
        <BPagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="mt-4"
          align="start"
        />
      </div>
      <CategioryFormModal
        v-model="showModal"
        :actionType="action"
        :category="selectedItem"
        @close="showModal = false"
        @refresh="getCategories()"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed, reactive } from "vue";
import CategoryService from "@/services/CategoryService";
import Functions from "@/tools/Functions";
import CategioryFormModal from "./CategioryFormModal.vue";

const showModal = ref(false);
const categories = ref([]);
const currentPage = ref(1);
const perPage = ref(5);
const totalRows = computed(() => categories.value?.length || 0);
const fields = ref([
  { key: "name", label: "Name", thStyle: "width: 80%" },
  {
    key: "action",
    label: "Action",
    class: "text-center",
  },
]);
const isBusy = ref(false);
const action = ref("");
const selectedItem = ref(null);
const filterQuery = reactive({
  name: "",
});
const errorMessage = ref("");

const HandleAdd = () => {
  action.value = "A";
  selectedItem.value = {
    name: "",
    backgroundUrl: "",
    background: null,
  };
  showModal.value = true;
};
const getCategories = () => {
  const params = {
    name: filterQuery.name,
  };

  isBusy.value = true;
  CategoryService.GetAll(params)
    .then((res) => {
      isBusy.value = false;
      categories.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);

      isBusy.value = false;
      if (categories.value.lengthb < 0) {
        errorMessage.value = "data not found";
      }
    });
};

const HandleDetail = (category) => {
  Functions.SaveSessionCustom("categoryId", category.id);
  Functions.ToPage("/dashboard/category/detail");
};

const HandleEdit = (category) => {
  action.value = "U";
  selectedItem.value = category;
  showModal.value = true;
};

const HandleDelete = (category) => {
  isBusy.value = true;
  CategoryService.Delete(category.id)
    .then((res) => {
      isBusyTable.value = false;
      Functions.Notification("success", "Delete Category", res.data.message);
      getCategories();
    })
    .catch((err) => {
      console.log(err);
    });
};

watch(
  () => filterQuery,
  (newVal) => {
    currentPage.value = 1;
    getCategories();
    console.log(newVal);
  },
  {
    deep: true,
  }
);

onMounted(() => {
  getCategories();
});
</script>

<style lang="scss">
@import "@/assets/scss/owner.scss";
</style>
