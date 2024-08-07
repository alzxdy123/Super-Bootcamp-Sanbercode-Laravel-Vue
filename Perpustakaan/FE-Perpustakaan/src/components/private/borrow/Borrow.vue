<template>
  <div class="container mt-5 owner">
    <div class="header">
      <h3>Borrow</h3>
      <button @click="HandleAdd()">Add</button>
    </div>
    <div class="table table-responsive">
      <!-- <div class="filter">
        <BFormGroup class="d-flex">
          <BFormInput
            class="me-2"
            style="height: 49px"
            placeholder="Search"
            v-model="filterQuery.name"
          />
        </BFormGroup>
      </div> -->
      <BTable
        :items="roles"
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

        <template #cell(status)="data">
          <div v-if="data.item.status == 'P'" class="text-warning">
            Di Pinjam
          </div>
          <div v-else-if="data.item.status == 'K'" class="text-success">
            Di Kembalikan
          </div>
          <div v-else-if="data.item.status == 'T'" class="text-danger">
            Terlambat Kembalikan
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
      <BorrowFormModal
        v-model="showModal"
        :actionType="action"
        :borrow="selectedItem"
        @close="showModal = false"
        @refresh="getBorrow()"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed, reactive } from "vue";
import Functions from "@/tools/Functions";
import BookBorrowService from "@/services/BookBorrowService";
import BorrowFormModal from "./BorrowFormModal.vue";
import moment from "moment";

const showModal = ref(false);
const roles = ref([]);
const currentPage = ref(1);
const perPage = ref(5);
const totalRows = computed(() => roles.value?.length || 0);
const fields = ref([
  { key: "user.username", label: "Username" },
  { key: "book.title", label: "Book" },
  {
    key: "tanggal_pinjam",
    label: "Tanggal Pinjam",
    formatter: (value) => {
      return moment(value).format("DD MMMM YYYY");
    },
  },
  {
    key: "tanggal_kembali",
    label: "Batas Waktu",
    formatter: (value) => {
      return moment(value).format("DD MMMM YYYY");
    },
  },
  { key: "status", label: "status" },
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
  username: "",
});
const errorMessage = ref("");

const HandleAdd = () => {
  action.value = "A";
  selectedItem.value = {
    username: "",
    book: "",
  };
  showModal.value = true;
};

const HandleDetail = (borrow) => {
  Functions.SaveSessionCustom("borrowId", borrow.id);
  Functions.ToPage("/dashboard/borrow/detail");
};

const getBorrow = () => {
  const params = {
    username: filterQuery.username,
  };

  isBusy.value = true;
  BookBorrowService.GetAll(params)
    .then((res) => {
      isBusy.value = false;
      roles.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const HandleEdit = (borrow) => {
  action.value = "U";
  selectedItem.value = borrow;
  showModal.value = true;
};

const HandleDelete = (role) => {
  isBusy.value = true;
  BookBorrowService.Delete(role.id)
    .then((res) => {
      isBusy.value = false;
      Functions.Notification("success", "Delete Borrow", res.data.message);
      getBorrow();
    })
    .catch((err) => {
      console.log(err);
    });
};

watch(
  () => filterQuery,
  (newVal) => {
    currentPage.value = 1;
    getBorrow();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  getBorrow();
});
</script>

<style lang="scss">
@import "@/assets/scss/owner.scss";
</style>
