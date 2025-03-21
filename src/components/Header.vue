<template>
  <header class="bg-white shadow-sm">
    <!-- Main container -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Left: Logo / Title -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="flex items-center no-active-class">
            <i class="fa-solid fa-sun text-yellow-400 text-2xl"></i>
            <span class="ml-2 text-lg font-semibold">UV Protection Assistant</span>
          </router-link>
        </div>

        <!-- Center: Search bar (hidden on small screens) -->
        <div class="hidden md:flex flex-1 max-w-2xl mx-4 items-center">
          <div class="relative w-full">
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

        <!-- Right: Language, location, user info (hidden on small screens) -->
        <div class="hidden md:flex items-center space-x-6">
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

        <!-- Mobile menu button (visible on small screens only) -->
        <div class="flex items-center md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
            @click="isOpen = !isOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation row (visible on large screens, hidden on small) -->
    <nav class="hidden md:flex justify-center space-x-8 py-4 max-w-7xl mx-auto px-4">
      <router-link to="/" class="text-gray-600 font-medium">Home</router-link>
      <router-link to="/ViewUVIndex" class="text-gray-600 font-medium">UV Index</router-link>
      <router-link to="/Reminder" class="text-gray-600 hover:text-gray-900"
        >Screen Reminder</router-link
      >
      <router-link to="/PersonalMeasure" class="text-gray-600 font-medium"
        >Personal Recommendation</router-link
      >
      <router-link to="/ImpactView" class="text-gray-600 hover:text-gray-900"
        >Data Insights</router-link
      >
      <router-link to="/EffectsOfSunExposure" class="text-gray-600 hover:text-gray-900"
        >Effects Of Sun Exposure</router-link
      >
    </nav>

    <!-- Mobile menu (visible when isOpen === true) -->
    <div class="md:hidden" v-if="isOpen">
      <!-- Search bar on mobile -->
      <div class="px-4 py-2">
        <div class="relative w-full">
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

      <!-- Navigation links on mobile -->
      <nav class="flex flex-col space-y-2 py-2 border-t border-gray-200 px-4">
        <router-link to="/" class="block text-gray-600 font-medium" @click="isOpen = false">
          Home
        </router-link>
        <router-link
          to="/ViewUVIndex"
          class="block text-gray-600 font-medium"
          @click="isOpen = false"
        >
          UV Index
        </router-link>
        <router-link
          to="/Reminder"
          class="block text-gray-600 hover:text-gray-900"
          @click="isOpen = false"
        >
          Screen Reminder
        </router-link>
        <router-link
          to="/PersonalMeasure"
          class="block text-gray-600 font-medium"
          @click="isOpen = false"
        >
          Personal Recommendation
        </router-link>
        <router-link
          to="/ImpactView"
          class="block text-gray-600 hover:text-gray-900"
          @click="isOpen = false"
        >
          Data Insights
        </router-link>
        <router-link
          to="/EffectsOfSunExposure"
          class="block text-gray-600 hover:text-gray-900"
          @click="isOpen = false"
        >
          Effects Of Sun Exposure
        </router-link>
      </nav>

      <!-- Language, location, user info on mobile -->
      <div class="flex flex-col space-y-2 p-4 border-t border-gray-200">
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
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>

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
