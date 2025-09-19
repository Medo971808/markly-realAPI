<script setup lang="ts">
useSeoMeta({
    title: 'User',
})


const { user } = useProfile()
const { logout } = useAuth()
const editButton = ref(false)
const newFirstName = ref('')
const newLastName = ref('')
// const newPhoto = ref('')

if(!user.value) navigateTo('/')

const updateNameAndPhoto = async () => {
    if (!user.value) return

    const firstName = newFirstName.value.trim() !== "" ? newFirstName.value.trim() : null
    const lastName = newLastName.value.trim() !== "" ? newLastName.value.trim() : null

    user.value.firstName = firstName
    user.value.lastName = lastName

    editButton.value = false
}

const handleLogout = async () => {
    await logout()
    navigateTo('/auth/login')
}
</script>

<template>
    <section v-if="!user" class="text-white px-6 pb-5 pt-20">
        <section class="w-full flex h-16 mt-5">
            <NuxtLink to="/auth/login"
                class="w-full flex items-center justify-center bg-[#DB4444] h-full rounded-xl hover:bg-[#383838] transition duration-300">
                Log in</NuxtLink>
        </section>
    </section>
    <section v-else class="min-h-screen flex items-center justify-center p-6 pt-20 md:pt-0">
        <section class="w-full max-w-4xl grid md:grid-cols-3 gap-6">
            <section class="md:col-span-1 bg-[#1A1A1A] rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
                <section class="flex justify-center mb-6">
                    <img :src="user?.photoURL || '/face.jpg'" alt="Profile"
                        class="w-32 h-32 rounded-full border-4 border-green-500 shadow-md object-cover ring-offset-2" />
                </section>
                <h1 class="text-2xl font-bold tracking-wide mb-1 text-white">{{ user.firstName + ' ' + user.lastName }}</h1>
                <p class="text-gray-400 mb-6 text-sm">{{ user.username }}</p>
                <p class="text-gray-400 mb-6 text-sm">{{ user.email }}</p>
                <section class="flex flex-col gap-3">
                    <NuxtLink to="/checkout"
                        class="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl transition font-semibold shadow-md text-white">
                        Go to Checkout
                    </NuxtLink>
                    <button @click="handleLogout"
                        class="bg-red-600 hover:bg-red-700 py-3 rounded-xl transition font-semibold shadow-md text-white">
                        Log Out
                    </button>
                </section>
            </section>
            <section class="md:col-span-2 bg-[#1A1A1A] rounded-2xl shadow-xl p-8 flex flex-col justify-between">
                <section>
                    <h2 class="text-xl font-bold text-white mb-4">Profile Settings</h2>
                    <p class="text-gray-400 text-sm mb-6">
                        Update your profile information and manage your account settings.
                    </p>
                    <section v-if="editButton"
                        class="flex items-center gap-3 bg-[#1A1A1A] rounded-xl shadow-md mt-4 mb-8 md:mb-0">
                        <input type="text" v-model="newFirstName"
                            class="flex-1 h-10 bg-gray-900 text-white px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter new name" />
                        <input type="text" v-model="newLastName"
                            class="flex-1 h-10 bg-gray-900 text-white px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter new last name" />
                        <button @click="updateNameAndPhoto"
                            class="px-5 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md transition">
                            Done
                        </button>
                    </section>
                </section>
                <button @click="editButton = !editButton"
                    class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 py-3 rounded-xl transition font-semibold shadow-lg">
                    Edit Profile
                </button>
            </section>
        </section>
    </section>
</template>
