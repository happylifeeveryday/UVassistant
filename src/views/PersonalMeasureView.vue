<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <main class="max-w-7xl mx-auto px-4 py-8 flex-grow">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-4">Personalized UV Protection Recommendation</h2>
        <div class="space-y-4">
          <div>
            <input
              v-model.number="form.age"
              type="number"
              id="age"
              min="0"
              max="120"
              placeholder="Enter your age"
              class="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <select
              v-model="form.skinType"
              id="skin-type"
              class="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            >
              <option value="">Select your skin type</option>
              <option v-for="type in skinTypes" :key="type.type" :value="type.type">
                Type {{ type.type }} ({{ type.description }})
              </option>
            </select>
          </div>

          <div>
            <input
              v-model.number="form.exposureTime"
              type="number"
              id="exposure-time"
              min="0"
              max="240"
              placeholder="Enter minutes (optional)"
              class="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          <div class="flex space-x-4">
            <button
              @click="generateRecommendation"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Get Recommendation
            </button>
          </div>
        </div>

        <div v-if="recommendation" class="mt-8">
          <h3 class="text-xl font-semibold mb-2">Your Personalized Recommendation</h3>
          <div class="border p-4 rounded-lg">
            <p><strong>UV Exposure Guidance:</strong> {{ recommendation.uvGuidance }}</p>
          </div>

          <div class="mt-4">
            <p><strong>Skincare Recommendations:</strong></p>
            <ul class="list-disc pl-5">
              <li v-for="(value, key) in recommendation.skincare" :key="key" class="text-sm">
                {{ key.charAt(0).toUpperCase() + key.slice(1) }}: {{ value }}
              </li>
            </ul>
          </div>

          <div v-if="recommendation.protectionItems.length > 0" class="mt-4">
            <p><strong>Suggested Protection Items:</strong></p>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="item in recommendation.protectionItems"
                :key="item"
                class="flex flex-col items-center"
              >
                <img
                  :src="`/data/${item}`"
                  :alt="item.replace('.png', '').replace('_', ' ') + ' for UV protection'"
                  class="h-20 w-20 object-contain"
                  @error="handleImageError($event, item)"
                />
                <span class="text-sm mt-1 capitalize">
                  {{ item.replace('.png', '').replace('_', ' ') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const skinTypes = ref([])
const form = ref({
  age: null,
  skinType: '',
  exposureTime: null,
})
const recommendation = ref(null)

onMounted(() => {
  fetch('/data/fitzpatrickSkinTypes.json')
    .then((response) => response.json())
    .then((data) => {
      skinTypes.value = data.fitzpatrick_skin_types
    })
    .catch((error) => console.error('Error loading skin types data:', error))
})

const generateRecommendation = () => {
  if (!form.value.age || !form.value.skinType) {
    alert('Please fill in your age and skin type.')
    return
  }

  const skinData = skinTypes.value.find((type) => type.type === form.value.skinType)
  if (!skinData) {
    alert('Skin type data not found.')
    return
  }

  let ageGroup
  if (form.value.age < 18) {
    ageGroup = 'children_adolescents'
  } else if (form.value.age >= 18 && form.value.age <= 35) {
    ageGroup = 'adults'
  } else if (form.value.age >= 36 && form.value.age <= 49) {
    ageGroup = 'middle_aged'
  } else {
    ageGroup = 'aged'
  }

  let uvGuidance = skinData.uv_exposure_guidance[ageGroup]
  if (form.value.exposureTime > 0) {
    if (form.value.skinType === 'I' || form.value.skinType === 'II') {
      uvGuidance += ` For ${form.value.exposureTime} minutes of exposure, ensure strict protection as your skin is highly sensitive.`
    } else if (form.value.skinType === 'III' || form.value.skinType === 'IV') {
      uvGuidance += ` For ${form.value.exposureTime} minutes of exposure, moderate protection is sufficient, but monitor for discomfort.`
    } else {
      uvGuidance += ` For ${form.value.exposureTime} minutes of exposure, your skin can handle it well, but maintain basic protection.`
    }
  }

  let protectionItems = [...skinData.suggested_protection_items]
  if (form.value.exposureTime > 0) {
    if (
      form.value.exposureTime >= 30 &&
      (form.value.skinType === 'I' || form.value.skinType === 'II')
    ) {
      if (!protectionItems.includes('umbrella.png')) {
        protectionItems.push('umbrella.png')
      }
    }
    if (form.value.exposureTime >= 15 && form.value.skinType !== 'VI') {
      if (!protectionItems.includes('hat.png')) {
        protectionItems.push('hat.png')
      }
    }
    if (
      form.value.exposureTime >= 15 &&
      (form.value.skinType === 'I' || form.value.skinType === 'II')
    ) {
      if (!protectionItems.includes('long_sleeve_clothing.png')) {
        protectionItems.push('long_sleeve_clothing.png')
      }
    }
  }
  recommendation.value = {
    uvGuidance,
    skincare: skinData.skincare_recommendations,
    protectionItems,
  }
}
const handleImageError = (event, item) => {
  console.error(`Failed to load image: /data/${item}`)
  event.target.src = '/data/placeholder.png' // Fallback image (place a placeholder.png in /public/data)
  event.target.alt = `Image not found: ${item.replace('.png', '').replace('_', ' ')}`
}
</script>

<style scoped>
.bg-gray-50 {
  background: linear-gradient(135deg, #f2f5f7 0%, #d6dee2 100%);
}
</style>
