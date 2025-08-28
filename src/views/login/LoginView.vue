<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import InputPasswordComponent from '@/components/inputs/password/InputPasswordComponent.vue'
import InputTextComponent from '@/components/inputs/text/InputTextComponent.vue'

const email = ref('')
const password = ref('')
const errorMessage = ref({
    list: [] as Array<{ propertyName: string; errorMessage: string }>
});
const store = useStore()
const router = useRouter()

const handleLogin = async () => {
    errorMessage.value.list = []
    try {
        await store.dispatch('auth/login', { email: email.value, password: password.value })

        router.push('/home') // redireciona após login
    } catch (err: any) {

        if (Array.isArray(err)) {
            errorMessage.value.list = err
        } else {
            errorMessage.value.list = [
                { propertyName: '', errorMessage: 'Credenciais inválidas' }
            ]
        }
    }
}
</script>

<template>
    <div class="login-screen">
        <section class="left-side__wrapper"></section>
        <section class="right-side__wrapper">
            <div class="right-side__content">
                <div class="right-side-content__logo">
                    <img src="@images/PatryckLeocadioLogo.png" alt="Logotipo" class="right-side-content-logo__image">
                </div>
                <div class="right-side-content__text">
                    <h1 class="right-side-content-text__login">Login</h1>
                    <p class="right-side-content-text__description">
                        Preencha os campos abaixo com seus dados de acesso
                    </p>
                </div>
                <div class="right-side-content__form">
                    <form @submit.prevent="handleLogin">
                        <InputTextComponent v-model="email" placeholder="digite seu e-mail" />
                        <InputPasswordComponent v-model="password" placeholder="digite sua senha" />

                        <button type="submit" class="btn">Entrar</button>

                        <div v-if="errorMessage.list.length" class="error-message">
                            <span v-for="(err, index) in errorMessage.list" :key="index" class="alert-error">
                                {{ err.errorMessage }}
                            </span>
                        </div>


                        <div class="login-options">
                            <div class="login-rememberme">
                                <span>Lembrar de mim</span>
                                <input type="checkbox">
                            </div>
                            <div class="forgot-password">
                                <a href="">Esqueceu a senha?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="sass" scoped>
    @use './LoginView.sass'
</style>