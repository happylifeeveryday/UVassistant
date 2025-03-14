<template>
  <div class="w-full">
    <div class="relative w-full">
      <img
        src="/src/assets/home-img.jpg"
        alt="Sunflower field with UV Protection"
        class="w-full h-auto"
      />
      <div class="absolute inset-0 flex items-center justify-center" style="padding-top: 25%">
        <button
          @click="goToUVIndex"
          class="bg-transparent border border-gray-500 text-white hover:bg-gray-200 hover:text-gray-700 text-4xl font-bold py-2 px-6 rounded-full shadow-md"
        >
          UV PROTECTION
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goToUVIndex() {
  router.push({ name: 'ViewUVIndex' })
}
</script>

<style></style>
