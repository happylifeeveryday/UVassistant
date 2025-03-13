<template>
  <div class="bg-gray-50 py-12 px-6">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

      <div class="bg-blue-100 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">Children and Adolescents</h3>
          <p class="text-gray-700 mt-2">
            ...
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/children-icon.png" alt="Children Icon" class="w-20 h-20">
          <button
            @click="goToDetails('children')"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Read More
          </button>
        </div>
      </div>

      <div class="bg-indigo-100 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">Middle Aged Adults</h3>
          <p class="text-gray-700 mt-2">
            ...
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/middle-age-icon.png" alt="Middle Age Icon" class="w-20 h-20">
          <button
            @click="goToDetails('middle')"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Read More
          </button>
        </div>
      </div>

      <div class="bg-green-100 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">Adults</h3>
          <p class="text-gray-700 mt-2">
            ...
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/adults-icon.png" alt="Adults Icon" class="w-20 h-20">
          <button
            @click="goToDetails('adults')"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Read More
          </button>
        </div>
      </div>

      <div class="bg-gray-200 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">Aged Individuals</h3>
          <p class="text-gray-700 mt-2">
            ...
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/aged-icon.png" alt="Aged Icon" class="w-20 h-20">
          <button
            @click="goToDetails('aged')"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Read More
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToDetails(ageGroup) {
  router.push({
    name: 'AgeCategoryDetails',
    params: { ageGroup }
  })
}
</script>
