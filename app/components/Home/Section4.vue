<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 767px)')
const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
const isLaptop = useMediaQuery('(min-width: 1024px)')

const currentCategory = useState('currentCategory')

defineProps<{
    pending: boolean
    error: any
    displayedProducts: { id: number; title: string; price: number; image: string }[]
}>()

const buttonClass = (category: string) => {
    return currentCategory.value === category
        ? "bg-[#C2B4A3] text-[#0F0F0F] rounded-lg border-none"
        : "bg-transparent text-white rounded-lg"
}

const handleTitle = (title: string) => {
    if (title.split(" ").length > 3) {
        const newTitle = title.split(" ").splice(0, 3).join(" ") + "..."
        return newTitle
    }
    return title
}

const emit = defineEmits(["add-to-cart"])

const { user } = useProfile()
</script>

<template>
    <section class="text-white px-6 pb-5 pt-20">
        <section class="border-dashed border-[#262626] border-[5px] rounded-3xl">
            <h1 class="text-xl md:text-3xl m-10 uppercase">Elevate Your Style with Our Latest Collection</h1>
            <p class="mt-5 text-[#81C784] ml-10">Each piece is crafted to enhance your fashion statement.</p>

            <section class="ml-10 mt-10 flex flex-wrap gap-5">
                <button class="w-16 h-10 border-dashed border-[#262626] border-[3px] rounded-lg"
                    :class="buttonClass('')" @click="currentCategory = ''">All</button>
                <button class="w-16 h-10 border-[3px] border-dashed border-[#262626] rounded-lg"
                    :class="buttonClass('men\'s clothing')" @click="currentCategory = 'men\'s clothing'">Men</button>
                <button
                    class="w-24 h-10 bg-[#C2B4A3] text-[#0F0F0F] rounded-lg border-dashed border-[#262626] border-[3px]"
                    :class="buttonClass('women\'s clothing')"
                    @click="currentCategory = 'women\'s clothing'">Women</button>
                <button
                    class="w-24 h-10 border-[3px] border-dashed border-[#262626] rounded-lg basis-[60%] md:basis-auto"
                    :class="buttonClass('jewelery')" @click="currentCategory = 'jewelery'">Jewelery</button>
                <button
                    class="w-28 h-10 border-[3px] border-dashed border-[#262626] rounded-lg basis-[60%] md:basis-auto"
                    :class="buttonClass('electronics')" @click="currentCategory = 'electronics'">Electronics</button>
            </section>
            <section v-if="pending" class="flex flex-col justify-center items-center py-20">
                <section class="w-16 h-16 border-4 border-dashed rounded-full border-[#AE9B84] animate-spin"></section>
                <p class="mt-5 text-xl text-[#AE9B84] font-semibold">Loading products...</p>
            </section>

            <section v-else-if="error" class="flex flex-col justify-center items-center py-20">
                <section class="w-16 h-16 border-4 border-dashed rounded-full border-red-600 animate-pulse"></section>
                <p class="mt-5 text-xl text-red-500 font-semibold">Oops! {{ error.message }}</p>
            </section>
            <section class="grid md:grid-cols-2 lg:grid-cols-3" v-else>
                <NuxtLink v-for="(value, index) in displayedProducts" :key="value.id" :to="`/products/${value.id}`"
                    :class="[
                        isLaptop && (index + 1) % 3 === 0 ? 'border-r-0' : isLaptop ? 'border-r-[5px]' : '',
                        isLaptop && (index === 0 || index === 1 || index === 2) ? 'mt-10 border-t-[5px] border-dashed border-[#262626]' : 'lg:border-t-0',
                        isTablet && (index + 1) % 2 === 0 ? 'border-r-0' : isTablet ? 'border-r-[5px]' : '',
                        isTablet && (index === 0 || index === 1) ? 'mt-10' : '',
                        isMobile && (index === 0) ? 'mt-10' : '',
                        'p-4 lg:border-b-[5px] border-t-[5px] border-dashed border-[#262626] flex items-center flex-col'
                    ]">
                    <section class="w-full h-full flex items-center justify-center mb-5 p-10 md:p-3">
                        <img :src="value.image" class="lg:h-3/4 w-auto object-contain" />
                    </section>
                    <section class="flex justify-between items-center w-full">
                        <label
                            class="rounded-full bg-[#1A1A1A] text-[#B3B3B2] w-32 flex justify-center items-center h-10 border-[3px] border-dashed border-[#262626]">
                            Womenswear
                        </label>
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
                            <p class="text-[#81807E] text-lg">Price: <span class="text-white">$ {{ value.price }}</span>
                            </p>
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
</template>
