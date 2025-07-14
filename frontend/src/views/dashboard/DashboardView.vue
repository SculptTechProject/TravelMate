<template>
  <div class="flex justify-end mb-4">
    <button @click="logout" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
      Logout
    </button>
  </div>
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
import { useRouter } from 'vue-router'
import { apiUrl } from '@/components/utils/api_url'

const router = useRouter()

const logout = async () => {
  const refresh = localStorage.getItem('refresh_token')
  if (refresh) {
    try {
      await axios.post(apiUrl('/api/auth/logout/'), { refresh })
    } catch (e) {
      console.warn('Logout error (token may be expired):', e)
    }
  }
  // delete local tokens
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  delete axios.defaults.headers.common['Authorization']
  // redirect to login
  router.push({ name: 'login' })
}

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
    return sum + Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  }, 0),
)
const upcomingCount = computed(
  () => trips.value.filter((t) => new Date(t.start_date) > new Date()).length,
)
</script>
