<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center no-active-class">
            <i class="fa-solid fa-sun text-yellow-400 text-2xl"></i>
            <span class="ml-2 text-lg font-semibold">UV Protection Assistant</span>
          </router-link>
        </div>

        <div class="flex-1 max-w-2xl mx-8">
          <div class="relative">
            <input
              type="text"
              placeholder="Search"
              class="w-full pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <i
              class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            ></i>
          </div>
        </div>

        <div class="flex items-center space-x-6">
          <div class="flex items-center">
            <i class="fa-solid fa-globe mr-2"></i>
            <span>Language - English</span>
          </div>
          <div class="flex items-center">
            <i class="fa-solid fa-map-marker-alt mr-2"></i>
            <span>Australia</span>
          </div>
          <i class="fa-solid fa-user-circle text-2xl text-gray-600"></i>
        </div>
      </div>

      <nav class="flex space-x-8 py-4">
        <router-link to="/" class="text-gray-600 font-medium">Home</router-link>
        <router-link to="/ViewUVIndex" class="text-gray-600 font-medium">UV Index</router-link>
        <router-link to="/Reminder" class="text-gray-600 hover:text-gray-900">Screen Reminder</router-link>
        <router-link to="/PersonalMeasure" class="text-gray-600 font-medium">Personal Recommendation</router-link>

        <router-link to="/ImpactView" class="text-gray-600 hover:text-gray-900">Data Insights</router-link>
        <router-link to="/EffectsOfSunExposure" class="text-gray-600 hover:text-gray-900">Effects Of Sun Exposure</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}

.no-active-class.router-link-active {
  color: inherit;
}

.router-link-active {
  color: #2563eb;
  font-weight: 600;
}
</style>