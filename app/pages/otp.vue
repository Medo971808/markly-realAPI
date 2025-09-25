<script setup lang="ts">
useSeoMeta({
    title: 'OTP Code'
})
const route = useRoute()
const email = route.query.email

const { schema } = useValidationSchema()
const { handleSubmit } = useForm({
    validationSchema: schema
})
const { value: otp, errorMessage: otpError } = useField<string>('otp')

const { confirm_email, send_otp, error, loading } = useAuth()
const { getUser, user } = useProfile()

watchEffect(async () => {
    if (user.value) {
        await getUser()
        navigateTo('/')
    }
})

const handleSubmitOTP = handleSubmit(async () => {
    await confirm_email(email as string, otp.value)

    if (!error.value) {
        await getUser()
        navigateTo('/')
    }
})

const countdown = ref(0)
let timer: NodeJS.Timeout | null = null

const startCountdown = () => {
    countdown.value = 300
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--
        } else {
            clearInterval(timer!)
        }
    }, 1000)
}

onMounted(() => {
    startCountdown()
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})

const handleResendOtp = async () => {
    await send_otp(email as string)
    startCountdown()
}
</script>

<template>
    <section class="text-white px-6 py-5 h-full mt-20 flex justify-center">
        <form class="text-center" @submit.prevent="handleSubmitOTP">
            <label class="mb-2">Code has been sent to your email</label>
            <v-otp-input v-model="otp" />
            <p class="text-red-500 mb-5">{{ otpError }}</p>
            <input type="submit" value="Submit" class="text-center bg-blue-500 mt-2 w-20 h-8 rounded-lg" />

            <section class="mt-3">
                <button type="button" class="text-blue-400 underline" :disabled="countdown > 0" @click="handleResendOtp">Resend OTP</button>
                <p v-if="countdown > 0" class="text-sm text-gray-400 mt-1">
                    You can resend after 0{{ Math.floor(countdown / 60) }}: {{ (countdown % 60).toString().padStart(2, '0') }}</p>
            </section>

            <p class="text-red-500 mt-5">{{ error }}</p>
            <section v-if="loading" class="flex flex-col justify-center items-center py-5">
                <section class="w-16 h-16 border-4 border-dashed rounded-full border-[#AE9B84] animate-spin"></section>
            </section>
        </form>
    </section>
</template>
