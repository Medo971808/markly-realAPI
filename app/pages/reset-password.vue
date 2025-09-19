<script setup lang="ts">

const newPassword = ref<string>('')
const confirmedNewPassword = ref<string>('')
const checkedSamePasswords = ref(false)
const { resetPassword, error } = useAuth()

const userRoute = useRoute()
const email = userRoute.query.email
const token = userRoute.query.token
const encodedToken = encodeURIComponent(token as string)

if (!email || !token) navigateTo('/')

const reset = async () => {
    checkedSamePasswords.value = confirmedNewPassword.value === newPassword.value
    if (checkedSamePasswords.value && newPassword.value && confirmedNewPassword.value)
        await resetPassword(email as string, encodedToken as string, newPassword.value)

    if (!newPassword.value || !confirmedNewPassword.value) {
        error.value = 'Please fill in all fields'
        return
    }

    if (newPassword.value !== confirmedNewPassword.value) {
        error.value = 'Passwords do not match'
        return
    }
    if (!error.value) navigateTo('/')
}

</script>

<template>
    <section class="px-6 pb-10 pt-20">
        <section class="max-w-md mx-auto rounded-xl shadow-lg p-8 border border-[#383838]">
            <h2 class="text-white text-2xl font-bold mb-6 text-center">
                Reset Your Password
            </h2>

            <form @submit.prevent="reset" class="space-y-6">
                <section>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                        New Password
                    </label>
                    <input type="password" required v-model="newPassword"
                        class="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="Enter your new password" />
                </section>
                <section>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password
                    </label>
                    <input type="password" required v-model="confirmedNewPassword"
                        class="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="Confirm your new password" />
                </section>
                <section class="pt-2">
                    <button type="submit"
                        class="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Reset Password
                    </button>
                </section>
                <section class="text-center mt-4">
                    <NuxtLink to="/auth/login" class="text-white hover:text-green-500 text-sm">
                        ← Back to Login
                    </NuxtLink>
                </section>
            </form>
            <p class="text-red-500 flex items-center justify-center text-lg mt-2" v-if="error">
                <svg class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ error }}
            </p>
        </section>
    </section>
</template>