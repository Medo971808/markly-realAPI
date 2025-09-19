<script setup lang="ts">
useSeoMeta({
  title: 'Checkout',
})

import { loadStripe } from '@stripe/stripe-js'

const { user } = useProfile()
const cart = useState<any[]>("cart", () => [])

const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)
const totalIsZeroMessage = ref('')

const checkout = async () => {
  try {
    if (totalPrice.value === 0) {
      totalIsZeroMessage.value = 'There is no products to buy'
      return
    }

    const config = useRuntimeConfig()
    const stripeKey = config.public.stripePublicKey
    const stripe = await loadStripe(stripeKey)
    if (!stripe) {
      alert('Stripe.js failed to load')
      return
    }

    const origin = window.location.origin
    const itemsForStripe = cart.value.map(item => ({
      name: item.title,
      price: item.price * 100,
      quantity: item.quantity
    }))

    const res: any = await $fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      body: { items: itemsForStripe, origin }
    })

    const r = { ...res }
    const result = Object.values(r).slice(8).slice(0, -2).join('')
    window.location.href = result
  } catch (err: any) {
    alert(`Something went wrong. Please try again, (${err})`)
  }
}
</script>

<template>
  <section class="text-white px-6 pb-10 pt-32">
    <section v-if="!user" class="w-full flex h-16 mt-5">
      <NuxtLink to="/auth/login"
        class="w-full flex items-center justify-center bg-[#DB4444] h-full rounded-xl hover:bg-[#383838] transition duration-300">
        Log in
      </NuxtLink>
    </section>
    <section v-else class="max-w-4xl mx-auto p-8 rounded-2xl shadow-2xl bg-[#1A1A1A]/70 backdrop-blur-md">
      <h1
        class="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-[#DB4444] to-blue-500 bg-clip-text text-transparent">
        Checkout
      </h1>
      <section class="flex flex-col md:flex-row items-center gap-6 mb-10">
        <img :src="user.photoURL || '/face.jpg'" alt="" v-if="user" class="rounded-full w-12 h-12 cursor-pointer">
        <section class="text-center md:text-left">
          <p class="text-xl font-semibold">{{ `${user.firstName} ${user.lastName}` }}</p>
          <p class="text-gray-400 text-sm">{{ user.email }}</p>
        </section>
      </section>
      <section class="mb-8 bg-black/40 p-5 rounded-xl shadow-inner">
        <h2 class="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Order Summary</h2>
        <ul class="divide-y divide-gray-700">
          <li v-for="item in cart" :key="item.id" class="py-3 flex justify-between">
            <span>{{ item.title }} ×{{ item.quantity }}</span>
            <span class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </li>
        </ul>
        <section class="flex justify-between mt-5 font-bold text-xl text-[#1A1A]">
          <span>Total:</span>
          <span>${{ totalPrice.toFixed(2) }}</span>
        </section>
        <p class="text-[#DB4444] mt-2 text-xl">{{ totalIsZeroMessage }}</p>
      </section>
      <button @click="checkout"
        class="w-full py-4 rounded-xl font-semibold text-lg shadow-md bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-[1.02] transition-transform duration-200">
        Pay with Stripe
      </button>
    </section>
  </section>
</template>
