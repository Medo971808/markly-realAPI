<script setup lang="ts">
import { GoogleLogin } from 'vue3-google-login'
useSeoMeta({
    title: 'Log in',
})
definePageMeta({
    layout: 'auth'
})
const { login, error, loading, forgotPassword, signInWithGoogle } = useAuth()
const { user, getUser } = useProfile()

if(user.value) navigateTo('/profile')

const email = ref('')
const password = ref('')
const forgetPassword = ref('')

const handleLogin = async () => {
    await login(email.value, password.value)
    await getUser()
    navigateTo('/profile')
}

const handleGoogleLogin = async (response: any) => {
    await signInWithGoogle(response)
    await getUser()
    navigateTo('/profile')
}

const handleForgetPassword = async () => {
    if (!email.value) {
        forgetPassword.value = 'Please enter your email first'
        return
    }
    const result = await forgotPassword(email.value)
    forgetPassword.value = result as string
}
</script>

<template>
    <section class="mt-5 md:mt-0">
        <h1 class="text-3xl md:tracking-widest">Log in to Markly</h1>
        <p class="md:mt-2 mt-3 mb-5">Enter your details below</p>
        <input type="email" v-model="email"
            class="bg-black border-b border-white block w-full mb-5 py-5 pl-2 h-10 focus:outline-none"
            placeholder="Email" />
        <input type="password" v-model="password"
            class="bg-black border-b border-white block w-full mb-5 py-5 pl-2 h-10 focus:outline-none"
            placeholder="Password" />

        <section class="flex justify-between items-center mb-5">
            <button class="bg-[#DB4444] w-28 h-12 rounded-lg hover:bg-[#DB5555]" @click="handleLogin"
                :disabled="loading">
                Log In
            </button>
            <button class="text-[#DB4444]" @click.prevent="handleForgetPassword">
                Forget Password?
            </button>
        </section>
        <p class="text-center mb-2">or</p>
        <section class="flex flex-col items-center justify-center">
            <ClientOnly>
                <GoogleLogin :callback="handleGoogleLogin"
                    :buttonConfig="{ text: 'signin_with', width: 300 }" />
                <p v-if="loading" class="mt-2 text-gray-500">Signing in...</p>
            </ClientOnly>
        </section>
        <section class="flex justify-center items-center mt-2 ">
            <p class="text-center">Not have an account yet?</p>
            <NuxtLink to="/auth/signup" class=" underline ml-3">Sign Up</NuxtLink>
        </section>
        <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
        <p v-else class="text-green-500 mt-3">{{ forgetPassword }}</p>
    </section>
</template>
