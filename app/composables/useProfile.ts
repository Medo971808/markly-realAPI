import { useAuth } from "./useAuth"

export const useProfile = () => {
  const { accessToken, refresh } = useAuth()
  const user = useState<any | null>('profile', () => null)
  const loading = useState<boolean>('profileLoading', () => false)
  const error = useState<string | null>('profileError', () => null)

  const getUser = async () => {
    loading.value = true
    error.value = null
    try {
      user.value = await $fetch(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/profile', {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      )
    } catch (err: any) {
      if (err?.status === 401) {
        const newAccessToken = await refresh()
        if (newAccessToken) {
          user.value = await $fetch(
            'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/profile', {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
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
