<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
const { refresh } = useAuth()
const { getUser } = useProfile()

onMounted(async () => {
    if (!authStore.accessToken || !useCookie('accessToken').value) {
        await refresh()
    }
    if(useCookie('accessToken').value) await getUser()
})
</script>

<template>
    <ClientOnly>
        <Nav />
        <main>
            <slot />
        </main>
        <footer>
            <FooterComments />
            <FooterFAQ />
            <FooterEnd />
        </footer>
    </ClientOnly>
</template>