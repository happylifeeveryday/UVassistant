<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <main class="max-w-7xl mx-auto px-4 py-8 flex-grow">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-4">Sunscreen Reminder</h2>
        <div class="space-y-4">
          <div class="border p-4 rounded-lg">
            <p><strong>Current Time:</strong> {{ currentTime }}</p>
            <p>
              <strong>Current UVI:</strong>
              {{ uvIndex !== null ? uvIndex : 'Loading...' }}
            </p>
          </div>

          <div>
            <label class="flex items-center space-x-2">
              <input
                type="number"
                v-model.number="spfValue"
                placeholder="Enter your sunscreen SPF value"
                class="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
              <div
                class="relative inline-block"
                @mouseenter="show = true"
                @mouseleave="show = false"
              >
                <span class="text-blue-600 cursor-pointer">?</span>
                <div
                  v-if="show"
                  class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm rounded shadow w-48"
                >
                  {{ spfTooltip }}
                </div>
              </div>
            </label>
          </div>

          <div class="flex space-x-4">
            <button
              @click="getCurrentLocationAndFetchData"
              class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Get Weather and Forecast Data
            </button>
            <button
              @click="calculateReminder"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Calculate Sunscreen Reminder
            </button>
          </div>
        </div>

        <!-- 24-hour forecast chart -->
        <div v-if="hourlyForecast.length" class="mt-8">
          <h5 class="text-lg font-medium">24-Hour Temperature & UVI Forecast</h5>
          <div ref="forecastChart" class="w-full h-64"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useToast } from 'vue-toastification'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const uvIndex = ref(null)
const hourlyForecast = ref([])
const forecastChart = ref(null)
const spfValue = ref(null)
const currentTime = ref('')
const userLatitude = ref(null)
const userLongitude = ref(null)
const toast = useToast()
const show = ref(false)

const spfTooltip = ref(
  'SPF stands for Sun Protection Factor, indicating how long sunscreen can protect skin from UVB rays.',
)
function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString()
}
updateTime()
setInterval(updateTime, 60000)

onMounted(() => {
  getCurrentLocationAndFetchData()
})

function getCurrentLocationAndFetchData() {
  if (!navigator.geolocation) {
    toast.error('Geolocation is not supported by this browser.')
    return
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLatitude.value = position.coords.latitude
      userLongitude.value = position.coords.longitude
      fetchWeatherData(userLatitude.value, userLongitude.value)
    },
    (error) => {
      toast.error('Failed to get your location: ' + error.message)
    },
  )
}

async function fetchWeatherData(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const data = await response.json()

    if (data.current) {
      uvIndex.value = data.current.uvi
    } else {
      toast.error('No weather data received.')
      return
    }

    if (data.hourly && data.hourly.length > 0) {
      hourlyForecast.value = data.hourly.slice(0, 24)
      await nextTick()
      initForecastChart()
    }
  } catch (error) {
    toast.error('Error fetching weather data: ' + error)
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

  // Convert each forecast timestamp to local hour format
  const hours = hourlyForecast.value.map((item) => {
    const date = new Date(item.dt * 1000)
    return date.getHours() + ':00'
  })
  const temps = hourlyForecast.value.map((item) => item.temp)
  const uvis = hourlyForecast.value.map((item) => item.uvi)

  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Temperature (°C)', 'UVI'] },
    xAxis: { type: 'category', data: hours },
    yAxis: [
      { type: 'value', name: 'Temperature (°C)' },
      { type: 'value', name: 'UVI' },
    ],
    series: [
      {
        name: 'Temperature (°C)',
        type: 'line',
        data: temps,
        smooth: true,
        yAxisIndex: 0,
      },
      {
        name: 'UVI',
        type: 'line',
        data: uvis,
        smooth: true,
        yAxisIndex: 1,
      },
    ],
  }

  myChart.setOption(option)
  window.addEventListener('resize', () => myChart.resize())
}

function sendNotification(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: body,
      icon: '/notification_icon.png',
    })
  }
}

function calculateReminder() {
  if (!hourlyForecast.value.length) {
    toast.error('Please fetch weather data first.')
    return
  }
  if (!spfValue.value || spfValue.value <= 0) {
    toast.error('Please enter a valid SPF value.')
    return
  }

  let zeroUviTime = null
  for (const item of hourlyForecast.value) {
    if (item.uvi === 0) {
      zeroUviTime = new Date(item.dt * 1000)
      break
    }
  }
  if (!zeroUviTime) {
    toast.info('Sunscreen Reminder \nNo time slot with UVI equal to 0 found in the next 24 hours.')
    sendNotification(
      'Sunscreen Reminder',
      'No time slot with UVI equal to 0 found in the next 24 hours.',
    )
    return
  }

  let effectiveDuration = 2
  if (spfValue.value > 15) {
    effectiveDuration += (spfValue.value - 15) * 0.1
  }

  const now = new Date()
  const reapplyTime = new Date(now.getTime() + effectiveDuration * 3600000)

  if (reapplyTime >= zeroUviTime) {
    toast.info(
      `Sunscreen Reminder \nIf you're going to apply sunscreen with SPF ${spfValue.value} now (${now.toLocaleTimeString()}), you won't need to reapply it again today, as the UV index will drop to 0 starting from ${zeroUviTime.toLocaleTimeString()}.`,
    )
    sendNotification(
      'Sunscreen Reminder',
      `If you’re going to apply sunscreen with SPF ${spfValue.value} now (${now.toLocaleTimeString()}), you won’t need to reapply it again today, as the UV index will drop to 0 starting from ${zeroUviTime.toLocaleTimeString()}.`,
    )
  } else {
    toast.info(
      `Sunscreen Reminder \nBetween now (${now.toLocaleTimeString()}) and ${zeroUviTime.toLocaleTimeString()}, please reapply your SPF ${spfValue.value} sunscreen at ${reapplyTime.toLocaleTimeString()}. At that time, I will remind you!`,
    )
    sendNotification(
      'Sunscreen Reminder',
      `Between now (${now.toLocaleTimeString()}) and ${zeroUviTime.toLocaleTimeString()}, please reapply your SPF ${spfValue.value} sunscreen at ${reapplyTime.toLocaleTimeString()}. At that time, I will remind you!`,
    )

    const delay = reapplyTime.getTime() - now.getTime()
    if (delay > 0) {
      setTimeout(() => {
        toast.info(
          `Time to Reapply Sunscreen \nIt's time to reapply your SPF ${spfValue.value} sunscreen.`,
        )
        sendNotification(
          'Time to Reapply Sunscreen',
          `It's time to reapply your SPF ${spfValue.value} sunscreen.`,
        )
      }, delay)
    }
  }
}
</script>

<style scoped>
.bg-gray-50 {
  background: linear-gradient(135deg, #f2f5f7 0%, #d6dee2 100%);
}
</style>
