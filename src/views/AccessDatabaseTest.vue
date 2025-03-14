<template>
  <h1>Access Database test</h1>
  <button
    @click="query"
    class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
  >
    database test
  </button>
</template>

<script setup>
import { functions } from '@/main'
import { httpsCallable } from 'firebase/functions'

const query = async () => {
  try {
    const queryFunc = httpsCallable(functions, 'testGetDataFromDatabase')
    const result = await queryFunc()
    console.log(result)
  } catch (error) {
    console.error('Error fetching database data:', error)
  }
}
</script>