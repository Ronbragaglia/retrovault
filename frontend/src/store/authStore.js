import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('rv-user') || 'null'),
  token: localStorage.getItem('rv-token') || null,
  setAuth: (user, token) => {
    localStorage.setItem('rv-user', JSON.stringify(user))
    localStorage.setItem('rv-token', token)
    set({ user, token })
  },
  logout: () => {
    localStorage.removeItem('rv-user')
    localStorage.removeItem('rv-token')
    set({ user: null, token: null })
  },
}))
