<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <main class="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
              <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full">
                Get Current Location Weather & UV
              </button>
  
              <div class="border p-4 rounded-lg">
                <h5 class="text-lg font-medium">Your Coordinates</h5>
                <p>Coordinates not available</p>
              </div>
  
              <div class="border p-4 rounded-lg">
                <h5 class="text-lg font-medium">Weather & UV Info</h5>
                <p>No weather data yet</p>
              </div>
            </div>
  
            <div class="space-y-6">
              <h2 class="text-2xl font-bold text-orange-400">UV Index Scale</h2>
              <div class="grid grid-cols-11 gap-1">
                <template v-for="n in 11" :key="n">
                  <div class="p-2 text-center font-bold transition-all">
                    {{ n === 11 ? '11+' : n }}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .bg-gray-50 {
    background: linear-gradient(135deg, #f2f5f7 0%, #d6dee2 100%);
  }
  </style>