<script setup lang="ts">
useSeoMeta({
    title: 'Dashboard',
})
definePageMeta({
    layout: "dashboard",
})

// interface User {
//     uid: string
//     displayName: string | null
//     email: string | null
//     photoURL: string | null
//     disabled: boolean
// }

// const { data: users, error, pending, refresh } = await useFetch<User[]>("/api/users")

// const toggleUserDisabled = async (id: string) => {
//     await $fetch(`/api/users/${id}/disable`, { method: "POST" })
//     await refresh()
// }
</script>

<template>
    <!-- <section class="space-y-6">
        <section class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">Users</h1>
        </section>
        <h1 v-if="error">{{ error }}</h1>
        <section v-else-if="pending" class="flex flex-col justify-center items-center py-20">
            <section class="w-16 h-16 border-4 border-dashed rounded-full border-[#AE9B84] animate-spin"></section>
            <p class="mt-5 text-xl text-[#AE9B84] font-semibold">Loading users...</p>
        </section>
        <section class="hidden md:block rounded-2xl" v-else="users">
            <table class="w-full border-collapse">
                <thead class="text-left">
                    <tr>
                        <th class="p-4">Image</th>
                        <th class="p-4">Name</th>
                        <th class="p-4">Email</th>
                        <th class="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.uid" class="border-t hover:bg-gray-900">
                        <td class="p-4">
                            <img :src="user?.photoURL || '/face.jpg'" alt="user"
                                class="w-12 h-12 rounded-full object-cover" />
                        </td>
                        <td class="p-4 font-medium">{{ user.displayName }}</td>
                        <td class="p-4">{{ user.email }}</td>
                        <td class="p-4">
                            <button class="px-4 py-2 rounded-md w-24"
                                :class="user.disabled ? 'bg-green-500' : 'bg-red-500'"
                                @click="toggleUserDisabled(user.uid)">
                                {{ user.disabled ? "Unblock" : "Block" }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr>
        </section>

        <section class="grid gap-4 md:hidden">
            <div v-for="user in users" :key="user.uid"
                class="bg-[#1A1A1A] p-4 rounded-xl shadow flex items-center gap-4">
                <img :src="user?.photoURL || '/face.jpg'" alt="user" class="w-16 h-16 rounded-full object-cover" />
                <div class="flex-1">
                    <p class="font-semibold">{{ user.displayName || "Unknown User" }}</p>
                    <p class="text-sm text-gray-400">{{ user.email }}</p>
                </div>
                <button class="px-3 py-1 rounded-md text-sm w-24" :class="user.disabled ? 'bg-green-500' : 'bg-red-500'"
                    @click="toggleUserDisabled(user.uid)">
                    {{ user.disabled ? "Unblock" : "Block" }}
                </button>
            </div>
        </section>
    </section> -->
</template>
