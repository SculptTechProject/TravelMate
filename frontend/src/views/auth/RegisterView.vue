<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { apiUrl } from '@/components/utils/api_url'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }
  try {
    await axios.post(apiUrl('/api/auth/register/'), {
      username: username.value,
      password: password.value,
    })
    alert('Registration successful! Please log in.')
    router.push('/login')
  } catch (err: any) {
    console.error(err)
    alert('Registration failed: ' + (err.response?.data?.detail || err.message))
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 text-gray-600">
    <form @submit.prevent="register" class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
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
      <div class="mb-4">
        <label class="block mb-1" for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="w-full border px-3 py-2 rounded"
          placeholder="Enter a password"
        />
      </div>
      <div class="my-6 py-5">
        <label class="block mb-1" for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          required
          class="w-full border px-3 py-2 rounded"
          placeholder="Repeat your password"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Register
      </button>
    </form>
  </div>
</template>
