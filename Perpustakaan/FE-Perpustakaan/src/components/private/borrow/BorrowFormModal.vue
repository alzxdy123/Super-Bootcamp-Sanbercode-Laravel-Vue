<template>
  <BModal centered size="md" title="false">
    <template #header>
      <h5 class="modal-title">{{ title }} Role</h5>
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
    </div>

    <template #footer>
      <BButton @click="emit('close')">Close</BButton>
      <BButton style="width: 150px" @click="HandleSubmit()">
        <BSpinner v-if="isBusy" small />
        <span v-else>{{ title }} Role</span>
      </BButton>
    </template>
  </BModal>
</template>

<script setup>
import RoleService from "@/services/RoleService";
import Functions from "@/tools/Functions";
import { reactive, ref, computed, watch } from "vue";

const props = defineProps({
  actionType: {
    type: String,
    default: "A",
  },
  role: {
    type: Object,
    default: {},
  },
});
const emit = defineEmits(["close", "refresh"]);
const isBusy = ref(false);
const errMessage = ref("");
const form = reactive({
  name: "",
});

const title = computed(() => {
  return props.actionType === "A" ? "Add" : "Edit";
});
const HandleAdd = () => {
  isBusy.value = true;
  const reqBody = new FormData();
  reqBody.append("name", form.name);
  RoleService.Add(reqBody)
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

  RoleService.Update(props.role.id, reqBody)
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
  () => props.role,
  (newVal) => {
    if (newVal) {
      form.name = newVal.name;
    }
  }
);
</script>

<style lang="scss"></style>
