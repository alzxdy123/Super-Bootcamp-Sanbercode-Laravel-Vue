<template>
  <BModal centered size="md" title="false">
    <template #header>
      <h5 class="modal-title">{{ title }} Category</h5>
      <BButton
        class="btn-close"
        @click="emit('close')"
        aria-label="Close"
      ></BButton>
    </template>

    <div>
      <BFormGroup
        class="mb-3"
        :class="errMessage.name ? 'has-error' : ''"
        label="Name"
      >
        <BFormInput v-model="form.name" />
        <div v-if="errMessage.name" class="text-danger">
          {{ Functions.ErrorMessage(errMessage.name) }}
        </div>
      </BFormGroup>
      <!-- <BFormGroup
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
      </BFormGroup> -->
    </div>

    <template #footer>
      <BButton @click="emit('close')">Close</BButton>
      <BButton style="width: 150px" @click="HandleSubmit()">
        <BSpinner v-if="isBusy" small />
        <span v-else>{{ title }} Category</span>
      </BButton>
    </template>
  </BModal>
</template>

<script setup>
import CategoryService from "@/services/CategoryService";
import Functions from "@/tools/Functions";
import { reactive, ref, computed, watch } from "vue";

const props = defineProps({
  actionType: {
    type: String,
    default: "A",
  },
  category: {
    type: Object,
    default: {},
  },
});
const emit = defineEmits(["close", "refresh"]);
const isBusy = ref(false);
const errMessage = ref("");
const form = reactive({
  name: "",
  background: null,
  backgroundUrl: "",
});
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.background = file;
    form.backgroundUrl = URL.createObjectURL(file);
  } else {
    form.background = null;
    form.backgroundUrl = "";
  }
};
const title = computed(() => {
  return props.actionType === "A" ? "Add" : "Edit";
});
const HandleAdd = () => {
  isBusy.value = true;
  const reqBody = new FormData();
  reqBody.append("name", form.name);
  if (form.background) {
    reqBody.append("background", form.background);
  }
  CategoryService.Add(reqBody)
    .then((res) => {
      isBusy.value = false;
      errMessage.value = "";
      Functions.Notification("success", "Add Category", res.data.message);
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
  reqBody.append("name", form.name);
  if (form.cover) {
    reqBody.append("background", form.background);
  }

  CategoryService.Update(props.category.id, reqBody)
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
  form.cover = null;
  form.coverUrl = "";
};
const HandleSubmit = () => {
  props.actionType == "A" ? HandleAdd() : handleEdit();
};

watch(
  () => props.category,
  (newVal) => {
    if (newVal) {
      form.name = newVal.name;
      form.background = null;
      form.backgroundUrl = newVal.background;
    }
  }
);
</script>

<style lang="scss"></style>
