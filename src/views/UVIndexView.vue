<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <main class="max-w-7xl mx-auto px-4 py-8 flex-grow">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <input type="text" v-model="locationName" placeholder="Enter location name" class="w-full border border-gray-300 rounded-lg px-4 py-3" />
            <button @click="fetchWeatherByLocationName" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full">
              Get Weather & UV by Location Name
            </button>
            <button @click="getLocation" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full">
              Get Current Location Weather & UV
            </button>
            <div class="border p-4 rounded-lg">
              <h5 class="text-lg font-medium">Weather & UV Info</h5>
              <div v-if="weatherData">
                <p><strong>Temperature:</strong> {{ weatherData.temp }} °C</p>
                <p><strong>Weather:</strong> {{ weatherData.description }}</p>
              </div>
              <div v-else>
                <p>No weather data yet</p>
              </div>
            </div>
          </div>
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-orange-400">UV Index Scale</h2>
            <div class="relative w-full">
              <div class="flex justify-around items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffeb3b" class="w-6 h-6">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffc107" class="w-8 h-8">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff9800" class="w-10 h-10">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f44336" class="w-12 h-12">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9c27b0" class="w-14 h-14">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
                </svg>
              </div>
              <div class="bg-orange-400 text-white p-4 rounded-lg mb-4">
                <h3 class="text-xl font-bold">UV Index</h3>
                <p class="text-2xl font-bold">{{ uvIndex }}</p>
              </div>
              <div class="h-4 bg-gradient-to-r from-[#ffeb3b] via-[#ff9800] to-[#9c27b0] relative">
                <!-- UV Index Marker -->
                <div 
                  class="absolute top-0 h-6 w-4 bg-black text-white text-xs flex items-center justify-center rounded-md transform -translate-x-1/2" 
                  :style="{ left: uvIndexPosition }">
                  ▲
                </div>
              </div>
              <div class="grid grid-cols-11 w-full h-10 mt-2" style="background: linear-gradient(to right, #ffeb3b, #ff9800, #9c27b0);">
                <div v-for="n in 10" :key="n" class="flex items-center justify-center text-white font-bold">
                  {{ n }}
                </div>
                <div class="flex items-center justify-center text-white font-bold">11+</div>
              </div>
              <div class="grid grid-cols-5 gap-0 mt-1 w-full">
                <div class="text-center text-green-500">Low</div>
                <div class="text-center text-yellow-500">Moderate</div>
                <div class="text-center text-orange-500">High</div>
                <div class="text-center text-red-500">Very High</div>
                <div class="text-center text-purple-500">Extreme</div>
              </div>
              <div class="grid grid-cols-5 gap-0 mt-1 w-full">
                <div class="text-center text-xs">No protection needed</div>
                <div class="text-center text-xs">Some protection is required</div>
                <div class="text-center text-xs">Protection essential</div>
                <div class="text-center text-xs">Extra protection is needed</div>
                <div class="text-center text-xs">Stay inside</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="hourlyForecast.length" class="mt-8">
          <h5 class="text-lg font-medium">24-Hour Temperature & UVI Forecast</h5>
          <div ref="forecastChart" class="w-full h-64"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'
import * as echarts from 'echarts'
const locationName = ref('')
const latitude = ref(null)
const longitude = ref(null)
const weatherData = ref(null)
const uvIndex = ref(null)
const hourlyForecast = ref([])
const forecastChart = ref(null)
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
async function fetchWeatherByLocationName() {
  if (!locationName.value) {
    alert('Please enter a location name.')
    return
  }
  try {
    const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationName.value)},AU&appid=${API_KEY}`)
    const geoData = await geoRes.json()
    if (!geoData.length) {
      alert('Location not found.')
      return
    }
    const { lat, lon } = geoData[0]
    latitude.value = lat
    longitude.value = lon
    await fetchWeatherData(lat, lon)
  } catch (error) {
    alert('Error fetching location data: ' + error)
  }
}
async function getLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by this browser.')
    return
  }
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      latitude.value = position.coords.latitude
      longitude.value = position.coords.longitude
      await fetchWeatherData(latitude.value, longitude.value)
    },
    (error) => {
      alert('Failed to get location: ' + error.message)
    }
  )
}
async function fetchWeatherData(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    if (data.current) {
      weatherData.value = {
        temp: data.current.temp,
        description: data.current.weather[0]?.description,
      }
      uvIndex.value = data.current.uvi
    } else {
      alert('No weather data received.')
      return
    }
    if (data.hourly && data.hourly.length > 0) {
      hourlyForecast.value = data.hourly.slice(0, 24)
      await nextTick()
      initForecastChart()
    }
  } catch (error) {
    alert('Error fetching weather data: ' + error)
  }
}
function initForecastChart() {
  const chartDom = forecastChart.value
  if (!chartDom || !hourlyForecast.value.length) return
  if (chartDom.__chart__) {
    chartDom.__chart__.dispose()
  }
  const myChart = echarts.init(chartDom)
  chartDom.__chart__ = myChart
  const hours = hourlyForecast.value.map((_, index) => `+${index}h`)
  const temps = hourlyForecast.value.map((item) => item.temp)
  const uvis = hourlyForecast.value.map((item) => item.uvi)
  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Temperature (°C)', 'UVI'] },
    xAxis: { type: 'category', data: hours },
    yAxis: [
      { type: 'value', name: 'Temperature (°C)' },
      { type: 'value', name: 'UVI' }
    ],
    series: [
      { name: 'Temperature (°C)', type: 'line', data: temps, smooth: true, yAxisIndex: 0 },
      { name: 'UVI', type: 'line', data: uvis, smooth: true, yAxisIndex: 1 }
    ]
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => myChart.resize())
}
const uvIndexPosition = computed(() => {
  if (uvIndex.value === null) return '0%'
  return `${(uvIndex.value / 12) * 100}%`
})
const uvIndexClass = computed(() => {
  if (uvIndex.value < 3) return 'text-[#00c950]'
  if (uvIndex.value < 6) return 'text-[#f0b000]'
  if (uvIndex.value < 8) return 'text-[#ff6900]'
  if (uvIndex.value < 11) return 'text-[#fa2c37]'
  return 'text-[#9810fa]'
})
const uvTips = computed(() => {
  if (uvIndex.value < 3) return 'No protection needed'
  if (uvIndex.value < 6) return 'Some protection is required'
  if (uvIndex.value < 8) return 'Protection essential'
  if (uvIndex.value < 11) return 'Extra protection is needed'
  return 'Stay inside'
})
</script>

<style scoped>

</style>