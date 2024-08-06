<template>
  <div class="container mt-5 owner">
    <div class="header">
      <h3>Borrow</h3>
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

        <template #cell(action)="data">
          <div class="content-action">
            <button @click="HandleEdit(data.item)">Detail</button>
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
        :role="selectedItem"
        @close="showModal = false"
        @refresh="getRole()"
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
  {
    key: "tanggal_pinjam",
    label: "Tanggal Pinjam",
    formatter: (value) => moment(value).format("DD-MM-YYYY"),
  },
  {
    key: "tanggal_kembali",
    label: "Batas Waktu",
    formatter: (value) => moment(value).format("DD-MM-YYYY"),
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
const getRole = () => {
  const params = {
    name: filterQuery.name,
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

const HandleEdit = (role) => {
  action.value = "U";
  selectedItem.value = role;
  showModal.value = true;
};

const HandleDelete = (role) => {
  isBusy.value = true;
  BookBorrowService.Delete(role.id)
    .then((res) => {
      isBusy.value = false;
      Functions.Notification("success", "Delete Role", res.data.message);
      getRole();
    })
    .catch((err) => {
      console.log(err);
    });
};

watch(
  () => filterQuery,
  (newVal) => {
    currentPage.value = 1;
    getRole();
    console.log(newVal);
  },
  {
    deep: true,
  }
);

onMounted(() => {
  getRole();
});
</script>

<style lang="scss">
@import "@/assets/scss/owner.scss";
</style>
