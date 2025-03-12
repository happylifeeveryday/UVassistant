<template>
  <div class="tool-background min-vh-100 d-flex flex-column">
    <!-- Main container -->
    <div class="container my-5 flex-grow-1">
      <!-- Button to get current location -->
      <div class="row justify-content-center mb-4">
        <div class="col-auto">
          <button class="btn btn-primary" @click="getLocation">
            Get Current Location Weather & UV
          </button>
        </div>
      </div>

      <!-- Card to display weather/UV information -->
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-3">Your Coordinates</h5>
              <p v-if="latitude && longitude">
                <strong>Latitude: </strong>{{ latitude }}<br />
                <strong>Longitude: </strong>{{ longitude }}
              </p>
              <p v-else>Coordinates not available</p>

              <hr />

              <h5 class="card-title mb-3">Weather & UV Info</h5>
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
    </div>

    <!-- Footer -->
    <footer class="bg-light py-3 text-center">
      <small class="text-muted"> &copy; 2025 Weather & UV Tool Example </small>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Coordinates
const latitude = ref(null)
const longitude = ref(null)

// Weather & UV data
const weatherData = ref(null)
const uvIndex = ref(null)

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
      weatherData.value = {
        temp: data.current.temp,
        description: data.current.weather[0]?.description,
      }
      uvIndex.value = data.current.uvi
    } else {
      alert('No weather data received. Check your API or network.')
    }
  } catch (error) {
    alert('Error fetching weather data: ' + error)
  }
}
</script>

<style scoped>
.tool-background {
  background: linear-gradient(135deg, #f2f5f7 0%, #d6dee2 100%);
}

.card {
  border-radius: 8px;
}
</style>
