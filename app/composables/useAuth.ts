import { useAuthStore } from '../store/auth'

export const useAuth = () => {
  const loading = ref(false)
  const error = ref('')
  const authStore = useAuthStore()

  interface AuthResponse {
    accessToken: string
    refreshToken: string
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = ''
    try {
      const user: any = await $fetch(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/login', {
          method: 'POST',
          body: { email, password },
        }
      )
      if(user.message === 'User Signed In Successfully!') authStore.setTokens(user.accessToken, user.refreshToken, user)
      if(user.message === 'Email or Password is invalid!') error.value = user.message
      return user
    } catch (err: any) {
      error.value = err.response._data || 'Login failed'
    } finally {
      loading.value = false
    }
  }

  const register = async (fName: string, lName: string, uName: string, email: string, password: string) => {
    loading.value = true
    error.value = ''
    try {
      const body = { firstName: fName, lastName: lName, username: uName, email, password }

      await $fetch(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/register', {
          method: 'POST',
          body,
        }
      )
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
      const user = await $fetch<AuthResponse>(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/signin-google', {
        method: 'POST',
        body: { idToken }
      })
      authStore.setTokens(user.accessToken, user.refreshToken, user)
    } catch (err: any) {
      error.value = err.message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  authStore.loadRefreshToken()
  const refresh = async () => {
    const rt = authStore.refreshToken
    
    if (!rt) return null
    try {
      const { accessToken: at, refreshToken } = await $fetch<AuthResponse>(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/refresh-token',
        { method: 'POST', body: { refreshToken: rt } }
      )
      authStore.refreshTokens(at, refreshToken)
    } catch (err: any) {
      error.value = 'Session expired'
      await logout()
    }
  }

  const forgotPassword = async (email: string) => {
    loading.value = true
    error.value = ''
    try {
      const result = await $fetch(
        'https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/forgot-password', {
          method: 'POST',
          body: {
            email,
            clientUrl: 'https://markly-realapi.netlify.app/reset-password'
          },
        }
      )
      return result
    } catch (err: any) {
      error.value = err.response._data || 'Email is invalid'
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
    const refreshToken = authStore.refreshToken
    try {
      loading.value = true
      await $fetch('https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/logout', {
        method: 'POST',
        body: { refreshToken },
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      authStore.clearTokens()
    } catch (err) {
      console.error('Something Wrong', err)
    } finally {
      loading.value = false
    }
  }
  const send_otp = async (email: string) => {
    try {
      loading.value = true
      await $fetch(`https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/send-otp`, {
        method: 'POST',
        params: { email }
      })
    } catch (err: any) {
      error.value = err.message || 'Cannot send otp'
      console.error('Something Wrong', err)
    } finally {
      loading.value = false
    }
  }
  const confirm_email = async (email: string, otp: string) => {
    try {
      loading.value = true
      const user = await $fetch<AuthResponse>('https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/confirm-email', {
        method: 'POST',
        body: { email, code: otp },
      })
      authStore.setTokens(user.accessToken, user.refreshToken, user)
    } catch (err :any) {
      error.value = err.response._data || 'Something Wrong'
      console.error('Something Wrong', err)
    } finally {
      loading.value = false
    }
  }

  return { loading, error, login, register, refresh, logout, forgotPassword, resetPassword, signInWithGoogle, send_otp, confirm_email }
}
