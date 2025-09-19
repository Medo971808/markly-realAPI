import { useAuth } from "./useAuth"
import { useAuthStore } from '../store/auth'

export const useProfile = () => {
  const { refresh } = useAuth()
  const user = useState<any | null>('profile', () => null)
  const loading = useState<boolean>('profileLoading', () => false)
  const error = useState<string | null>('profileError', () => null)
  const authStore = useAuthStore()

  const getUser = async () => {
    loading.value = true
    error.value = null
    try {
      user.value = await $fetch(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/profile',
        { headers: { Authorization: `Bearer ${authStore.accessToken}` } }
      )
    } catch (err: any) {
      if (err?.status === 401) {
        const newAccessToken = await refresh()
        if (newAccessToken) {
          user.value = await $fetch(
            'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/profile',
            { headers: { Authorization: `Bearer ${newAccessToken}` } }
          )
        } else {
          error.value = 'Unauthorized - session expired'
        }
      } else {
        error.value = err?.data?.message || 'Failed to load profile'
      }
    } finally {
      loading.value = false
    }
  }


  return { user, loading, error, getUser }
}
