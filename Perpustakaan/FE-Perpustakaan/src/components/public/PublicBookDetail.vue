<template>
  <div>
    <div class="text-center" v-if="isBusy">
      <BSpinner />
    </div>
    <div v-else-if="book" class="book-details mt-5">
      <div class="book-cover">
        <img :src="book.cover" alt="Book Cover" />
      </div>
      <div class="book-info">
        <h1>{{ book.title }}</h1>
        <p class="author">{{ book.author }}</p>
        <p v-if="book.category" class="categorys">
          Kategori: {{ book.category.name }}
        </p>
        <p
          class="status"
          :class="book.status === 'A' ? 'available' : 'unavailable'"
        >
          {{ book.status === "A" ? "Tersedia" : "Tidak Tersedia" }}
        </p>
        <p class="summary">{{ book.summary }}</p>
        <div class="btn-container">
          <button
            class="btn-borrow"
            @click="Borrow()"
            :disabled="!canBorrow || book.status === 'N'"
          >
            <BSpinner v-if="isBusyBorrow" small></BSpinner>
            <span v-else>Pinjam</span>
          </button>
          <button
            class="btn-back"
            @click="back()"
            :disabled="!canBorrow || book.status === 'N'"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BookService from "@/services/BookService";
import BookBorrowService from "@/services/BookBorrowService";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Functions from "@/tools/Functions";

const route = useRoute();
const isBusy = ref(false);
const id = route.params.id;
const book = ref({});
const canBorrow = ref(true);

const getBook = () => {
  isBusy.value = true;

  BookService.GetDetail(id)
    .then((res) => {
      book.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isBusy.value = false;
    });
};

const isBusyBorrow = ref(false);

const checkBorrow = () => {
  const reqBody = {
    book_id: id,
    username: user.username,
  };

  isBusyBorrow.value = true;
  BookBorrowService.Check(reqBody)
    .then((res) => {
      isBusyBorrow.value = false;
      canBorrow.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const Borrow = () => {
  isBusy.value = true;

  const reqBody = {
    book_id: book.value.id,
  };

  BookBorrowService.Add(reqBody)
    .then((res) => {
      isBusy.value = false;
      canBorrow.value = false;
      console.log(res);
    })
    .catch((err) => {
      isBusy.value = false;
      console.log(err);
      Functions.Notification("error", "Borrow", err.response.data.message);
    });
};

const router = useRouter();

const back = () => {
  router.go(-1);
};

onMounted(() => {
  getBook();
  checkBorrow();
});
</script>

<style lang="scss" scoped>
.book-details {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  margin: 0 auto;

  .book-cover {
    flex-shrink: 0;
    margin-right: 20px;

    img {
      width: 200px;
      height: auto;
      border-radius: 5px;
    }
  }

  .book-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;

    h1 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .author,
    .categorys,
    .status {
      font-size: 16px;
      margin-bottom: 10px;
      color: #666;
    }

    .status.available {
      color: green;
    }

    .status.unavailable {
      color: red;
    }

    .summary {
      font-size: 14px;
      color: #555;
      margin-bottom: 20px;
    }

    .btn-container {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      .btn-borrow {
        padding: 10px 20px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      }

      .btn-back {
        padding: 10px 20px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
}
</style>
