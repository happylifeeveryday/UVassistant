<template>
    <div class="max-w-6xl mx-auto py-12 px-6">
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
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  
  const ageData = {
    children: {
      title: 'Children & Adolescents',
      risks: [
        ' This part may consider using copilot',
        '1. Prolonged UV exposure can cause sunburn more easily',
        '2. Higher sensitivity to UV leading to potential skin damage in later life'
      ],
      benefits: [
        '1. Helps in Vitamin D synthesis which is essential for bone growth',
        '2. Promotes healthy outdoor activity and exercise'
      ]
    },
    middle: {
      title: 'Middle Aged Adults',
      risks: [
        'Increased risk of age spots, wrinkles, and other signs of aging',
        'Higher chance of skin cancer if no proper protection is used'
      ],
      benefits: [
        'Moderate sunlight can improve mood and help in Vitamin D production',
        'Encourages outdoor physical activities which help maintain fitness'
      ]
    },
    adults: {
      title: 'Adults',
      risks: [
        'Sunburn, premature aging, and heightened risk of skin cancer',
        'UV exposure can aggravate certain skin conditions'
      ],
      benefits: [
        'Sunlight can help regulate circadian rhythms, improving sleep',
        'Adequate Vitamin D levels support immune function'
      ]
    },
    aged: {
      title: 'Aged Individuals',
      risks: [
        'Skin is thinner and less protective, more prone to damage',
        'UV exposure can exacerbate existing health issues'
      ],
      benefits: [
        'Sunlight in moderation helps maintain bone health',
        'Mild sun exposure can improve mood and general well-being'
      ]
    }
  }
  
  const route = useRoute()
  const ageGroup = route.params.ageGroup || 'adults'
  
  const content = computed(() => {
    return ageData[ageGroup] || ageData.adults
  })
  
  const title = computed(() => content.value.title)
  </script>
