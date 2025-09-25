<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})
useSeoMeta({
    title: 'Dashboard',
})

const { users_count } = useAuth()
const users = await users_count()
console.log(users?.data)

const { data } = useProducts()
const products = computed(() => data.value)

const totalPrice = computed(() => {
  return (products.value || []).reduce((sum, product) => {
    return sum + Number(product.price || 0)
  }, 0)
})
</script>

<template>
    <section class="space-y-6">
        <section class="bg-white shadow rounded-2xl p-6">
            <h1 class="text-3xl font-bold text-gray-800">
                Welcome back, Admin 👋
            </h1>
            <p class="text-gray-600 mt-2">
                Here's a quick overview of what's happening with your store today.
            </p>
        </section>
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <section class="bg-blue-500 text-white rounded-2xl p-6 shadow">
                <h2 class="text-lg font-semibold">Users</h2>
                <p class="text-2xl font-bold mt-2">{{ users?.data }}</p>
            </section>

            <section class="bg-green-500 text-white rounded-2xl p-6 shadow">
                <h2 class="text-lg font-semibold">Orders</h2>
                <p class="text-2xl font-bold mt-2">320</p>
            </section>

            <section class="bg-yellow-500 text-white rounded-2xl p-6 shadow">
                <h2 class="text-lg font-semibold">Revenue</h2>
                <p class="text-2xl font-bold mt-2">${{ totalPrice.toFixed(2) }}</p>
            </section>

            <section class="bg-red-500 text-white rounded-2xl p-6 shadow">
                <h2 class="text-lg font-semibold">Products</h2>
                <p class="text-2xl font-bold mt-2">{{ products?.length }}</p>
            </section>
        </section>
    </section>
</template>