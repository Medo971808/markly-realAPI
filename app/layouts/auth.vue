<template>
    <ClientOnly>
        <Nav />
        <main>
            <section class="text-white px-6 pb-5 pt-20 md:pt-32">
                <section class="border-dashed border-[#262626] border-[5px] rounded-3xl p-5">
                    <section class="md:grid md:grid-cols-2">
                        <section class="bg-white">
                            <nuxt-img src="images/authImg.png" class="w-full h-auto object-contain" />
                        </section>
                        <section class="flex justify-center items-center">
                            <slot />
                        </section>
                    </section>
                </section>
            </section>
        </main>
        <FooterComments />
        <FooterFAQ />
        <FooterEnd />
    </ClientOnly>
</template>