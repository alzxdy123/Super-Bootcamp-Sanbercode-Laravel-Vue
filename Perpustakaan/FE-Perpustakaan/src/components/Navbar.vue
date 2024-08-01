<template>
  <BNavbar toggleable="lg" class="navbar px-5">
    <BNavbarBrand href="#" class="pe-5">Perpustakaan</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavForm class="d-flex">
        <BFormInput class="me-2" placeholder="Search" />
      </BNavForm>

      <BNavbarNav class="ms-auto mb-2 mb-lg-0 gap-3">
        <BNavItem
          :class="$route.path == '/home' ? 'active' : ''"
          @click="Functions.ToPage('/home')"
          >Home</BNavItem
        >
        <BNavItem
          :class="$route.path == '/book' ? 'active' : ''"
          @click="Functions.ToPage('/book')"
          >Book</BNavItem
        >
        <BNavItem
          :class="$route.path == '/category' ? 'active' : ''"
          @click="Functions.ToPage('/category')"
          >Category</BNavItem
        >

        <BNavItemDropdown text="Language" right>
          <BDropdownItem href="#">Indonesia</BDropdownItem>
          <BDropdownItem href="#">English</BDropdownItem>
        </BNavItemDropdown>

        <BNavItemDropdown right>
          <template #button-content>
            <em>User</em>
          </template>
          <BDropdownItem href="#">Profile</BDropdownItem>
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
import Functions from "@/tools/Functions";
import { ref } from "vue";

const isBusy = ref(false);

const HandleLogout = () => {
  isBusy.value = true;

  Functions.Notification("warn", "Logout", "Loging out...");

  AuthService.Logout()
    .then(() => {
      isBusy.value = false;

      localStorage.clear();
      Functions.Notification("success", "Logout", "Logout Success");
      Functions.ToPage("/login");
    })
    .catch((err) => {
      console.log(err);
      Functions.Notification("error", "Logout", err.response.data.message);
    });
};
</script>

<style lang="scss" scoped>
.active {
  border-bottom: 1px solid black;
}
</style>
