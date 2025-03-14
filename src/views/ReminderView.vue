<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-xl w-full bg-white rounded-lg shadow-md p-8 relative">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Sunscreen Reminder</h2>

      <div class="grid grid-cols-1 gap-6">
        <div>
          <label class="block text-gray-700 font-medium">Last Applied At:</label>
          <div class="relative">
            <select
              v-model="lastApplied"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
            </select>
            <i class="fas fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div>
          <label class="block text-gray-700 font-medium">SPF Used:</label>
          <div class="relative">
            <select
              v-model="spfValue"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option v-for="spf in spfOptions" :key="spf" :value="spf">{{ spf }}</option>
            </select>
            <i class="fas fa-sun absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div>
          <label class="block text-gray-700 font-medium">Select Your Skin Tone:</label>
          <div class="relative">
            <select
              v-model="skinTone"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option v-for="tone in skinTones" :key="tone" :value="tone">{{ tone }}</option>
            </select>
            <i
              class="fas fa-user-circle absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            ></i>
          </div>
        </div>

        <div>
          <label class="block text-gray-700 font-medium">Select Reminder Time:</label>
          <div class="relative">
            <input
              type="text"
              :value="selectedTime"
              placeholder="Select time"
              readonly
              class="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer"
            />

            <input
              type="time"
              v-model="selectedTime"
              class="absolute inset-0 opacity-0 cursor-pointer"
            />

            <i
              class="fas fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            ></i>
          </div>
        </div>

        <div class="text-center mt-4">
          <p class="text-gray-600 text-sm">Next Application Time:</p>
          <p class="text-4xl font-semibold text-blue-600">{{ nextApplicationTime }}</p>
        </div>

        <button
          @click="setReminder"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <i class="fas fa-bell"></i>
          Set a Reminder
        </button>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Reminder Set!</h3>
        <p class="text-gray-600">
          You will be reminded to reapply sunscreen at
          <span class="font-semibold text-blue-600">{{ nextApplicationTime }}</span
          >.
        </p>
        <button
          @click="closeModal"
          class="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const lastApplied = ref('12:00 PM')
const spfValue = ref('30')
const skinTone = ref('Natural Beige')
const nextApplicationTime = ref('2:35 PM')
const showModal = ref(false)

const timeOptions = Array.from({ length: 12 }, (_, i) => {
  let now = new Date()
  now.setHours(now.getHours() + i + 1, 0, 0, 0)
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
})

const spfOptions = ['15', '30', '50', '70', '100']

const skinTones = ['Fair', 'Light', 'Natural Beige', 'Medium', 'Olive', 'Deep']

const selectedTime = ref('12:00')

watch(selectedTime, (newTime) => {
  nextApplicationTime.value = newTime
})

const setReminder = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
