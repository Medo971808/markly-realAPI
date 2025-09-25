import { defineStore } from 'pinia'

interface AuthState {
    accessToken: string | null,
    refreshToken: string | null | undefined,
    user: any
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        accessToken: null,
        refreshToken: null,
        user: {}
    }),
    actions: {
        setTokens(accessToken: string, refreshToken: string, user: object) {
            this.accessToken = accessToken
            this.refreshToken = refreshToken
            this.user = user

            const RTCookie = useCookie('refreshToken', { path: '/', maxAge: 60 * 60 * 24 * 7 })
            const ATCookie = useCookie('accessToken', { path: '/', maxAge: 60 * 5 })
            RTCookie.value = refreshToken
            ATCookie.value = accessToken
        },
        clearTokens() {
            this.accessToken = null
            this.refreshToken = null
            this.user = {}

            const RTCookie = useCookie('refreshToken', { path: '/' })
            const ATCookie = useCookie('accessToken', { path: '/' })
            RTCookie.value = null
            ATCookie.value = null
        },
        loadRefreshToken() {
            const RTCookie = useCookie('refreshToken')
            if (RTCookie && RTCookie.value) this.refreshToken = RTCookie.value
        },
        refreshTokens(accessToken: string, refreshToken: string) {
            this.accessToken = accessToken
            this.refreshToken = refreshToken

            const RTCookie = useCookie('refreshToken', { path: '/', maxAge: 60 * 60 * 24 * 7 }) // 7 أيام
            const ATCookie = useCookie('accessToken', { path: '/', maxAge: 60 * 60 })
            RTCookie.value = refreshToken
            ATCookie.value = accessToken
        }
    }
})
