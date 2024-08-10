<template>
  <div class="hero">
    <BContainer>
      <BRow>
        <BCol
          lg="6"
          sm="12"
          class="d-flex align-items-center justify-content-end"
        >
          <div class="content">
            <h1>Perpustakaan</h1>
            <p>
              Aplikasi Perpustakaan Online. dengan peminjaman buku dan
              pengembalian tanpa ribet
            </p>
            <button @click="Functions.ToPage('/book')">List Buku</button>
          </div>
        </BCol>
        <BCol lg="6" sm="12" class="d-none d-lg-block">
          <img :src="bgHero" alt="" />
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script setup>
import bgHero from "@/assets/images/bg-hero.png";
import Functions from "@/tools/Functions";
</script>

<style lang="scss">
@import "@/assets/scss/home.scss";
</style>
