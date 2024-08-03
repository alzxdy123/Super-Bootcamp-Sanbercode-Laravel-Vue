<template>
  <BModal centered size="lg" title="false" scrollable>
    <template #header>
      <h5 class="modal-title">{{ title }} Book</h5>
      <BButton
        class="btn-close"
        @click="emit('close')"
        aria-label="Close"
      ></BButton>
    </template>

    <div>
      <BFormGroup
        class="mb-3"
        :class="errMessage.title ? 'has-error' : ''"
        label="Title"
      >
        <BFormInput v-model="form.title" />
        <div v-if="errMessage.title" class="text-danger">
          {{ Functions.ErrorMessage(errMessage.title) }}
        </div>
      </BFormGroup>
      <BFormGroup
        class="mb-3"
        :class="errMessage.summary ? 'has-error' : ''"
        label="Summary"
      >
        <BFormTextarea :no-resize="true" v-model="form.summary" />
        <div v-if="errMessage.summary" class="text-danger">
          {{ Functions.ErrorMessage(errMessage.summary) }}
        </div>
      </BFormGroup>
      <BFormGroup
        class="mb-3"
        :class="errMessage.cover ? 'has-error' : ''"
        label="Cover"
      >
        <BFormFile @change="handleFileUpload" accept="image/*" />
        <img
          v-if="form.coverUrl"
          :src="form.coverUrl"
          alt="Cover Image"
          class="img-thumbnail mt-2"
          style="max-height: 200px"
        />
        <div v-if="errMessage.cover" class="text-danger">
          {{ Functions.ErrorMessage(errMessage.cover) }}
        </div>
      </BFormGroup>
      <BFormGroup
        class="mb-3"
        :class="errMessage.stok ? 'has-error' : ''"
        label="Stok"
      >
        <BFormInput type="number" v-model="form.stok" />
        <div v-if="errMessage.stok" class="text-danger">
          {{ Functions.ErrorMessage(errMessage.stok) }}
        </div>
      </BFormGroup>
      <BFormGroup
        class="mb-3"
        :class="errMessage.author ? 'has-error' : ''"
        label="Author"
      >
        <BFormInput v-model="form.author" />
        <div v-if="errMessage.author" class="text-danger">
          {{ Functions.ErrorMessage(errMessage.author) }}
        </div>
      </BFormGroup>
      <BFormGroup class="mb-3" label="Category">
        <v-select
          :options="props.categories"
          value="id"
          label="name"
          :class="errMessage.category_id ? 'has-error' : ''"
          v-model="form.category"
          :busy="!props.categories.length"
        ></v-select>
        <div v-if="errMessage.category_id" class="text-danger">
          {{ Functions.ErrorMessage(errMessage.category_id) }}
        </div>
      </BFormGroup>
    </div>

    <template #footer>
      <BButton @click="emit('close')">Close</BButton>
      <BButton style="width: 100px" @click="HandleSubmit()">
        <BSpinner v-if="isBusy" small />
        <span v-else>{{ title }} Book</span>
      </BButton>
    </template>
  </BModal>
</template>

<script setup>
import BookService from "@/services/BookService";
import Functions from "@/tools/Functions";
import { reactive, ref, computed, watch } from "vue";

const showModal = ref(true);
const props = defineProps({
  actionType: {
    type: String,
    default: "A",
  },
  categories: {
    type: Array,
    default: [],
  },
  book: {
    type: Object,
    default: {},
  },
});
const emit = defineEmits(["close", "refresh"]);
const isBusy = ref(false);
const errMessage = ref("");
const form = reactive({
  title: "",
  summary: "",
  cover: null,
  coverUrl: "",
  stok: "",
  author: "",
  category: "",
});
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.cover = file;
    form.coverUrl = URL.createObjectURL(file);
  } else {
    form.cover = null;
    form.coverUrl = "";
  }
};
const title = computed(() => {
  return props.actionType === "A" ? "Add" : "Edit";
});
const HandleAdd = () => {
  isBusy.value = true;
  const reqBody = new FormData();
  reqBody.append("title", form.title);
  reqBody.append("summary", form.summary);
  reqBody.append("stok", form.stok);
  reqBody.append("author", form.author);
  reqBody.append("category_id", form.category.id);
  if (form.cover) {
    reqBody.append("cover", form.cover);
  }
  BookService.Add(reqBody)
    .then((res) => {
      isBusy.value = false;
      errMessage.value = "";
      Functions.Notification("success", "Add Book", res.data.message);
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
  const reqBody = new FormData();
  reqBody.append("title", form.title);
  reqBody.append("summary", form.summary);
  reqBody.append("stok", form.stok);
  reqBody.append("author", form.author);
  reqBody.append("category_id", form.category.id);
  if (form.cover) {
    reqBody.append("cover", form.cover);
  }

  BookService.Edit(props.book.id, reqBody)
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
  form.title = "";
  form.summary = "";
  form.cover = null;
  form.stok = "";
  form.author = "";
  form.category = "";
};
const HandleSubmit = () => {
  props.actionType == "A" ? HandleAdd() : handleEdit();
};

watch(
  () => props.book,
  (newVal) => {
    if (newVal) {
      form.title = newVal.title;
      form.summary = newVal.summary;
      form.cover = null;
      form.coverUrl = newVal.cover;
      form.stok = newVal.stok;
      form.author = newVal.author;
      form.category = newVal.category;
    }
  }
);
</script>

<style lang="scss"></style>
