<template>
  <!-- Full-screen container for video and overlay -->
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Video background -->
    <video
      src="/src/assets/home-video.mp4"
      autoplay
      loop
      muted
      playsinline
      class="absolute top-0 left-0 w-full h-full object-cover z-0"
    >
      Your browser does not support HTML5 video
    </video>

    <div class="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
      <!-- Title and subtitle on video layer -->
      <div class="text-center mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold mb-4">
          Every tool you could want to manage your UV exposure
        </h1>
        <p>
          Stay informed about the UV Index, set reminders, and learn about skin protection and
          statistics.
        </p>
      </div>

      <!-- Downward arrow button -->
      <button @click="scrollToContent" class="flex flex-col items-center focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-8 h-8 animate-bounce"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Main content container (scroll target) -->
  <div id="main-content" class="max-w-6xl mx-auto px-4 py-8">
    <!-- Cards grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <!-- Card 1: View UVI and Temperature Projections -->
      <router-link
        to="/ViewUVIndex"
        class="bg-white shadow p-5 rounded-lg transition hover:shadow-md block"
      >
        <div class="flex items-center mb-3 space-x-2">
          <img src="/src/assets/1.jpg" alt="UV Index Icon" class="w-6 h-6 object-contain" />
          <h3 class="text-lg font-semibold">View UV Index</h3>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">
          Check real-time UV Index and forecast temperatures & UVI for better planning.
        </p>
      </router-link>

      <!-- Card 2: Set Reminder -->
      <router-link
        to="/Reminder"
        class="bg-white shadow p-5 rounded-lg transition hover:shadow-md block"
      >
        <div class="flex items-center mb-3 space-x-2">
          <img src="/src/assets/2.jpg" alt="Reminder Icon" class="w-6 h-6 object-contain" />
          <h3 class="text-lg font-semibold">Set a Reminder</h3>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">
          Configure personalized reminders based on upcoming UV forecasts to protect yourself.
        </p>
      </router-link>

      <!-- Card 3: Sunscreen Recommendations -->
      <router-link
        to="/PersonalMeasure"
        class="bg-white shadow p-5 rounded-lg transition hover:shadow-md block"
      >
        <div class="flex items-center mb-3 space-x-2">
          <img src="/src/assets/3.jpg" alt="Protection Icon" class="w-6 h-6 object-contain" />
          <h3 class="text-lg font-semibold">Custom Sunscreen</h3>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">
          Get recommendations for sunscreen, clothing, and other measures based on your info.
        </p>
      </router-link>

      <!-- Card 4: Skin cancer statistics -->
      <router-link
        to="/ImpactView"
        class="bg-white shadow p-5 rounded-lg transition hover:shadow-md block"
      >
        <div class="flex items-center mb-3 space-x-2">
          <img src="/src/assets/4.jpg" alt="Statistics Icon" class="w-6 h-6 object-contain" />
          <h3 class="text-lg font-semibold">Skin Cancer Stats</h3>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">
          Browse recent statistics on skin cancer rates and trends in your area.
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
function scrollToContent() {
  // Smoothly scroll to the element with the ID 'main-content'
  const element = document.getElementById('main-content')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped></style>
