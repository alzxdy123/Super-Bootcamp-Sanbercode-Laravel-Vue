<template>
  <div>
    <div class="container d-flex justify-content-center mt-5" v-if="!borrow">
      <BSpinner />
    </div>
    <div class="container" v-if="borrow">
      <section class="header">
        <h3>Borrow Detail</h3>
        <div class="action">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </section>
      <section>
        <div>
          <div>
            <p><strong>Peminjam: </strong> {{ borrow.user.username }}</p>
            <p>
              <strong>Peminjam: </strong>
              {{ formatedTanggal(borrow.tanggal_pinjam) }}
            </p>
            <p>
              <strong>Peminjam: </strong>
              {{ formatedTanggal(borrow.tanggal_kembali) }}
            </p>
            <p>
              <strong class="mb-2">Status: </strong>
              <span class="text-warning" v-if="borrow.status == 'P'"
                >Di Pinjam</span
              >
              <span class="text-success" v-if="borrow.status == 'K'"
                >Di Kembalikan</span
              >
              <span class="text-danger" v-if="borrow.status == 'T'"
                >Terlambat Pinjam</span
              >
            </p>
          </div>
        </div>
      </section>
      <section>
        <div class="d-flex gap-4">
          <img :src="borrow.book.cover" style="max-width: 200px" alt="" />
          <div>
            <p>
              <strong>Judul : </strong>
              {{ borrow.book.title }}
            </p>
            <p>
              <strong>Author : </strong>
              {{ borrow.book.author }}
            </p>
            <p>
              <strong>Category : </strong>
              {{ borrow.book.category.name }}
            </p>
          </div>
        </div>
      </section>
      <section class="footer">
        <button @click="Functions.ToPage('/dashboard/borrow')">Back</button>
      </section>
    </div>
  </div>
</template>

<script setup>
import BookBorrowService from "@/services/BookBorrowService";
import Functions from "@/tools/Functions";
import moment from "moment";
import { ref, computed } from "vue";
import { onMounted } from "vue";

const borrow = ref(null);
const borrowId = ref("");
const isBusy = ref(false);

const getBorrow = () => {
  isBusy.value = true;

  BookBorrowService.Detail(borrowId.value)
    .then((res) => {
      isBusy.value = false;
      borrow.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const formatedTanggal = (tanggal) => {
  return moment(tanggal).format("DD MMMM YYYY");
};

onMounted(() => {
  const id = Functions.ReadSessionCustom("borrowId");
  borrowId.value = id;
  getBorrow();
});
</script>

<style lang="scss" scoped></style>
