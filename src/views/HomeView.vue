<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-[#f2f5f7] to-[#d6dee2]">
    <!-- Main container -->
    <div class="container mx-auto my-5 flex-grow">
      <!-- Button to get current location -->
      <div class="flex justify-center mb-4">
        <div>
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            @click="getLocation"
          >
            Get Current Location Weather & UV
          </button>
        </div>
      </div>

      <!-- Card to display weather/UV information -->
      <div class="flex justify-center">
        <div class="w-full md:w-1/2">
          <div class="bg-white rounded-lg shadow-sm mb-4">
            <div class="p-4">
              <h5 class="text-lg font-bold mb-3">Your Coordinates</h5>
              <p v-if="latitude && longitude">
                <strong>Latitude: </strong>{{ latitude }}<br />
                <strong>Longitude: </strong>{{ longitude }}
              </p>
              <p v-else>Coordinates not available</p>

              <hr class="my-4" />

              <h5 class="text-lg font-bold mb-3">Weather & UV Info</h5>
              <div v-if="weatherData">
                <p><strong>Temperature: </strong>{{ weatherData.temp }} °C</p>
                <p><strong>Weather: </strong>{{ weatherData.description }}</p>
                <p><strong>UV Index: </strong>{{ uvIndex }}</p>
              </div>
              <div v-else>
                <p>No weather data yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 24-Hour Temperature & UVI Forecast -->
      <div class="flex justify-center" v-if="hourlyForecast && hourlyForecast.length">
        <div class="w-full md:w-8/12">
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-4">
              <h5 class="text-lg font-bold mb-3">
                24-Hour Temperature & UVI Forecast
              </h5>
              <div ref="forecastChart" class="w-full h-[400px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-100 py-3 text-center">
      <small class="text-gray-500">&copy; 2025 Weather & UV Tool Example</small>
    </footer>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import * as echarts from 'echarts'

// Coordinates
const latitude = ref(null)
const longitude = ref(null)

// Weather & UV data
const weatherData = ref(null)
const uvIndex = ref(null)

// 24-hour forecast data (hourly)
const hourlyForecast = ref([])

// ECharts container reference
const forecastChart = ref(null)

// OpenWeatherMap API key
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

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
    },
  )
}

// Fetch weather and UV data from OpenWeatherMap One Call API
async function fetchWeatherData(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const data = await response.json()

    if (data.current) {
      // Current meteorological data
      weatherData.value = {
        temp: data.current.temp,
        description: data.current.weather[0]?.description,
      }
      uvIndex.value = data.current.uvi
    } else {
      alert('No weather data received. Check your API or network.')
      return
    }

    // Data for the next 24 hours
    if (data.hourly && data.hourly.length > 0) {
      // 24 hours of data only
      hourlyForecast.value = data.hourly.slice(0, 24)
      // Wait for the DOM to render before initialising the chart
      await nextTick()
      initForecastChart()
    } else {
      hourlyForecast.value = []
      alert('No hourly forecast data available.')
    }
  } catch (error) {
    alert('Error fetching weather data: ' + error)
  }
}

// Initialising ECharts charts
function initForecastChart() {
  // Get DOM
  const chartDom = forecastChart.value
  if (!chartDom || !hourlyForecast.value.length) return

  // Destroy old instances (if any)
  if (chartDom.__chart__) {
    chartDom.__chart__.dispose()
  }

  // initialisation
  const myChart = echarts.init(chartDom)
  chartDom.__chart__ = myChart

  // Prepare x-axis data (hours) with corresponding temperature and UVI arrays
  const hours = hourlyForecast.value.map((item, index) => {
    return `+${index}h`
  })
  const temps = hourlyForecast.value.map((item) => item.temp)
  const uvis = hourlyForecast.value.map((item) => item.uvi)

  // configuration item
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Temperature (°C)', 'UVI'],
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: hours,
    },
    yAxis: [
      {
        type: 'value',
        name: 'Temperature (°C)',
      },
      {
        type: 'value',
        name: 'UVI',
      },
    ],
    series: [
      {
        name: 'Temperature (°C)',
        type: 'line',
        data: temps,
        smooth: true,
        yAxisIndex: 0,
        itemStyle: {
          color: '#5470c6',
        },
      },
      {
        name: 'UVI',
        type: 'line',
        data: uvis,
        smooth: true,
        yAxisIndex: 1,
        itemStyle: {
          color: '#91cc75',
        },
      },
    ],
  }

  // Setup Configuration
  myChart.setOption(option)

  // Adaptive when window size changes
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
</script>