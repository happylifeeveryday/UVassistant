<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <!-- <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav> -->
  <!-- <RouterView /> -->
  <div class="app-container">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>

    <Footer />
  </div>



</template>

<style scoped></style>
