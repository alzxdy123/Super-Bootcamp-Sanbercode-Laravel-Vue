<template>
  <div class="container mt-5 owner">
    <div class="header">
      <h3>Book</h3>
      <button @click="HandleAdd()">Add</button>
    </div>
    <div class="table table-responsive">
      <div class="filter">
        <BFormGroup class="d-flex">
          <BFormInput
            class="me-2"
            style="height: 49px"
            placeholder="Search"
            v-model="filterQuery.title"
          />
        </BFormGroup>
        <v-select
          :options="categories"
          :loading="isBusy"
          label="name"
          value="id"
          placeholder="Category"
          v-model="filterQuery.category_id"
        ></v-select>
        <v-select
          style="width: 250px"
          :options="status"
          :loading="isBusy"
          placeholder="Status"
          v-model="filterQuery.status"
          :reduce="(status) => status.value"
        ></v-select>
      </div>
      <BTable
        :items="books"
        :fields="fields"
        :busy="isBusyTable"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #table-busy>
          <div class="d-flex justify-content-center mt-5">
            <span v-if="errorMessage">{{ errorMessage }}</span>
            <BSpinner v-else />
          </div>
        </template>

        <template #cell(cover)="data">
          <img :src="data.item.cover" width="50px" alt="Book Cover" />
        </template>
        <template #cell(status)="data">
          <div class="text-center">
            <div v-if="data.item.status === 'A'" class="text-success">
              Tersedia
            </div>
            <div v-else class="text-danger">Tidak tersedia</div>
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
          align="end"
        />
      </div>
      <BookFormModal
        v-model="showModal"
        :actionType="action"
        :categories="categories"
        :book="selectedItem"
        @close="showModal = false"
        @refresh="getBooks()"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed, reactive } from "vue";
import BookService from "@/services/BookService";
import CategoryService from "@/services/CategoryService";
import Functions from "@/tools/Functions";
import BookFormModal from "./modal/BookFormModal.vue";

const showModal = ref(false);
const books = ref([]);
const currentPage = ref(1);
const perPage = ref(5);
const totalRows = computed(() => books.value?.length || 0);
const fields = ref([
  { key: "cover", label: "Cover" },
  { key: "title", label: "Title" },
  { key: "author", label: "Author", style: "width: 60px;" },
  { key: "category.name", label: "Category" },
  { key: "stok", label: "Stok" },
  { key: "status", label: "Status", class: "text-center" },
  {
    key: "action",
    label: "Action",
    class: "text-center",
  },
]);
const isBusy = ref(false);
const isBusyTable = ref(false);
const status = ref([
  { label: "Tersedia", value: "A" },
  { label: "Tidak tersedia", value: "N" },
]);
const categories = ref([]);
const action = ref("");
const selectedItem = ref(null);
const filterQuery = reactive({
  title: "",
  category_id: "",
  status: "A",
});
const errorMessage = ref("");

const HandleAdd = () => {
  action.value = "A";
  selectedItem.value = {
    title: "",
    summary: "",
    cover: null,
    coverUrl: "",
    stok: "",
    author: "",
    category: "",
  };
  showModal.value = true;
};
const getCategories = () => {
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
const getBooks = () => {
  const query = {
    title: filterQuery.title,
    category_id: filterQuery.category_id.id,
    status: filterQuery.status,
  };

  isBusyTable.value = true;
  BookService.GetAll(query)
    .then((res) => {
      isBusyTable.value = false;
      books.value = res.data.data;
    })
    .catch((err) => {
      isBusyTable.value = true;
      errorMessage.value = err.response.data.message;
      books.value = [];
    });
};
const HandleDetail = (book) => {
  Functions.SaveSessionCustom("book", book);
  Functions.ToPage("/");
};
const HandleEdit = (book) => {
  action.value = "U";
  selectedItem.value = book;
  showModal.value = true;
};
const HandleDelete = (book) => {
  isBusyTable.value = true;
  BookService.Delete(book.id)
    .then((res) => {
      isBusyTable.value = false;
      Functions.Notification("success", "Delete Book", res.data.message);
      getBooks();
    })
    .catch((err) => {
      console.log(err);
    });
};

watch(
  () => filterQuery,
  (newVal) => {
    currentPage.value = 1;
    getBooks();
    console.log(newVal);
  },
  {
    deep: true,
  }
);

onMounted(() => {
  getBooks();
  getCategories();
});
</script>

<style lang="scss">
@import "@/assets/scss/owner.scss";
</style>
