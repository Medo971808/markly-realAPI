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

watchEffect(async () => {
    if (user.value) {
        await getUser()
        navigateTo('/')
    }
})

const { schema } = useValidationSchema()
const { handleSubmit } = useForm({
    validationSchema: schema,
})
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')

const forgetPassword = ref('')

const handleLogin = handleSubmit(async () => {
    await login(email.value, password.value)

    if (!error.value) {
        await getUser()
        navigateTo('/')
    }
})

const handleGoogleLogin = async (response: any) => {
    await signInWithGoogle(response)
    await getUser()
    navigateTo('/')
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
        <v-text-field type="email" hide-details="auto" label="Email" v-model="email"></v-text-field>
        <p class="text-red-500 mb-5">{{ emailError }}</p>
        <v-text-field type="password" hide-details="auto" label="Password" v-model="password"></v-text-field>
        <p class="text-red-500 mb-5">{{ passwordError }}</p>

        <section class="flex justify-between items-center mb-5">
            <button class="bg-purple-700 w-28 h-12 rounded-lg hover:bg-purple-600" @click="handleLogin"
                :disabled="loading">
                Log In
            </button>
            <button class="text-[#DB4444]" @click.prevent="handleForgetPassword">
                Forget Password?
            </button>
        </section>
        <p class="text-center mb-2">or</p>
        <section class="flex flex-col items-center justify-center text-black">
            <ClientOnly>
                <GoogleLogin :callback="handleGoogleLogin" :buttonConfig="{ text: 'signin_with', width: 300 }" />
            </ClientOnly>
        </section>
        <section class="flex justify-center items-center mt-2 ">
            <p class="text-center">Not have an account yet?</p>
            <NuxtLink to="/auth/signup" class=" underline ml-3">Sign Up</NuxtLink>
        </section>
        <section v-if="loading" class="flex flex-col justify-center items-center py-5">
            <section class="w-16 h-16 border-4 border-dashed rounded-full border-[#AE9B84] animate-spin"></section>
        </section>
        <p v-if="error" class="text-red-500 mt-3 text-center">{{ error }}</p>
        <p v-else :class="email ? 'text-green-500' : 'text-red-500'" class="text-center mt-3">{{ forgetPassword }}</p>
    </section>
</template>
