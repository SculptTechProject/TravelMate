<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-lg font-medium">Total Trips</h3>
        <p class="text-2xl font-bold">{{ totalTrips }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-lg font-medium">Total Days</h3>
        <p class="text-2xl font-bold">{{ totalDays }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-lg font-medium">Upcoming Trips</h3>
        <p class="text-2xl font-bold">{{ upcomingCount }}</p>
      </div>
    </div>

    <!-- Trips List -->
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-semibold mb-4">Your Trips</h2>
      <ul class="space-y-2">
        <li v-for="trip in trips" :key="trip.id" class="flex justify-between">
          <span>{{ trip.name }}</span>
          <span>{{ trip.start_date }} - {{ trip.end_date }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

interface Trip {
  id: number
  name: string
  start_date: string
  end_date: string
}

const trips = ref<Trip[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get<Trip[]>('/api/trips/')
    trips.value = data
  } catch (err) {
    console.error(err)
  }
})

const totalTrips = computed(() => trips.value.length)
const totalDays = computed(() =>
  trips.value.reduce((sum, t) => {
    const start = new Date(t.start_date)
    const end = new Date(t.end_date)
    // +1 to include both start and end date
    return sum + Math.round((end.getTime() - start.getTime()) / (1000*60*60*24)) + 1
  }, 0)
)
const upcomingCount = computed(() =>
  trips.value.filter(t => new Date(t.start_date) > new Date()).length
)
</script>

<style scoped>
/* Basic styling; no advanced components */
</style>