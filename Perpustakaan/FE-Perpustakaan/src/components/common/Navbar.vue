<template>
  <BNavbar toggleable="lg" class="navbar px-5">
    <BNavbarBrand href="#" class="pe-5">Perpustakaan</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav v-if="props.for == 'owner'">
      <BNavbarNav class="ms-auto mb-2 mb-lg-0 gap-3">
        <BNavItem
          :class="$route.path == '/dashboard/book' ? 'active' : ''"
          @click="Functions.ToPage('/dashboard/book')"
          >Buku</BNavItem
        >
        <BNavItem
          :class="$route.path == '/dashboard/borrow' ? 'active' : ''"
          @click="Functions.ToPage('/dashboard/borrow')"
          >Pinjaman</BNavItem
        >
        <BNavItem
          :class="$route.path == '/dashboard/category' ? 'active' : ''"
          @click="Functions.ToPage('/dashboard/category')"
          >Kategori</BNavItem
        >
        <BNavItem
          :class="$route.path == '/dashboard/role' ? 'active' : ''"
          @click="Functions.ToPage('/dashboard/role')"
          >Role</BNavItem
        >
        <!-- <BNavItemDropdown text="Language" right>
          <BDropdownItem href="#">Indonesia</BDropdownItem>
          <BDropdownItem href="#">English</BDropdownItem>
        </BNavItemDropdown> -->
        <BNavItemDropdown right>
          <template #button-content>
            <em>{{ user.username }}</em>
          </template>
          <!-- <BDropdownItem href="#">Profile</BDropdownItem> -->
          <BDropdownItem @click="Functions.ToPage('/home')"
            >Beranda</BDropdownItem
          >
          <BDropdownItem @click="HandleLogout()">
            <BSpinner small v-if="isBusy" />
            <i v-else class="jam jam-power text-danger"></i>
            Log Out</BDropdownItem
          >
        </BNavItemDropdown>
      </BNavbarNav>
    </BCollapse>
    <BCollapse id="nav-collapse" is-nav v-else>
      <BNavForm class="d-flex">
        <BFormInput class="me-2" placeholder="Search" v-model="inputSearch" />
      </BNavForm>
      <BNavbarNav class="ms-auto mb-2 mb-lg-0 gap-3">
        <BNavItem
          :class="$route.path == '/home' ? 'active' : ''"
          @click="Functions.ToPage('/home')"
        >
          Beranda</BNavItem
        >
        <BNavItem
          :class="$route.path == '/book' ? 'active' : ''"
          @click="Functions.ToPage('/book')"
          >Buku</BNavItem
        >
        <BNavItem
          :class="$route.path == '/category' ? 'active' : ''"
          @click="Functions.ToPage('/category')"
          >Kategori</BNavItem
        >

        <!-- <BNavItemDropdown text="Language" right>
          <BDropdownItem href="#">Indonesia</BDropdownItem>
          <BDropdownItem href="#">English</BDropdownItem>
        </BNavItemDropdown> -->
        <BNavItemDropdown right>
          <template #button-content>
            <em>{{ user.username }}</em>
          </template>
          <!-- <BDropdownItem href="#">Profile</BDropdownItem> -->
          <BDropdownItem
            @click="Functions.ToPage('/dashboard')"
            v-if="user.role == 'owner'"
            >Dashboard</BDropdownItem
          >
          <BDropdownItem @click="HandleLogout()">
            <BSpinner small v-if="isBusy" />
            <i v-else class="jam jam-power text-danger"></i>
            Log Out</BDropdownItem
          >
        </BNavItemDropdown>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<script setup>
import AuthService from "@/services/AuthService";
import BookService from "@/services/BookService";
import Functions from "@/tools/Functions";
import { reactive, watch } from "vue";
import { onMounted, ref } from "vue";

const props = defineProps({
  for: {
    type: String,
    default: "user",
  },
});
const isBusy = ref(false);
const HandleLogout = () => {
  isBusy.value = true;
  // Functions.Notification("warn", "Logout", "Loging out...");
  localStorage.clear();
  Functions.ToPage("/login");
  // AuthService.Logout()
  //   .then(() => {
  //     isBusy.value = false;
  //     localStorage.clear();
  //     Functions.Notification("success", "Logout", "Logout Success");
  //     Functions.ToPage("/login");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     Functions.Notification("error", "Logout", err.response.data.message);
  //   });
};

const inputSearch = ref("");
const book = reactive({});

const handleSearch = () => {
  const params = {
    title: inputSearch.value,
  };

  BookService.GetAll(params)
    .then((res) => {
      let data = res.data.data;
      book.value = data[0];

      BookService.GetDetail(book.value.id)
        .then((res) => {
          // console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

watch(
  () => inputSearch.value,
  (newVal) => {
    handleSearch();
  },
  {
    deep: true,
  }
);

const user = ref({});

onMounted(() => {
  const userData = Functions.ReadSessionCustom("user");
  user.value = userData;
  // handleSearch();
});
</script>

<style lang="scss" scoped>
.active {
  border-bottom: 1px solid black;
}
</style>
