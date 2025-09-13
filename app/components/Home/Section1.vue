<template>
    <section class="text-white px-6 py-5 h-full mt-20">
        <section class="relative">
            <NuxtImg src="/images/Image.png" alt="Hero image" class="h-auto w-full rounded-t-3xl" loading="eager"
                decoding="async" fetchpriority="high" />
            <section class="lg:flex justify-between text-[#B3B3B2]">
                <section
                    class="py-10 px-5 border-x-[5px] lg:border-x-0 lg:border-l-[5px] border-b-[5px] lg:rounded-bl-3xl border-[#262626] border-dashed lg:w-[50%]">

                    <section class="flex flex-wrap gap-2">
                        <button class="w-16 h-10 border-dashed border-[#262626] border-[3px] rounded-lg">All</button>
                        <button class="w-24 h-10 border-[3px] border-dashed border-[#262626] rounded-lg">Men</button>
                        <button class="w-24 h-10 bg-[#C2B4A3] text-[#0F0F0F] rounded-lg">Women</button>
                        <button class="w-16 h-10 border-[3px] border-dashed border-[#262626] rounded-lg">Kids</button>
                    </section>
                    <h1 class="my-5 text-white custom-h1">ELEVATE YOUR STYLE WITH MARKLY</h1>

                    <p class="text-[#81C784]">
                        Explore a world of fashion at Markly, where trends meet affordability.
                        Immerse yourself in the latest styles and seize exclusive promotions.
                    </p>
                </section>

                <section
                    class="text-center border-x-[5px] border-b-[5px] rounded-br-3xl rounded-bl-3xl lg:rounded-bl-none border-[#262626] border-dashed lg:w-[50%] grid grid-cols-2 min-h-[200px]">
                    <section
                        class="flex flex-col justify-center items-center gap-2 border-b-[5px] border-r-[5px] border-[#262626] border-dashed px-2 py-5 md:p-0">
                        <h2 class="text-white custom-h2">1,500 +</h2>
                        <p>Fashion Products</p>
                    </section>

                    <section
                        class="flex flex-col justify-center items-center gap-2 border-b-[5px] border-[#262626] border-dashed px-2 py-5 md:p-0">
                        <h2 class="text-white custom-h2">50 +</h2>
                        <p>New arrivals every month.</p>
                    </section>

                    <section
                        class="flex flex-col justify-center items-center gap-2 border-r-[5px] border-[#262626] border-dashed px-2 py-5 md:p-0">
                        <h2 class="text-white custom-h2">30%</h2>
                        <p>OFF on select items.</p>
                    </section>

                    <section class="flex flex-col justify-center items-center gap-2 px-2 py-5 md:p-0">
                        <h2 class="text-white custom-h2">95%</h2>
                        <p>Customer Satisfaction Rate</p>
                    </section>
                </section>
            </section>
        </section>
    </section>
</template>

<style scoped>
.custom-h1 {
  font-size: clamp(1rem, 1.5vw + 0.75rem, 1.5rem);
  font-weight: 600;
}

.custom-h2 {
  font-size: clamp(1.25rem, 2vw + 0.5rem, 2rem);
  font-weight: 600;
}
</style>