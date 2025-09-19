<script setup lang="ts">
const { user } = useProfile()

const cart = useState<any[]>("cart", () => [])

const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
})

const increase = (item: any) => item.quantity++
const decrease = (item: any) => {
  if (item.quantity > 1) item.quantity--
  else cart.value = cart.value.filter(i => i.id !== item.id)
}

const removeItem = (id: number) => {
  cart.value = cart.value.filter(item => item.id !== id)
}

useSeoMeta({
    title: 'Cart',
})
</script>

<template>
  <section class="text-white px-6 pb-5 pt-20 md:pt-32">
    <section v-if="!user" class="w-full flex h-16 mt-5">
      <NuxtLink to="/auth/login" class="w-full flex items-center justify-center bg-[#DB4444] h-full rounded-xl hover:bg-[#383838] transition duration-300">Log in</NuxtLink>
    </section>
    <section v-if="user && cart.length > 0" class="space-y-6">
      <section 
        v-for="item in cart" 
        :key="item.id" 
        class="flex items-center justify-between bg-[#1F1F1F] p-4 rounded-xl border-[3px] border-dashed border-[#262626]">
        <NuxtLink :to="`/products/${item.id}`">
          <img :src="item.image" alt="" class="w-24 h-auto object-cover rounded-lg" />
        </NuxtLink>
        <section class="flex-1 ml-4">
          <NuxtLink :to="`/products/${item.id}`" class="text-lg font-semibold text-white">{{ item.title }}</NuxtLink>
          <p class="text-[#81807E] mt-1">Price: ${{ item.price }}</p>
          <section class="flex items-center mt-2 space-x-2 text-white">
            <button @click="decrease(item)" class="px-2 bg-[#262626] rounded">-</button>
            <span class="px-2">{{ item.quantity }}</span>
            <button @click="increase(item)" class="px-2 bg-[#262626] rounded">+</button>
          </section>
        </section>
        <button @click="removeItem(item.id)" class="text-red-500 font-semibold hover:underline">
          Remove
        </button>
      </section>
      <section class="flex justify-end mt-6 text-white">
        <p class="text-2xl font-bold">Total: ${{ totalPrice }}</p>
      </section>
      <section class="flex justify-end mt-4">
        <NuxtLink to="/checkout" class="bg-[#1F1F1F] p-4 rounded-xl border-[3px] border-dashed border-[#AE9B84] 
                text-white font-medium transition-all duration-300 cursor-pointer
                hover:bg-[#AE9B84] hover:text-black hover:scale-105 hover:shadow-lg">
          Checkout
        </NuxtLink>
      </section>
    </section>
    <section v-else-if="user && cart.length === 0" class="text-center text-xl text-[#81807E]">
      Your cart is empty.
    </section>
  </section>
</template>
