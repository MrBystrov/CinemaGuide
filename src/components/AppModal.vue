<template>
  <div class="modal-container">
    <div class="auth flex">
      <main-logo width="180" height="36"></main-logo>
      <button-close class="btn-close" @click="store.closeModal(), resetValidator()"></button-close>
      <TransitionGroup tag="form" id="authForm" name="authForm" class="auth__form flex" @submit.prevent="authSend()">
        <h3 class="auth__title title" v-if="store.modalType !== 'login'">
          Регистрация <span v-if="store.modalType === 'success'"> завершена</span>
        </h3>
        <p class="auth__success-text text" v-if="store.modalType === 'success'">
          Используйте вашу электронную почту для входа
        </p>
        <TransitionGroup tag="div" class="auth__inputs flex" name="inputs">
          <input type="text" :class="{ 'is-invalid': v$.inputMail.$errors.length && store.modalType === 'register' }"
            class="auth__mail auth__input" v-if="store.modalType !== 'success'" v-model="v$.inputMail.$model"
            placeholder="Электронная почта" />
          <input type="text" :class="{ 'is-invalid': v$.inputName.$errors.length }" class="auth__name auth__input"
            placeholder="Имя" v-model="v$.inputName.$model" v-if="store.modalType === 'register'" />
          <input type="text" :class="{ 'is-invalid': v$.inputSurname.$errors.length }" class="auth__surname auth__input"
            placeholder="Фамилия" v-model="v$.inputSurname.$model" v-if="store.modalType === 'register'" />
          <input name="password" type="password" :class="{
              'is-invalid': v$.inputPassword.$errors.length && store.modalType === 'register'
            }" class="auth__password auth__input" v-if="store.modalType !== 'success'"
            v-model="v$.inputPassword.$model" placeholder="Пароль" />
          <input type="password" class="auth__password-conf auth__input"
            :class="{ 'is-invalid': v$.inputPasswordConf.$errors.length }" placeholder="Подтвердите пароль"
            v-model="v$.inputPasswordConf.$model" v-if="store.modalType === 'register'" />
        </TransitionGroup>
        <p class="auth-error" v-if="store.modalType === 'login' && store.authError">
          Введите правильные данные или зарегистрируйтесь
        </p>
        <button type="submit" class="btn btn-enter modal-main-btn">
          {{ store.modalType === 'register' ? 'Создать аккаунт' : 'Войти' }}
        </button>
        <button type="button" class="btn btn-register modal-sec-btn" v-if="store.modalType !== 'success'"
          @click="store.modalSecondPress(), resetValidator()">
          {{ store.modalType === 'register' ? 'У меня есть пароль' : 'Регистрация' }}
        </button>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import MainLogo from './icons/MainLogo.vue'
import ButtonClose from './icons/ButtonClose.vue'
import { useAppStore } from '../stores/globalStore'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

const store = useAppStore()
const router = useRouter()


const formData = reactive({
  inputMail: '',
  inputName: '',
  inputSurname: '',
  inputPassword: '',
  inputPasswordConf: ''
})



const rules = {
  inputName: {
    required,
    minLength: minLength(3)
  }, // Matches state.lastName
  inputSurname: { required, minLength: minLength(3) }, // Matches state.lastName
  inputMail: { required, email }, // Matches state.contact.email
  inputPassword: { required, minLength: minLength(3) },
  inputPasswordConf: {
    required,
    // sameAsPassword: sameAs(formData.inputPassword)
    same() {
      return formData.inputPassword === formData.inputPasswordConf
    }
  }
}

const v$ = useVuelidate(rules, formData)

// Функция авторизации и регистрации
async function authSend() {

  v$.value.$touch()
  if (store.modalType === 'register') {
    if (!v$.value.$silentErrors.length) {
      const regData = {
        email: formData.inputMail,
        name: formData.inputName,
        surname: formData.inputSurname,
        password: formData.inputPassword
      }
      const response = await fetch('https://cinemaguide.skillbox.cc/user', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(regData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        store.modalType = 'success'
      }
    }
  } else if (store.modalType === 'login') {
    const loginData = {
      email: formData.inputMail,
      password: formData.inputPassword
    }
    const response = await fetch('https://cinemaguide.skillbox.cc/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      store.isAuthorised = true
      store.isModalOpen = false
      store.showAcc()
      store.authError = false
      JSON.stringify(localStorage.setItem('isAuth', 'true'))
    } else {
      store.authError = true
    }
  } else {
    store.modalType = 'login'
  }
}
function resetValidator() {
  v$.value.$reset()
}
</script>


<style scoped>
.modal-container {
  position: fixed;
  overflow: hidden;
  width: 100vw;
  height: 100vw;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.5);
}
.auth {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  flex-direction: column;
  border-radius: 24px;
  width: 420px;
  row-gap: 40px;
  padding: 64px 40px;
  background: var(--background-white);
}

.auth__form {
  flex-direction: column;
  row-gap: 24px;
  width: 100%;
}
.auth__inputs {
  flex-direction: column;
  width: 100%;
  row-gap: 12px;
}
.auth__input {
  width: 100%;
}
.modal-main-btn {
  padding: 16px 92px;
  border-radius: 28px;
  font-weight: 700;
  font-size: 18px;
  line-height: 133%;
  color: var(--content-primary);
  background: var(--background-brand-active);
}
.modal-sec-btn {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 18px;
  line-height: 133%;
  color: var(--content-black);
}

.auth__input {
  padding: 16px 16px 16px 52px;
  border: 1px solid var(--content-placeholder);
  border-radius: 8px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 18px;
  line-height: 133%;
  background-repeat: no-repeat;
  background-position: 16px center;
}
.auth__name,
.auth__surname {
  background-image: url('../assets/img/icons/name-icon.svg');
}
.auth__name.is-invalid,
.auth__surname.is-invalid {
  background-image: url('../assets/img/icons/name-icon-invalid.svg');
}

.auth__mail {
  background-image: url('../assets/img/icons/mail-icon.svg');
}
.auth__mail.is-invalid {
  background-image: url('../assets/img/icons/mail-icon-invalid.svg');
}
.auth__password,
.auth__password-conf {
  background-image: url('../assets/img/icons/password-icon.svg');
}
.auth__password.is-invalid,
.auth__password-conf.is-invalid {
  background-image: url('../assets/img/icons/password-icon-invalid.svg');
}

.auth__input::placeholder {
  color: var(--content-placeholder);
}
.is-invalid {
  border-color: #ff7575;
}
.auth-error {
  color: #ff7575;
  text-align: center;
}


.authForm-enter-active,
.authForm-leave-active {
  transition: all 0.5s ease;
}

.authForm-enter-from,
.authForm-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

.inputs-enter-active,
.inputs-leave-active {
  transition: all 0.5s ease;
}

.inputs-enter-from,
.inputs-leave-to {
  opacity: 0;
  transform: translateX(40px);
}



</style>
