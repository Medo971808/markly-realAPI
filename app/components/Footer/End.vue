<script setup lang="ts">
const clothesCategories: string[] = ['T-Shirt', 'Long-Sleeve T-Shirt', 'Raglan Sleeve Shirt', 'Crop Top', 'V-Neck Shirt', 'Muscle Shirt']
</script>

<template>
    <section class="text-white">
        <section class="px-6 pb-5 pt-20 mb-20">
            <section
                class="bg-[#C2B4A3] h-[367px] md:h-[278px] text-black md:flex justify-between rounded-3xl items-center p-1 md:p-0">
                <section class="md:w-[70%]">
                    <h1 class="uppercase text-xl md:text-3xl mx-10 mt-10 font-bold">elevate your wardrobe</h1>
                    <p class="my-5 ml-10 mr-10">Don't miss out - experience the epitome of fashion by clicking 'Buy Now'
                        and
                        embrace a world of chic elegance delivered to your doorstep. Your style journey begins here.</p>
                </section>
                <section class="md:w-[30%] flex justify-center items-center">
                    <NuxtLink to="/products" class="bg-[#1F1F1F] p-4 rounded-xl flex justify-center items-center
                text-white font-medium transition-all duration-300 w-[80%]
                hover:bg-[#AE9B84] hover:text-black hover:scale-105 hover:shadow-lg">
                        Shop Now
                    </NuxtLink>
                </section>
            </section>
        </section>
        <section class="mb-20 h-full hidden lg:block">
            <section class="border-t-[5px] border-b-[5px] border-dashed border-[#262626] py-5 flex justify-center">
                <section v-for="value in clothesCategories" class="flex items-center">
                    <nuxt-img src="/images/icons/image.png" alt="Clothes Categoy" class="w-12" />
                    <p class="mx-2 text-[#333333] uppercase text-lg">{{ value }}</p>
                </section>
            </section>
        </section>
        <section class="md:flex justify-center items-center mb-20 bg">
            <section class="md:flex justify-between md:w-[70%] text-center">
                <h1 class="text-[6rem]" style="font-family: 'Pacifico', cursive;">Markly</h1>
            </section>
            <section class="flex gap-4 px-6 md:p-4 mt-5 md:mt-0">
                <section class="w-12 h-12 bg-[#D6CEC3] rounded-md flex justify-center items-center 
                    transition-all duration-300 hover:bg-[#AE9B84] hover:scale-110 shadow-md cursor-pointer">
                    <a href="https://www.instagram.com/" target="_blank" aria-label="Visit Instagram">
                        <FontAwesomeIcon :icon="['fab', 'instagram']"
                            class="text-black text-2xl hover:text-white transition-colors" />
                    </a>
                </section>

                <section class="w-12 h-12 bg-[#D6CEC3] rounded-md flex justify-center items-center 
                    transition-all duration-300 hover:bg-[#AE9B84] hover:scale-110 shadow-md cursor-pointer">
                    <a href="https://dribbble.com/" target="_blank" aria-label="Visit Dribbble">
                        <FontAwesomeIcon :icon="['fab', 'dribbble']"
                            class="text-black text-2xl hover:text-white transition-colors" />
                    </a>
                </section>

                <section class="w-12 h-12 bg-[#D6CEC3] rounded-md flex justify-center items-center 
                    transition-all duration-300 hover:bg-[#AE9B84] hover:scale-110 shadow-md cursor-pointer">
                    <a href="https://x.com/" target="_blank" aria-label="Visit Twitter (X)">
                        <FontAwesomeIcon :icon="['fab', 'twitter']"
                            class="text-black text-2xl hover:text-white transition-colors" />
                    </a>
                </section>

                <section class="w-12 h-12 bg-[#D6CEC3] rounded-md flex justify-center items-center 
                    transition-all duration-300 hover:bg-[#AE9B84] hover:scale-110 shadow-md cursor-pointer">
                    <a href="https://www.behance.net/" target="_blank" aria-label="Visit Behance">
                        <FontAwesomeIcon :icon="['fab', 'behance']"
                            class="text-black text-2xl hover:text-white transition-colors" />
                    </a>
                </section>
            </section>

        </section>
        <section class="border-t-[5px] border-b-[5px] border-dashed border-[#262626] px-6 py-12 grid lg:grid-cols-3">
            <section class="mb-5">
                <p>Home</p>
                <section class="flex gap-6 text-[#81C784] mt-2">
                    <ul class="flex space-x-4">
                        <li class="flex items-center hover:text-[#AE9B84] cursor-pointer">
                            <NuxtLink to="/about-us" class="text-white hover:text-[#AE9B84] focus:text-[#F5DEB3] transition-colors">Why Us</NuxtLink>
                        </li>
                        <li class="flex items-center before:content-['•'] before:mx-2 before:text-[#AE9B84] hover:text-[#AE9B84] cursor-pointer">
                            <NuxtLink to="/about-us" class="text-white hover:text-[#AE9B84] focus:text-[#F5DEB3] transition-colors">About Us</NuxtLink>
                        </li>
                        <li class="flex items-center before:content-['•'] before:mx-2 before:text-[#AE9B84] hover:text-[#AE9B84] cursor-pointer">
                            <NuxtLink to="/about-us" class="text-white hover:text-[#AE9B84] focus:text-[#F5DEB3] transition-colors">Testimonials</NuxtLink>
                        </li>
                        <li class="flex items-center before:content-['•'] before:mx-2 before:text-[#AE9B84] hover:text-[#AE9B84] cursor-pointer">
                            <NuxtLink to="/about-us" class="text-white hover:text-[#AE9B84] focus:text-[#F5DEB3] transition-colors">FAQ's</NuxtLink>
                        </li>
                    </ul>
                </section>
            </section>
            <section class="mt-10 lg:mt-0">
                <p>Products</p>
                <section class="flex gap-6 text-[#81C784] mt-2">
                    <ul class="flex space-x-4">
                        <li class="flex items-center hover:text-[#AE9B84] cursor-pointer">Menswear</li>
                        <li
                            class="flex items-center before:content-['•'] before:mx-2 before:text-[#AE9B84] hover:text-[#AE9B84] cursor-pointer">
                            Womenswear</li>
                        <li
                            class="flex items-center before:content-['•'] before:mx-2 before:text-[#AE9B84] hover:text-[#AE9B84] cursor-pointer">
                            Kidswear</li>
                    </ul>
                </section>
            </section>
            <section class="mt-10 lg:mt-0">
                <p>Subscribe to Newsletter</p>
                <section class="flex items-center mt-2 bg-[#1A1A1A] w-[80%] h-10 rounded-lg">
                    <input type="email" placeholder="Your Email"
                        class="h-full w-[90%] bg-[#1A1A1A] px-6 outline-none rounded-l-lg" />
                    <button class="bg-[#1A1A1A] hover:bg-[#81C784] h-full w-10 rounded-r-lg"
                        aria-label="email for services">
                        <FontAwesomeIcon :icon="['fas', 'arrow-right']" class="text-[#AE9B84]" />
                    </button>
                </section>
            </section>
        </section>
        <section class="px-6 py-12 md:flex justify-between tracking-widest text-[#81807E]">
            <p class="mb-5 lg:mb-0">&copy; 2025 Markly. All rights reserved.</p>
            <span>Terms & Conditions <span class="text-[#262626]">|</span> Privacy Policy</span>
        </section>
    </section>
</template>