<template>
  <h1>Access Database test</h1>
  <div v-if="result" class="space-y-8">
    <h2 class="text-xl font-bold">Retrieved Data:</h2>
    <div class="chart-container" style="position: relative; height:400px; width:100%;">
      <div ref="ageRateChart" style="width: 100%; height: 100%;"></div>
    </div>
    <div class="chart-container" style="position: relative; height:400px; width:100%;">
      <div ref="cancerTrendChart" style="width: 100%; height: 100%;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { functions } from '@/main'
import { httpsCallable } from 'firebase/functions'
import * as echarts from 'echarts'

const result = ref(null)
const ageRateChart = ref(null)
const cancerTrendChart = ref(null)
let ageRateChartInstance = null
let cancerTrendChartInstance = null

const query = async () => {
  try {
    console.log("Fetching data...")
    const getData = httpsCallable(functions, 'GetDatabaseData')
    const response = await getData()
    console.log("Response data:", response.data) 
    
    
    result.value = response.data
    await nextTick()
    initAgeRateChart(response.data.AGE_RATE_2024)
    initCancerTrendChart(response.data.YOUNG_ADULT_CANCER_TREND)
  } catch (error) {
    console.error('Error fetching database data:', error)
  }
}

const initAgeRateChart = (ageData) => {
  const labels = ageData.map(item => item.age_group)
  const rates = ageData.map(item => parseFloat(item.rate))

  if (ageRateChartInstance) {
    ageRateChartInstance.dispose()
  }

  ageRateChartInstance = echarts.init(ageRateChart.value)

  const option = {
    title: {
      text: 'Age Rate 2024',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: 'Rate'
    },
    series: [{
      type: 'bar',
      data: rates,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(75,192,192,0.4)' },
          { offset: 1, color: 'rgba(75,192,192,0.1)' }
        ])
      }
    }]
  }

  ageRateChartInstance.setOption(option)
  window.addEventListener('resize', () => ageRateChartInstance.resize())
}

const initCancerTrendChart = (trendData) => {
  const labels = trendData.map(item => item.year)
  const rates = trendData.map(item => parseFloat(item.rate))

  if (cancerTrendChartInstance) {
    cancerTrendChartInstance.dispose()
  }

  cancerTrendChartInstance = echarts.init(cancerTrendChart.value)

  const option = {
    title: {
      text: 'Young Adult Cancer Trend',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: labels
    },
    yAxis: {
      type: 'value',
      name: 'Rate'
    },
    series: [{
      type: 'line',
      data: rates,
      smooth: true,
      symbolSize: 8,
      lineStyle: {
        color: 'rgba(153,102,255,1)'
      },
      areaStyle: {
        color: 'rgba(153,102,255,0.2)'
      }
    }]
  }

  cancerTrendChartInstance.setOption(option)
  window.addEventListener('resize', () => cancerTrendChartInstance.resize())
}

onMounted(() => {
  query()
})
</script>

<style scoped>
.chart-container {
  margin: auto;
  max-width: 800px;
}
</style>