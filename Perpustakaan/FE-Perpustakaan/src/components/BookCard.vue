<template>
  <div class="book-card">
    <img :src="props.book.cover" style="max-width: 100px" />
    <div class="content">
      <div class="text-success" v-if="props.book.status == 'A'">Tersedia</div>
      <div class="text-danger" v-if="props.book.status == 'N'">
        Tidak tersedia
      </div>
      <h5>{{ props.book.title }}</h5>
      <div>{{ props.book.category.name }}</div>
      <div>{{ props.book.author }}</div>
      <div>
        <BSpinner v-if="isBusyBorrow" small />
        <button class="btn-borrow" @click="Borrow()">Borrow</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BookBorrowService from "@/services/BookBorrowService";
import Functions from "@/tools/Functions";
import { ref, computed, onMounted } from "vue";

const canBorrow = ref(true);
const isBusy = ref(false);
const isBusyBorrow = ref(false);

const props = defineProps({
  book: Object,
});

// const CheckIfBorrowed = () => {
//   isBusyBorrow.value = true;

//   const reqBody = {
//     book_id: props.book.id,
//   };

//   BookBorrowService.Check(reqBody)
//     .then((res) => {
//       isBusyBorrow.value = false;
//       canBorrow.value = res.data.isBorrowed;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const Borrow = () => {
  isBusy.value = true;

  const reqBody = {
    book_id: props.book.id,
  };

  BookBorrowService.Add(reqBody)
    .then((res) => {
      isBusy.value = false;
      canBorrow.value = false;
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      Functions.Notification("error", "Borrow", err.response.data.message);
    });
};

// onMounted(() => {
//   CheckIfBorrowed();
// });
</script>

<style lang="scss" scoped>
.book-card {
  width: 190px;
  padding: 10px;
  height: auto;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .content {
    display: flex;
    justify-content: start;
    flex-direction: column;
    width: 100%;
  }

  .avaible {
    color: rgb(135, 211, 20);
    font-size: 14px;
  }

  .unavaible {
    color: red;
    font-size: 14px;
  }

  img {
    width: 100px;
    height: 150px;
    margin-bottom: 10px;
  }

  h5 {
    font-size: 17px;
    font-weight: bold;
  }

  p {
    font-size: 14px;
  }

  .btn-borrow {
    width: 100%;
    margin-top: 20px;
    height: 40px;
    background: #000;
    color: white;
  }
}
</style>
