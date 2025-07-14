<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { apiUrl } from '@/components/utils/api_url'

const username = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await axios.post(
      apiUrl('/api/auth/login/'),
      {
        username: username.value,
        password: password.value
      }
    )
    const { access, refresh } = response.data
    // store tokens
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
    // set default header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
    // redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    console.error(err)
    alert('Login failed: check your credentials')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 text-gray-600">
    <form @submit.prevent="login" class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Log In</h2>
      <div class="mb-4">
        <label class="block mb-1" for="username">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          required
          class="w-full border px-3 py-2 rounded"
          placeholder="Enter your username"
        />
      </div>
      <div class="mb-6">
        <label class="block mb-1" for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="w-full border px-3 py-2 rounded"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Log In
      </button>
    </form>
  </div>
</template>
