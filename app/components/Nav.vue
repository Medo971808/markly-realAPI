<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)

const cart = useState<any[]>("cart", () => [])

const linkClass = (path: string) => {
  return route.path === path ?
    'border-[3px] bg-black border-[#262626]' : ''
}

const { user, getUser } = useProfile()
onMounted(async () => {
  await getUser()

})

const handlePhoto = () => {
  if (user.value) navigateTo(`/profile`)
  menuOpen.value = false
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s linear;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<template>
  <nav
    class="bg-[#2A2F38] md:bg-black fixed top-0 left-0 w-full z-50 lg:bg-black lg:border-b-[5px] lg:border-dashed lg:border-[#262626] px-6 py-3">
    <section class="flex justify-between items-center">
      <section class="text-white font-semibold text-2xl md:text-3xl">
        <NuxtLink to="/" style="font-family: 'Pacifico', cursive;">Markly</NuxtLink>
      </section>
      <button @click="menuOpen = !menuOpen" class="md:hidden text-white focus:outline-none" aria-label="open menu">
        <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <section class="hidden md:flex items-center space-x-3">
        <NuxtLink
          class="cursor-pointer bg-zinc-900 text-white px-3 py-1 rounded transition duration-300 hover:bg-[#383838]"
          to="/">Home</NuxtLink>
        <NuxtLink class="cursor-pointer bg-zinc-900 p-2 rounded transition duration-300 hover:bg-[#383838]" aria-label="Shop for Products"
          to="/products">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white"
            class="w-5 h-5 transition-transform duration-300 hover:scale-110">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.6 18h8.8a1 1 0 00.95-1.3L17 13M7 13V6h13" />
          </svg>
        </NuxtLink>
        <NuxtLink
          class="cursor-pointer bg-[#AE9B84] text-black px-4 py-1 rounded font-medium transition duration-300 hover:bg-[#c9b7a0]"
          to="/contact">Contact</NuxtLink>
        <NuxtLink
          class="cursor-pointer bg-zinc-900 text-white px-3 py-1 rounded transition duration-300 hover:bg-[#383838]"
          :to="user ? '/cart' : '/auth/login'">Cart ({{ cart.length }})
        </NuxtLink>
        <NuxtLink
          class="cursor-pointer bg-zinc-900 text-white px-3 py-1 rounded transition duration-300 hover:bg-[#383838]"
          :to="user ? '/dashboard' : '/auth/login'">Dashboard
        </NuxtLink>
        <img :src="user.photoURL || '/face.jpg'" :alt="user.username || ''" v-if="user" loading="eager" class="rounded-full w-12 h-12 cursor-pointer"
          @click="handlePhoto">
        <NuxtLink v-else to="/auth/login"
          class="bg-red-700 text-white text-base font-semibold px-4 py-2 rounded-lg hover:bg-[#383838] transition-colors">
          Log In
        </NuxtLink>
        <button @click="getUser">ww</button>
      </section>
    </section>
    <transition name="slide">
      <section v-if="menuOpen" class="flex flex-col mt-4 space-y-2 md:hidden text-white">
        <img :src="user.photoURL || '/face.jpg'" alt="" v-if="user" class="rounded-full w-12 h-12 cursor-pointer"
          @click="handlePhoto">
        <NuxtLink @click="menuOpen = false" to="/auth/login"
          class="cursor-pointer bg-[#DB4444] p-2 flex items-center transition duration-300 hover:bg-[#383838]"
          :class="linkClass('/auth/login')" v-else>Log In</NuxtLink>
        <NuxtLink class="cursor-pointer px-3 py-1 rounded transition duration-300 hover:bg-[#383838]" to="/"
          :class="linkClass('/')" @click="menuOpen = false">Home</NuxtLink>
        <NuxtLink class="cursor-pointer p-2 flex items-center transition duration-300 hover:bg-[#383838]" to="/products"
          :class="linkClass('/products')" @click="menuOpen = false">
          <p class="mr-3">Shop</p>
        </NuxtLink>
        <NuxtLink class="cursor-pointer p-2 flex items-center transition duration-300 hover:bg-[#383838]" to="/contact"
          :class="linkClass('/contact')" @click="menuOpen = false">Contact</NuxtLink>
        <NuxtLink class="cursor-pointer p-2 flex items-center transition duration-300 hover:bg-[#383838]"
          :to="user ? '/cart' : '/auth/login'" :class="linkClass('/cart')" @click="menuOpen = false">Cart ({{ cart.length }})
        </NuxtLink>
        <NuxtLink class="cursor-pointer p-2 flex items-center transition duration-300 hover:bg-[#383838]"
          :to="user ? '/dashboard' : '/auth/login'" :class="linkClass('/cart')" @click="menuOpen = false">Dashboard
        </NuxtLink>
      </section>
    </transition>
  </nav>
  <section v-if="menuOpen" class="fixed inset-0 bg-black/40 z-30 md:hidden" @click="menuOpen = false"></section>
</template>
