<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

defineProps<{
  pending: boolean
  error: Error | undefined
  categories: string[]
  filteredProducts: (category: string) => { id: number; title: string; price: number; image: string; }[]
}>()

const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
const isLaptop = useMediaQuery('(min-width: 1024px)')

const handleTitle = (title: string) => {
  if (title.split(" ").length > 3) {
    return title.split(" ").splice(0, 3).join(" ") + "..."
  }
  return title
}

const emit = defineEmits(["add-to-cart"])

const { user } = useProfile()

</script>

<template>
  <section class="text-white pt-20 px-6 pb-5">
    <section class="border-[5px] border-dashed border-[#262626] rounded-3xl">
      <h1 class="text-xl md:text-3xl m-10 uppercase">Elevate Your Style with Our Latest Collection</h1>
      <p class="mt-5 text-[#676665] ml-10">Each piece is crafted to enhance your fashion statement.</p>
      <section v-if="pending" class="flex flex-col justify-center items-center py-20">
        <section class="w-16 h-16 border-4 border-dashed rounded-full border-[#AE9B84] animate-spin"></section>
        <p class="mt-5 text-xl text-[#AE9B84] font-semibold">Loading products...</p>
      </section>
      <section v-else-if="error" class="flex flex-col justify-center items-center py-20">
        <section class="w-16 h-16 border-4 border-dashed rounded-full border-red-600 animate-pulse"></section>
        <p class="mt-5 text-xl text-red-500 font-semibold">Oops! {{ error.message }}</p>
      </section>
      <section v-else>
        <section v-for="(i, j) in categories" :key="i">
          <h3 :class="['text-2xl md:text-3xl uppercase border-t-[5px] text-center py-10 border-dashed border-[#262626]',
            j === 0 ? 'mt-10' : '']">{{ i }}</h3>
          <section class="grid md:grid-cols-2 lg:grid-cols-3">
            <NuxtLink v-for="(value, index) in filteredProducts(i)" :key="value.id" :to="`/products/${value.id}`"
              :class="[
                isLaptop && (index + 1) % 3 === 0 ? 'border-r-0' : isLaptop ? 'border-r-[5px]' : '',
                isLaptop && (index === 0 || index === 1 || index === 2) ? 'mt-10 border-t-[5px] border-dashed border-[#262626]' : 'lg:border-t-0',
                isTablet && (index + 1) % 2 === 0 ? 'border-r-0' : isTablet ? 'border-r-[5px]' : '',
                isTablet && (index === 0 || index === 1) ? 'mt-10' : '',
                'p-4 lg:border-b-[5px] border-t-[5px] border-dashed border-[#262626] flex items-center flex-col']">
              <section class="w-full h-full flex items-center justify-center mb-5">
                <img :src="value.image" class=" h-3/4 w-auto" :alt="value.title" loading="lazy" />
              </section>
              <section class="flex justify-between items-center w-full">
                <label
                  class="rounded-full bg-[#1A1A1A] text-[#B3B3B2] w-32 flex justify-center items-center h-10 border-[3px] border-dashed border-[#262626]">Womenswear</label>
                <NuxtLink @click.prevent="emit('add-to-cart', value)" :to="user ? '/cart' : '/auth/login'" class="hidden md:flex bg-[#1F1F1F] px-6 py-3 rounded-xl border-[3px] border-dashed border-[#AE9B84] 
                text-white font-medium transition-all duration-300 
                hover:bg-[#AE9B84] hover:text-black hover:scale-105 hover:shadow-lg">
                  Add To Cart
                </NuxtLink>
              </section>
              <section class="w-full">
                <p class="text-xl mt-5 text-left xl:my-3">{{ handleTitle(value.title) }}</p>
                <section class="flex items-center justify-between mt-2">
                  <p class="text-[#81807E] text-lg">Fit:<span class="text-white"> Ankle</span></p>
                  <p class="text-[#81807E] text-lg">Price: <span class="text-white">$ {{ value.price }}</span></p>
                </section>
                <NuxtLink @click.prevent="emit('add-to-cart', value)" :to="user ? '/cart' : '/auth/login'" class="flex md:hidden w-full justify-center mt-4 bg-[#1F1F1F] py-3 rounded-xl border-[3px] border-dashed border-[#AE9B84] 
                text-white font-medium transition-all duration-300 
                hover:bg-[#AE9B84] hover:text-black hover:scale-105 hover:shadow-lg">
                  Add To Cart
                </NuxtLink>
              </section>
            </NuxtLink>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>
