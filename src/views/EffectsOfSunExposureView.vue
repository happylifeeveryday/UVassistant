<template>
  <div class="bg-gray-50 py-12 px-6">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="bg-yellow-100 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">Outdoor Workers</h3>
          <p class="text-gray-700 mt-2">
            Outdoor workers, such as construction workers and farmers, face prolonged sun exposure, 
            increasing the risk of skin damage and heat-related illnesses. Protective clothing, hats, 
            and sunscreen are essential during peak hours.
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/outdoor-workers-icon.png" alt="Outdoor Workers Icon" class="w-20 h-20" />
          <button
            @click="goToDetails('outdoor-workers')"
            class="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md"
          >
            Read More
          </button>
        </div>
      </div>

      <div class="bg-indigo-100 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">People with Darker Skin Tones</h3>
          <p class="text-gray-700 mt-2">
            While melanin provides some natural sun protection, individuals with darker skin tones 
            still need sun exposure for vitamin D synthesis and should apply sunscreen to prevent 
            long-term damage.
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/darker-skin-icon.png" alt="Darker Skin Icon" class="w-20 h-20" />
          <button
            @click="goToDetails('darker-skin')"
            class="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md"
          >
            Read More
          </button>
        </div>
      </div>

      <div class="bg-green-100 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">Elderly & Immunocompromised</h3>
          <p class="text-gray-700 mt-2">
            Older adults and those with weakened immune systems require careful sun exposure for 
            vitamin D production while avoiding excessive exposure that could lead to skin damage. 
            Supplements may be beneficial in some cases.
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/elderly-icon.png" alt="Elderly Icon" class="w-20 h-20" />
          <button
            @click="goToDetails('elderly')"
            class="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md"
          >
            Read More
          </button>
        </div>
      </div>

      <div class="bg-gray-200 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold">Athletes & Outdoor Enthusiasts</h3>
          <p class="text-gray-700 mt-2">
            People who exercise outdoors should balance sun exposure with hydration and sun 
            protection to prevent heatstroke and UV-related damage while maintaining optimal vitamin D levels.
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <img src="/athletes-icon.png" alt="Athletes Icon" class="w-20 h-20" />
          <button
            @click="goToDetails('athletes')"
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
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()


function goToDetails(communityGroup) {
  router.push({ name: 'CommunityCategoryDetails', params: { communityGroup } })
}

const communityData = {
  'outdoor-workers': {
    title: 'Outdoor Workers',
    description: 'Outdoor workers face prolonged sun exposure, increasing the risk of skin damage and heat-related illnesses.',
  },
  'darker-skin': {
    title: 'People with Darker Skin Tones',
    description: 'Melanin provides some protection, but sunscreen is still necessary for long-term skin health.',
  },
  elderly: {
    title: 'Elderly & Immunocompromised',
    description: 'Older adults need controlled sun exposure for vitamin D while avoiding excessive UV damage.',
  },
  athletes: {
    title: 'Athletes & Outdoor Enthusiasts',
    description: 'Athletes should balance sun exposure with hydration and sun protection for optimal performance.',
  },
}

const route = useRoute()
const communityGroup = computed(() => route.params.communityGroup || 'outdoor-workers')
const communityContent = computed(() => communityData[communityGroup.value] || communityData['outdoor-workers'])
</script>
