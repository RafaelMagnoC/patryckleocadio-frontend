import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL_HTTPS

const userFromStorage = localStorage.getItem('user')

interface User {
  name: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
}

const state: AuthState = {
  user: userFromStorage ? (JSON.parse(userFromStorage) as User) : null,
}

const mutations = {
  SET_USER(state: AuthState, user: any) {
    state.user = user
  },
}

const getters = {
  isLoggedIn: (state: AuthState) => !!state.user,
}

const actions = {
  async login({ commit }: any, payload: { email: string; password: string }) {
    try {
      const res = await axios.post(`${API_URL}/api/auth`, payload, { withCredentials: true })

      const user = {
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      }

      commit('SET_USER', user)

      localStorage.setItem('user', JSON.stringify(user))
    } catch (err: any) {
      let errors: Array<{ propertyName: string; errorMessage: string }> = []

      if (err.response?.data) {
        const data = err.response.data

        // Caso seja um array direto vindo da API
        if (Array.isArray(data)) {
          errors = data
        }

        // Caso esteja dentro de um campo "errors"
        else if (Array.isArray(data.errors)) {
          errors = data.errors
        }

        // Caso seja só uma mensagem genérica
        else if (typeof data.message === 'string') {
          errors = [{ propertyName: '', errorMessage: data.message }]
        }

        // Objeto desconhecido
        else {
          errors = [{ propertyName: '', errorMessage: 'Credenciais inválidas.' }]
        }
      } else {
        // Erro sem resposta da API
        errors = [{ propertyName: '', errorMessage: 'Não foi possível conectar ao servidor.' }]
      }

      // Agora você lança um array de erros real
      throw errors
    }
  },

  async logout({ commit }: any) {
    try {
      // Chamada para a API de logout
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true })

      // Limpa o usuário do state e do localStorage
      commit('SET_USER', null)
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  API_URL,
}
