<template>
  <div class="relative min-h-screen bg-gray-50 py-12 px-6">
    <button
      @click="goBack"
      class="absolute top-6 left-6 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md"
    >
      &larr; Back
    </button>

    <div class="max-w-6xl mx-auto pt-20">
      <h2 class="text-2xl font-bold mb-4">Effects of Sun Exposure - {{ title }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-red-50 p-6 rounded shadow">
          <h3 class="text-xl font-semibold mb-2">Risks</h3>
          <ul class="list-disc list-inside">
            <li v-for="(risk, idx) in content.risks" :key="idx" class="mt-1">
              {{ risk }}
            </li>
          </ul>
        </div>

        <div class="bg-green-50 p-6 rounded shadow">
          <h3 class="text-xl font-semibold mb-2">Benefits</h3>
          <ul class="list-disc list-inside">
            <li v-for="(benefit, idx) in content.benefits" :key="idx" class="mt-1">
              {{ benefit }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const communityData = {
  'outdoor-workers': {
    title: 'Outdoor Workers',
    risks: [
      'Prolonged sun exposure increases the risk of skin cancer and dehydration.',
      'Heat stress and UV exposure can lead to premature aging.',
    ],
    benefits: [
      'Sunlight exposure aids Vitamin D production, crucial for bone health.',
      'Being outdoors encourages physical activity and improved mood.',
    ],
  },
  'darker-skin': {
    title: 'People with Darker Skin Tones',
    risks: [
      'While melanin provides some UV protection, long-term exposure still poses risks.',
      'Lower Vitamin D synthesis may occur due to melanin blocking UV absorption.',
    ],
    benefits: [
      'Lower risk of sunburn compared to lighter skin tones.',
      'Sun exposure still aids in overall well-being and mood regulation.',
    ],
  },
  elderly: {
    title: 'Elderly & Immunocompromised',
    risks: [
      'Thinner skin makes elderly individuals more prone to UV damage.',
      'Weakened immune systems can result in increased skin cancer risk.',
    ],
    benefits: [
      'Moderate sun exposure helps with bone density and Vitamin D absorption.',
      'Can boost mental health and alleviate seasonal depression.',
    ],
  },
  athletes: {
    title: 'Athletes & Outdoor Enthusiasts',
    risks: [
      'Long periods of sun exposure increase the risk of sunburn and dehydration.',
      'Sweating combined with UV exposure can lead to skin damage over time.',
    ],
    benefits: [
      'Regular outdoor activity improves physical fitness and well-being.',
      'Sunlight exposure enhances Vitamin D production and energy levels.',
    ],
  },
}

const route = useRoute()
const router = useRouter()

const communityGroup = route.params.communityGroup || 'outdoor-workers'

const content = computed(() => {
  return communityData[communityGroup] || communityData['outdoor-workers']
})

const title = computed(() => content.value.title)

function goBack() {
  router.push({ name: 'EffectsOfSunExposure' })
}
</script>

<style scoped></style>
