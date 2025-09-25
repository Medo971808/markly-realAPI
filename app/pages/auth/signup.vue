<script setup lang="ts">
import { GoogleLogin } from 'vue3-google-login'

useSeoMeta({
    title: 'Sign up',
})
definePageMeta({
    layout: 'auth'
})

const { schema } = useValidationSchema()

const { handleSubmit } = useForm({
  validationSchema: schema
})

const { value: fName, errorMessage: fNameError } = useField<string>('firstName')
const { value: lName, errorMessage: lNameError } = useField<string>('lastName')
const { value: uname, errorMessage: unameError } = useField<string>('username')
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')

const { error, register, loading, signInWithGoogle, send_otp } = useAuth()
const { getUser, user } = useProfile()

watchEffect(async () => {
    if (user.value) {
        await getUser()
        navigateTo('/')
    }
})

const handleRegister = async () => {
    if (!fName.value || !lName.value || !uname.value || !email.value || !password.value) {
        alert('Please fill all fields')
        return
    }
    await register(fName.value, lName.value, uname.value, email.value, password.value)
    
    if (!error.value) {
        await send_otp(email.value)
        navigateTo(`/otp?email=${email.value}`)
    }
}

const handleGoogleLogin = async (response: any) => {
    await signInWithGoogle(response)
    await getUser()
    navigateTo('/')
}
</script>

<template>
    <section class="mt-5 md:mt-0">
        <h1 class="text-3xl md:tracking-widest">Create an account</h1>
        <p class="md:mt-2 mt-3 mb-5">Enter your details below</p>
        <v-text-field type="text" hide-details="auto" label="First Name" v-model="fName"></v-text-field>
        <p class="text-red-500 mb-5">{{ fNameError }}</p>
        <v-text-field type="text" hide-details="auto" label="Last Name" v-model="lName"></v-text-field>
        <p class="text-red-500 mb-5">{{ lNameError }}</p>
        <v-text-field type="text" hide-details="auto" label="User Name" v-model="uname"></v-text-field>
        <p class="text-red-500 mb-5">{{ unameError }}</p>
        <v-text-field type="email" hide-details="auto" label="Email" v-model="email"></v-text-field>
        <p class="text-red-500 mb-5">{{ emailError }}</p>
        <v-text-field type="password" hide-details="auto" label="Password" v-model="password"></v-text-field>
        <p class="text-red-500 mb-5">{{ passwordError }}</p>

        <section class="flex justify-between items-center mb-5">
            <button class="bg-purple-700 w-full h-12 rounded-lg hover:bg-purple-600" @click="handleRegister"
                :disabled="loading">
                Create Account
            </button>
        </section>
        <p class="text-center mb-2">or</p>
        <section class="flex flex-col items-center justify-center text-black">
            <ClientOnly>
                <GoogleLogin :callback="handleGoogleLogin" :buttonConfig="{ text: 'signup_with', width: 300 }" />
            </ClientOnly>
        </section>
        <section class="flex justify-center items-center mt-2 ">
            <p class="text-center">Already have account?</p>
            <NuxtLink to="/auth/login" class=" underline ml-3">Log In</NuxtLink>
        </section>
        <section v-if="loading" class="flex flex-col justify-center items-center py-5">
            <section class="w-16 h-16 border-4 border-dashed rounded-full border-[#AE9B84] animate-spin"></section>
        </section>
        <p v-if="error" class="text-red-500 mt-3 text-center">{{ error }}</p>
    </section>
</template>