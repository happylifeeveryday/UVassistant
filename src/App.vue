<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-container">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<style>
button:hover {
  cursor: pointer;
}
</style>
