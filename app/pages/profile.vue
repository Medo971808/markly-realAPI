<script setup lang="ts">
useSeoMeta({
    title: 'User',
})

import { Cropper } from "vue-advanced-cropper"
import "vue-advanced-cropper/dist/style.css"

const { user, uploadImage, editProfile, loading } = useProfile()
const { logout } = useAuth()
const editButton = ref(false)
const newFirstName = ref('')
const newLastName = ref('')
const newUserName = ref('')

if (!user.value) navigateTo('/auth/login')

const updateNameAndPhoto = async () => {
    const firstName = newFirstName.value.trim() !== "" ? newFirstName.value.trim() : null
    const lastName = newLastName.value.trim() !== "" ? newLastName.value.trim() : null
    const userName = newUserName.value.trim() !== "" ? newUserName.value.trim() : null

    user.value.firstName = firstName || user.value.firstName
    user.value.lastName = lastName || user.value.lastName
    user.value.username = userName || user.value.userName

    editButton.value = false
    newFirstName.value = ''
    newLastName.value = ''
    newUserName.value = ''

    if (user.value.firstName || user.value.lastName || user.value.username)
        await editProfile(user.value.firstName, user.value.lastName, user.value.username)

}

const imageSrc = ref<string | null>(null)
const cropData = ref<string | null>(null)

const base64ToFile = (base64: string, filename: string): File => {
    const arr: string[] = base64.split(",")
    const mimeMatch: any = arr[0]?.match(/:(.*?);/)
    if (!mimeMatch) throw new Error("Invalid base64 string: cannot extract MIME type.")
    const mime: string = mimeMatch[1]
    const bstr: string = atob(arr[1] || '')
    let n: number = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target.files || target.files.length === 0) return

    const file: any = target.files[0]
    const reader = new FileReader()

    reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (typeof ev.target?.result === "string") {
            imageSrc.value = ev.target.result
        }
    }
    reader.readAsDataURL(file)
}

const onCropChange = ({ canvas }: { canvas: HTMLCanvasElement | null }) => {
    if (canvas) cropData.value = canvas.toDataURL("image/jpeg")
}


const saveCrop = async () => {
    if (cropData.value) {
        const file = base64ToFile(cropData.value, `${user.value.username}.png`)
        user.value = await uploadImage(file)
    }
    imageSrc.value = null
}

const cancelCrop = () => {
    imageSrc.value = null
}

const handleLogout = async () => {
    await logout()
    user.value = null
    navigateTo('/auth/login')
}
</script>

<template>
    <section v-if="user" class="min-h-screen flex items-center justify-center p-6 pt-20 md:pt-0">
        <section class="w-full max-w-4xl grid md:grid-cols-3 gap-6">
            <section class="md:col-span-1 bg-[#1A1A1A] rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
                <section class="flex justify-center items-center">
                    <section class="flex justify-center mb-6 relative">
                        <img :src="user.imageUrl || '/face.jpeg'" alt="Profile"
                            class="w-32 h-32 rounded-full border-4 border-green-500 shadow-md object-cover">
                        <input id="upload" type="file" accept="image/*" class="hidden" @change="onFileChange">
                        <label for="upload"
                            class="absolute bottom-0 right-1 bg-purple-600 p-2 rounded-full shadow cursor-pointer hover:bg-purple-700">
                            ✏️
                        </label>
                        <section v-if="imageSrc"
                            class="fixed inset-0 bg-black backdrop-blur-sm flex items-center justify-center z-50">
                            <section class="bg-white rounded-lg shadow-lg w-11/12 h-5/6 flex flex-col">
                                <cropper :src="imageSrc || '/face.jpeg'" :stencil-props="{ aspectRatio: 1 }"
                                    class="flex-1 bg-red-200 h-[80%]" @change="onCropChange" />
                                <section v-if="loading" class="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
                                    <section class="w-16 h-16 border-4 border-dashed rounded-full border-[#AE9B84] animate-spin"></section>
                                </section>
                                <section class="p-4 flex justify-end gap-2 border-t">
                                    <button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" @click="cancelCrop">
                                        Cancel
                                    </button>
                                    <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        @click="saveCrop">
                                        Save
                                    </button>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <h1 class="text-2xl font-bold tracking-wide mb-1 text-white">{{ user.firstName + ' ' + user.lastName }}
                </h1>
                <p class="text-gray-400 mb-6 text-sm">{{ user.userName }}</p>
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
                    <section v-if="editButton" class="bg-[#1A1A1A] rounded-xl shadow-md mt-4 mb-8 md:mb-0">
                        <input type="text" v-model="newFirstName"
                            class="h-10 block mb-3 w-full bg-black text-white px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter new first name" />
                        <input type="text" v-model="newLastName"
                            class="h-10 block mb-3 w-full bg-black text-white px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter new last name" />
                        <input type="text" v-model="newUserName"
                            class="h-10 block mb-3 w-full bg-black text-white px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter new username" />
                        <button @click="updateNameAndPhoto"
                            class="px-5 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md transition">
                            Done
                        </button>
                    </section>
                </section>
                <button @click="editButton = !editButton"
                    class="w-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 py-3 rounded-xl transition font-semibold shadow-lg">
                    Edit Profile
                </button>
            </section>
        </section>
    </section>
</template>
