<script setup lang="ts">
useSeoMeta({
  title: 'Markly',
})

definePageMeta({
  prerender: false
})

const currentCategory = useState('currentCategory', () => '')
const { pending, error, filteredProducts } = useProducts()

const displayedProducts = computed(() => filteredProducts(currentCategory.value).value ?? [])

const { addToCart } = useCart()

</script>

<template>
  <HomeSection1 />
  <HomeSection2 />
  <HomeSection3 />
  <HomeSection4 :pending="pending" :error="error" :displayedProducts="displayedProducts" @add-to-cart="addToCart"/>
</template>