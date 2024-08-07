<template>
  <BModal centered size="md" title="false">
    <template #header>
      <h5 class="modal-title">{{ title }} Borrow</h5>
      <BButton
        class="btn-close"
        @click="emit('close')"
        aria-label="Close"
      ></BButton>
    </template>

    <div>
      <BFormGroup
        class="mb-3"
        :class="errMessage.username ? 'has-error' : ''"
        label="Name"
      >
        <v-select
          :loading="isBusyUser"
          :options="users"
          v-model="form.username"
          label="username"
          :disabled="props.actionType == 'U'"
        ></v-select>
      </BFormGroup>

      <BFormGroup
        class="mb-3"
        :class="errMessage.book ? 'has-error' : ''"
        label="Book"
      >
        <v-select
          :loading="isBusyBook"
          :options="books"
          v-model="form.book"
          label="title"
          :disabled="props.actionType == 'U'"
        ></v-select>
      </BFormGroup>

      <BFormGroup
        v-if="props.actionType == 'U'"
        class="mb-3"
        :class="errMessage.status ? 'has-error' : ''"
        label="Status"
      >
        <v-select
          :options="status"
          v-model="form.status"
          :reduce="(status) => status.value"
        ></v-select>
      </BFormGroup>
    </div>

    <template #footer>
      <BButton @click="emit('close')">Close</BButton>
      <BButton style="width: 150px" @click="HandleSubmit()">
        <BSpinner v-if="isBusy" small />
        <span v-else>{{ title }} Borrow</span>
      </BButton>
    </template>
  </BModal>
</template>

<script setup>
import AuthService from "@/services/AuthService";
import BookBorrowService from "@/services/BookBorrowService";
import BookService from "@/services/BookService";
import Functions from "@/tools/Functions";
import { reactive, ref, computed, watch, onMounted } from "vue";

const props = defineProps({
  actionType: {
    type: String,
    default: "A",
  },
  borrow: {
    type: Object,
    default: {},
  },
});
const emit = defineEmits(["close", "refresh"]);
const isBusy = ref(false);
const errMessage = ref("");
const form = reactive({
  username: "",
  book: "",
  tgl_pinjam: "",
  tgl_kembali: "",
  status: "",
});
const users = ref([]);
const books = ref([]);
const isBusyUser = ref(false);
const isBusyBook = ref(false);
const status = ref([
  { label: "Di Pinjam", value: "P" },
  { label: "Di kembalikan", value: "K" },
  { label: "Terlambat", value: "T" },
]);

const getUser = () => {
  isBusyUser.value = true;

  AuthService.getUser()
    .then((res) => {
      isBusyUser.value = false;
      users.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
      isBusyUser.value = false;
    });
};

const getBook = () => {
  isBusyBook.value = true;

  BookService.GetAll()
    .then((res) => {
      isBusyBook.value = false;
      books.value = res.data.data;
    })
    .catch((err) => {
      isBusyBook.value = false;
      console.log(err);
    });
};

const title = computed(() => {
  return props.actionType === "A" ? "Add" : "Edit";
});

const HandleAdd = () => {
  isBusy.value = true;

  const reqBody = {
    user_id: form.username.id,
    book_id: form.book.id,
  };

  console.log(reqBody);

  BookBorrowService.AddAdmin(reqBody)
    .then((res) => {
      isBusy.value = false;
      errMessage.value = "";
      Functions.Notification("success", "Add Borrow", res.data.message);
      Reset();
      emit("close");
      emit("refresh");
    })
    .catch((err) => {
      isBusy.value = false;
      errMessage.value = err.response.data.errors;
    });
};
const handleEdit = () => {
  isBusy.value = true;

  const reqBody = {
    status: form.status,
  };

  BookBorrowService.Update(props.borrow.id, reqBody)
    .then((res) => {
      isBusy.value = false;
      Functions.Notification("success", "Edit", res.data.message);
      emit("close");
      emit("refresh");
      Reset();
    })
    .catch((err) => {
      isBusy.value = false;
      errMessage.value = err.response.data.errors;
    });
};
const Reset = () => {
  form.username = "";
  form.book = "";
};
const HandleSubmit = () => {
  props.actionType == "A" ? HandleAdd() : handleEdit();
};

watch(
  () => props.borrow,
  (newVal) => {
    if (newVal) {
      form.username = newVal.user;
      form.book = newVal.book;
      form.status = newVal.status;
      console.log(newVal);
    }
  }
);

onMounted(() => {
  getUser();
  getBook();
});
</script>

<style lang="scss"></style>
