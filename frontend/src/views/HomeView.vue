<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goToRegister = () => router.push('/register')
const goToLogin = () => router.push('/login')
</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-gray-50 shadow-xl shadow-green-100">
    <h1 class="text-2xl font-bold"><span class="text-green-600">Travel</span>Mate</h1>
    <div class="flex gap-4">
      <button @click="goToRegister" class="px-6 py-2 bg-green-600 text-white rounded cursor-pointer transition-all hover:py-3 hover:px-7 hover:bg-green-700 hover:text-gray-100">
        Register
      </button>
      <button @click="goToLogin" class="px-6 py-2 bg-gray-200 text-gray-800 rounded cursor-pointer hover:bg-gray-800 hover:text-gray-200 transition-all hover:py-3 hover:px-7">Login</button>
    </div>
  </nav>
</template>
