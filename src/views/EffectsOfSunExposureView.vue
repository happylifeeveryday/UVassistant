<template>
  <div class="bg-gray-50 py-12 px-6">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-blue-100 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">Children and Adolescents</h3>
          <p class="text-gray-700 mt-2">
            Children and adolescents need moderate sun exposure to support vitamin D synthesis, which is vital for bone growth and overall development. It’s important to avoid overexposure during peak hours and use protective measures like hats and sunscreen.
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/children-icon.png" alt="Children Icon" class="w-20 h-20">
          <button
            @click="goToDetails('children')"
            class="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md"
          >
            Read More
          </button>
        </div>
      </div>

      <div class="bg-indigo-100 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">Middle Aged Adults</h3>
          <p class="text-gray-700 mt-2">
            Middle aged adults should aim for balanced sun exposure to maintain healthy vitamin D levels, which can improve mood and support overall health. However, care should be taken to protect the skin from prolonged exposure that may lead to premature aging.
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/middle-age-icon.png" alt="Middle Age Icon" class="w-20 h-20">
          <button
            @click="goToDetails('middle')"
            class="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md"
          >
            Read More
          </button>
        </div>
      </div>

      <div class="bg-green-100 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">Adults</h3>
          <p class="text-gray-700 mt-2">
            Adults benefit from regular, moderate sun exposure which helps the body produce vitamin D, essential for immune function and bone health. It’s important to balance outdoor time with proper skin protection to prevent sunburn and long-term skin damage.
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/adults-icon.png" alt="Adults Icon" class="w-20 h-20">
          <button
            @click="goToDetails('adults')"
            class="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md"
          >
            Read More
          </button>
        </div>
      </div>

      <div class="bg-gray-200 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">Aged Individuals</h3>
          <p class="text-gray-700 mt-2">
            For aged individuals, gentle and brief periods of sun exposure are recommended to help maintain vitamin D levels without risking skin damage, as older skin can be more sensitive. In some cases, vitamin D supplements may also be advised.
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/aged-icon.png" alt="Aged Icon" class="w-20 h-20">
          <button
            @click="goToDetails('aged')"
            class="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md"
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