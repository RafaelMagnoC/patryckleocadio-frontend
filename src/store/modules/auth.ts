import axios from 'axios'

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
    user: userFromStorage ? JSON.parse(userFromStorage) as User : null,
}

const mutations = {
    SET_USER(state: AuthState, user: any) {
        state.user = user
    },
}


const getters = {
    isLoggedIn: (state: AuthState) => !!state.user
}

const actions = {
    async login({ commit }: any, payload: { email: string; password: string }) {

        try {
            const res = await axios.post('http://217.196.61.26/api/Auth', payload, { withCredentials: true })

            const user = {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
            }

            commit('SET_USER', user)

            localStorage.setItem('user', JSON.stringify(user))
        } catch (err: any) {
            // extrai a mensagem de erro da API, que pode estar dentro de err.response.data
            let message = 'Erro ao autenticar'

            if (err.response?.data) {
                if (typeof err.response.data === 'string') {
                    message = err.response.data
                } else if (typeof err.response.data === 'object') {
                    // Se sua API retorna um objeto com campo 'message' ou 'errors'
                    if (err.response.data.message) {
                        message = err.response.data.message
                    } else if (err.response.data.errors) {
                        // Se é um objeto com vários erros, transforme em string
                        message = JSON.stringify(err.response.data.errors)
                    } else {
                        message = JSON.stringify(err.response.data)
                    }
                }
            }
            throw new Error(message)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
