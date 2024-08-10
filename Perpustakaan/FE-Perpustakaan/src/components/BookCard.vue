<template>
  <div class="book-card">
    <img :src="props.book.cover" />
    <div class="content">
      <div class="text-success mt-3" v-if="props.book.status == 'A'">
        Tersedia
      </div>
      <div class="text-danger mt-3" v-if="props.book.status == 'N'">
        Tidak tersedia
      </div>
      <h5>{{ props.book.title }}</h5>
      <div>{{ props.book.author }}</div>
      <div v-if="props.book.category && props.book.category.name">
        {{ props.book.category.name }}
      </div>
    </div>
    <div class="actions">
      <div class="buttons">
        <button class="btn-detail" @click="handleDetail()">
          <span>Detail</span>
        </button>
        <button v-if="token" class="btn-borrow" @click="Borrow()">
          <BSpinner v-if="isBusy" small></BSpinner>
          <span v-else>Pinjam</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BookBorrowService from "@/services/BookBorrowService";
import Functions from "@/tools/Functions";
import { onMounted, ref } from "vue";

const isBusy = ref(false);
const token = localStorage.getItem("token");

const props = defineProps({
  book: Object,
});

const Borrow = () => {
  isBusy.value = true;

  const reqBody = {
    book_id: props.book.id,
    username: user.username,
  };

  console.log(reqBody);

  BookBorrowService.Add(reqBody)
    .then((res) => {
      isBusy.value = false;
      console.log(res);
    })
    .catch((err) => {
      isBusy.value = false;
      console.log(err);
      Functions.Notification("error", "Borrow", err.response.data.message);
    });
};

const handleDetail = () => {
  Functions.ToPage("/book/" + props.book.id);
};

const user = Functions.ReadSessionCustom("user");
// console.log("🚀 ~ user:", user);
</script>

<style lang="scss" scoped>
.book-card {
  width: 230px !important;
  padding: 10px;
  height: auto;
  min-height: 300px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    width: 160px !important;
    height: 240px !important;
    align-self: center;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;

    h5 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    div {
      font-size: 14px;
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .buttons {
      display: flex;
      margin-top: 20px;

      justify-content: center;
      flex-direction: column;
      .btn-detail {
        width: 200px;
        border-radius: 5px;
        height: 40px;
        background: white;
        color: #000;
        border: 1px solid #000;
        margin-bottom: 10px;
      }

      .btn-borrow {
        width: 200px;
        border-radius: 5px;
        height: 40px;
        background: #000;
        color: white;
        margin-top: 10px;
      }
    }
  }
}
</style>
