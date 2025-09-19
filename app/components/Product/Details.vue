<script setup lang="ts">
const selectedSize = ref('L')

const sizes = ['S', 'M', 'L', 'XL']

const props = defineProps<{
  product: {
    id: number
    title: string
    description: string
    image: string
    price: number
    rating?: {
      rate: number
      count: number
    }
  } | undefined
  error: any
  pending: boolean
}>()

const emit = defineEmits(["add-to-cart"])

const ratingStars = computed(() => {
  const rate = props.product?.rating?.rate
  return Math.round(rate ?? 0)
})

const { user } = useProfile()
</script>

<template>
  <section v-if="pending" class="flex flex-col justify-center items-center ">
    <section class="w-16 h-16 border-4 border-dashed rounded-full border-[#AE9B84] animate-spin"></section>
    <p class="mt-5 text-xl text-[#AE9B84] font-semibold">Loading product...</p>
  </section>
  <p v-else-if="error" class="text-red-500">Failed to load product</p>
  <section v-else-if="product">
    <section class="flex flex-col p-9 md:flex-row md:justify-between md:items-center">
      <section class="flex flex-col">
        <h1 class="text-xl md:text-3xl uppercase text-white">{{ product.title }}</h1>
        <span class="mt-2 text-[#676665] text-sm md:text-lg">{{ product.description }}</span>
        <span class="inline-block mt-2 bg-[#152011] text-[#8AF265] rounded-xl w-24 text-center">In stock</span>
        <section class="mt-5 md:hidden">
          <NuxtLink @click.prevent="emit('add-to-cart', product)" :to="user ? '/cart' : '/auth/login'" class="mr-5 w-full mb-5 h-12 rounded-xl bg-[#1F1F1F] border-dashed border-[#262626] border-[3px]
            flex items-center justify-center text-white font-medium
            transition-all duration-300 ease-in-out
            hover:bg-[#2a2a2a] hover:scale-105 hover:shadow-lg hover:border-[#C2B4A3]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white"
              class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.6 18h8.8a1 1 0 00.95-1.3L17 13M7 13V6h13" />
            </svg>
            Add To Cart
          </NuxtLink>
          <NuxtLink to="/products" class="mr-5 w-full h-12 rounded-xl bg-[#C2B4A3] flex items-center justify-center text-black font-medium
            transition-all duration-300 ease-in-out
            hover:bg-gradient-to-r hover:from-[#C2B4A3] hover:to-[#E5D5C5]
            hover:scale-105 hover:shadow-lg hover:shadow-[#C2B4A3]/40">
            <NuxtImg src="images/icons/bag.png" alt="Shop Now" loading="lazy" class="w-5 mr-1" />
            Shop Now
          </NuxtLink>
        </section>
      </section>
      <section class="px-10 hidden md:flex">
        <NuxtLink :to="user ? '/cart' : '/auth/login'" @click.prevent="emit('add-to-cart', product)" class="mr-5 w-32 h-12 rounded-xl bg-[#1F1F1F] border-dashed border-[#262626] border-[3px]
          flex items-center justify-center text-white font-medium
          transition-all duration-300 ease-in-out
          hover:bg-[#2a2a2a] hover:scale-105 hover:shadow-lg hover:border-[#C2B4A3]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white"
            class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.6 18h8.8a1 1 0 00.95-1.3L17 13M7 13V6h13" />
          </svg>
          Add To Cart
        </NuxtLink>
        <NuxtLink to="/products" class="mr-5 w-32 h-12 rounded-xl bg-[#C2B4A3] flex items-center justify-center text-black font-medium
          transition-all duration-300 ease-in-out
          hover:bg-gradient-to-r hover:from-[#C2B4A3] hover:to-[#E5D5C5]
          hover:scale-105 hover:shadow-lg hover:shadow-[#C2B4A3]/40">
          <NuxtImg src="images/icons/bag.png" alt="Shop Now" loading="lazy" class="w-5 mr-1" />
          Shop Now
        </NuxtLink>
      </section>
    </section>
    <section class="mt-10 border-dashed border-[#262626] border-t-[5px] border-b-[5px] grid md:grid-cols-2">
      <section
        class="md:flex items-center md:border-r-[5px] border-dashed border-[#262626] md:p-10 p-5 border-b-[5px] md:border-b-0 ">
        <img :alt="product.title" loading="lazy" :src="product.image" class="w-full object-contain h-auto rounded-xl">
      </section>
      <section class="flex items-center flex-col justify-center p-10 space-y-5">
        <img :alt="product.title" loading="lazy" :src="product.image" class="h-[48%] object-contain w-auto rounded-xl">
        <img :alt="product.title" loading="lazy" :src="product.image" class="h-[48%] object-contain w-auto rounded-xl">
      </section>
    </section>
    <section class="border-b-[5px] border-dashed border-[#262626]">
      <section class="grid md:grid-cols-2">
        <section class="md:border-r-[5px] border-b-[5px] md:border-b-0 border-dashed border-[#262626]">
          <h1 class="text-xl md:text-3xl m-10">Materials, Care and origin</h1>
          <section class="border-t-[5px] border-dashed border-[#262626] p-10">
            <h3 class="text-xl font-bold">Join Life</h3>
            <p class="text-[#81807E] mt-3">
              Tracing its roots back to ancient Greek draped garments, has evolved through centuries,
              often crafted from luxurious fabrics like silks, satins, and velvets.
            </p>
          </section>
        </section>
        <section class="py-10 md:px-20 px-10">
          <h1 class="text-xl">Features</h1>
          <ul class="list-disc pl-6 mt-10 text-[#81807E]">
            <li>Distressed detailing for a rugged look</li>
            <li>Button-up front closure with engraved metal buttons</li>
            <li>Two chest pockets with buttoned flaps</li>
            <li>Two side pockets for added functionality</li>
            <li>Adjustable buttoned cuffs for a personalized fit</li>
            <li>Back waist tabs for customizable styling</li>
          </ul>
        </section>
      </section>
    </section>
    <section class="md:grid md:grid-cols-2">
      <section class="md:border-r-[5px] border-dashed border-[#262626]">
        <section class="border-b-[5px] border-dashed border-[#262626] p-10">
          <p class="text-xl font-bold">Materials</p>
          <p class="text-[#81807E] mt-3">
            Flowing from Grecian folds to glittering silks, the evening gown has graced centuries in luxury.
          </p>
          <NuxtImg src="/images/productDetails/material.png" alt="material for product" loading="lazy" class="md:w-[520px] md:h-[311px] w-[90%] mt-10" />
        </section>
      </section>
      <section class="box-border">
        <section class="py-10 md:px-20 px-10 border-dashed border-[#262626] border-b-[5px]">
          <h2 class="text-xl font-bold">Price</h2>
          <section class="lg:flex items-center mt-5 justify-between">
            <section class="md:flex items-center">
              <h1 class="text-2xl mr-5">${{ product.price }}</h1>
              <p class="text-[#81807E]">( MRP incl. of all taxes )</p>
            </section>
            <NuxtLink @click.prevent="emit('add-to-cart', product)" :to="user ? '/cart' : '/auth/login'" class="mr-5 mt-5 md:mt-0 w-32 h-12 rounded-xl bg-[#1F1F1F] border-dashed border-[#262626] border-[3px]
              flex items-center justify-center text-white font-medium
              transition-all duration-300 ease-in-out
              hover:bg-[#2a2a2a] hover:scale-105 hover:shadow-lg hover:border-[#C2B4A3]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white"
                class="w-5 h-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.6 18h8.8a1 1 0 00.95-1.3L17 13M7 13V6h13" />
              </svg>
              Add To Cart
            </NuxtLink>
          </section>
        </section>
        <section class="py-10 md:px-20 px-10 border-dashed border-[#262626] border-b-[5px]">
          <h1 class="text-xl font-bold mb-5">Available Sizes</h1>
          <section class="flex gap-2 md:gap-5">
            <button v-for="size in sizes" :key="size" @click="selectedSize = size" :class="[
              'md:w-24 w-16 md:text-2xl rounded-2xl h-10',
              selectedSize === size ? 'bg-[#4A4A4A]' : 'bg-[#1A1A1A]'
            ]">
              {{ size }}
            </button>
          </section>
        </section>
        <section class="py-10 md:px-20 px-10 text-xl font-bold border-dashed border-[#262626] border-b-[5px]">
          <h1>Rating & Review</h1>
        </section>
        <section class="md:grid md:grid-cols-2 py-10 md:px-20 px-10">
          <section>
            <h1 class="text-4xl font-bold tracking-[0.2rem]">{{ product.rating?.rate }}</h1>
            <section class="flex my-5">
              <FontAwesomeIcon v-for="n in ratingStars" :key="n" :icon="['fas', 'star']"
                class="text-[#FFCE22] mr-1 text-sm md:text-lg" />
            </section>
            <p class="text-[#81807E]">{{ product.rating?.count }} Ratings</p>
          </section>
          <section class="flex flex-col gap-3 mt-5">
            <section class="flex items-center" v-for="n in 5" :key="n">
              <FontAwesomeIcon :icon="['fas', 'star']" class="text-[#FFCE22] mr-1 text-sm md:text-lg" />
              <p class="text-xl text-[#81807E] mx-2">0{{ 6 - n }}</p>
              <section
                class="flex-1 h-5 bg-[#1A1A1A] rounded-full overflow-hidden flex items-center border border-[#262626] px-2">
                <section class="h-1 bg-[#AE9B84] rounded-full" :style="{ width: `${(6 - n) / 6 * 100}%` }"></section>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>
