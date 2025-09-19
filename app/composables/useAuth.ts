export const useAuth = () => {
  const accessToken = useState<string | null>('accessToken', () => null)
  const loading = ref(false)
  const error = ref('')

  interface RefreshResponse {
    accessToken: string
  }

  interface AuthResponse {
    accessToken: string
    refreshToken: string
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = ''
    try {
      const { accessToken: at, refreshToken } = await $fetch<AuthResponse>(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/login', {
          method: 'POST',
          body: { email, password },
        }
      )
      accessToken.value = at
      localStorage.setItem('refreshToken', refreshToken)
    } catch (err: any) {
      error.value = err?.data?.message || 'Login failed'
    } finally {
      loading.value = false
    }
  }

  const register = async (fName: string, lName: string, uName: string, email: string, password: string) => {
    loading.value = true
    error.value = ''
    try {
      const body = { firstName: fName, lastName: lName, username: uName, email, password }

      const { accessToken: at, refreshToken } = await $fetch<AuthResponse>(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/register', {
          method: 'POST',
          body,
        }
      )
      accessToken.value = at
      localStorage.setItem('refreshToken', refreshToken)
    } catch (err: any) {
      error.value = err?.data?.message || 'Register failed'
    } finally {
      loading.value = false
    }
  }


  const signInWithGoogle = async (response: any) => {
    loading.value = true
    error.value = ''
    const idToken = response.credential
    try {
      const { accessToken: at, refreshToken } = await $fetch<AuthResponse>(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/signin-google', {
        method: 'POST',
        body: { idToken }
      })
      accessToken.value = at
      localStorage.setItem('refreshToken', refreshToken)
    } catch (err: any) {
      error.value = err.message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  const refresh = async () => {
    const rt = localStorage.getItem('refreshToken')
    if (!rt) return null
    try {
      const { accessToken: at } = await $fetch<RefreshResponse>(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/refresh-token', {
          method: 'POST',
          body: { refreshToken: rt },
        }
      )
      accessToken.value = at
      return at
    } catch (err: any) {
      error.value = 'Session expired'
      logout()
      return null
    }
  }

  const forgotPassword = async (email: string) => {
    loading.value = true
    error.value = ''
    try {
      await $fetch(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/forgot-password', {
          method: 'POST',
          body: {
            email,
            clientUrl: 'https://markly-realapi.netlify.app'
          },
        }
      )
    } catch (err: any) {
      error.value = err?.data?.message || 'Cannot send confirm link, Please check your email and try again'
    } finally {
      loading.value = false
    }
  }
  
  const resetPassword = async (email: string, token: string, newPassword: string) => {
    loading.value = true
    error.value = ''
    const body = {
        email,
        token,
        newPassword
    }
    try {
      await $fetch(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/reset-password', {
          method: 'POST',
          body,
        }
    )
    } catch (err: any) {
      error.value = err?.data?.message || 'Something went wrong, Please try again'
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    try {
        await $fetch('https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/logout', {
          method: 'POST',
          body: { refreshToken },
          headers: {
            Authorization: `Bearer ${accessToken.value}`
          }
        })
        accessToken.value = null
        localStorage.removeItem('refreshToken')
      } catch (err) {
        console.error('Something Wrong', err)
      }
  }

  return { accessToken, loading, error, login, register, refresh, logout, forgotPassword, resetPassword, signInWithGoogle }
}
