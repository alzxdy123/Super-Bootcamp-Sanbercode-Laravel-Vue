<template>
  <div class="box">
    {{ category.name }}
  </div>
</template>

<script setup>
const props = defineProps({
  category: Object,
});
</script>

<style lang="scss" scoped></style>
