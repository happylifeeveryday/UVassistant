<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <main class="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
              <button
                @click="getLocation"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
              >
                Get Current Location Weather & UV
              </button>
              
              <div class="border p-4 rounded-lg">
                <h5 class="text-lg font-medium">Your Coordinates</h5>
                <p v-if="latitude && longitude">
                  <strong>Latitude:</strong> {{ latitude }}<br />
                  <strong>Longitude:</strong> {{ longitude }}
                </p>
                <p v-else>Coordinates not available</p>
              </div>
              
              <div class="border p-4 rounded-lg">
                <h5 class="text-lg font-medium">Weather & UV Info</h5>
                <div v-if="weatherData">
                  <p><strong>Temperature:</strong> {{ weatherData.temp }} °C</p>
                  <p><strong>Weather:</strong> {{ weatherData.description }}</p>
                  <p><strong>UV Index:</strong> {{ uvIndex }}</p>
                </div>
                <div v-else>
                  <p>No weather data yet</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-6">
              <h2 class="text-2xl font-bold text-orange-400">UV Index Scale</h2>
              <div class="grid grid-cols-11 gap-1">
                <template v-for="n in 11" :key="n">
                  <div
                    :class="[getNumberClass(n), uvIndex === n ? 'ring-4 ring-blue-300' : '']"
                    class="p-2 text-center font-bold transition-all"
                  >
                    {{ n === 11 ? '11+' : n }}
                  </div>
                </template>
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
  import { ref, nextTick } from 'vue'
  import * as echarts from 'echarts'
  
  const latitude = ref(null)
  const longitude = ref(null)
  const weatherData = ref(null)
  const uvIndex = ref(null)
  const hourlyForecast = ref([])
  const forecastChart = ref(null)
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  
  async function getLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      latitude.value = position.coords.latitude
      longitude.value = position.coords.longitude
      await fetchWeatherData(latitude.value, longitude.value)
    }, (error) => {
      alert('Failed to get location: ' + error.message)
    })
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
    const temps = hourlyForecast.value.map(item => item.temp)
    const uvis = hourlyForecast.value.map(item => item.uvi)
  
    const option = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Temperature (°C)', 'UVI'] },
      xAxis: { type: 'category', data: hours },
      yAxis: [{ type: 'value', name: 'Temperature (°C)' }, { type: 'value', name: 'UVI' }],
      series: [
        { name: 'Temperature (°C)', type: 'line', data: temps, smooth: true, yAxisIndex: 0 },
        { name: 'UVI', type: 'line', data: uvis, smooth: true, yAxisIndex: 1 },
      ]
    }
  
    myChart.setOption(option)
    window.addEventListener('resize', () => myChart.resize())
  }
  
  const getNumberClass = (n) => {
    if (n <= 2) return 'bg-green-500 text-white'
    if (n <= 5) return 'bg-yellow-500 text-white'
    if (n <= 7) return 'bg-orange-500 text-white'
    if (n <= 10) return 'bg-red-500 text-white'
    return 'bg-purple-600 text-white'
  }
  </script>
  
  <style scoped>
  .bg-gray-50 {
    background: linear-gradient(135deg, #f2f5f7 0%, #d6dee2 100%);
  }
  </style>
  


  