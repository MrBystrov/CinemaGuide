<template>
  <div class="auth flex">
    <main-logo width="180" height="36"></main-logo>
    <button-close class="btn-close" @click="store.closeModal"></button-close>
    <form id="authForm" name="authForm" class="auth__form flex" @submit.prevent="authSend()">
      <h3 class="auth__title title" v-if="store.modalType !== 'login'">
        Регистрация <span v-if="store.modalType === 'success'"> завершена</span>
      </h3>
      <p class="auth__success-text text" v-if="store.modalType === 'success'">
        Используйте вашу электронную почту для входа
      </p>
      <div class="auth__inputs flex">
        <input
          type="text"
          class="auth__mail auth__input"
          v-if="store.modalType !== 'success'"
          v-model="$v.formData.inputMail.$model"
          placeholder="Электронная почта"
        />
        <input
          type="text"
          class="auth__name auth__input"
          placeholder="Имя"
          v-model="$v.formData.inputName.$model"
          v-if="store.modalType === 'register'"
        />
        <input
          type="text"
          class="auth__surname auth__input"
          placeholder="Фамилия"
          v-model="$v.formData.inputSurname.$model"
          v-if="store.modalType === 'register'"
        />
        <input
          name="password"
          type="password"
          class="auth__password auth__input"
          v-if="store.modalType !== 'success'"
          v-model="$v.formData.inputPassword.$model"
          placeholder="Пароль"
        />
        <input
          type="password"
          class="auth__password-conf auth__input"
          placeholder="Подтвердите пароль"
          v-model="$v.formData.inputPasswordConf.$model"
          v-if="store.modalType === 'register'"
        />
      </div>
      <button type="submit" class="btn btn-enter modal-main-btn">
        {{ store.modalType === 'register' ? 'Создать аккаунт' : 'Войти' }}
      </button>
      <button
        type="button"
        class="btn btn-register modal-sec-btn"
        v-if="store.modalType !== 'success'"
        @click="store.modalSecondPress"
      >
        {{ store.modalType === 'register' ? 'У меня есть пароль' : 'Регистрация' }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
import MainLogo from './icons/MainLogo.vue'
import ButtonClose from './icons/ButtonClose.vue'
import { useAppStore } from '../stores/globalStore'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
  components: { ButtonClose, MainLogo },
  setup() {
    return { $v: useVuelidate() }
  },
  data() {
    return {
      formData: {
        inputMail: '',
        inputName: '',
        inputSurname: '',
        inputPassword: '',
        inputPasswordConf: ''
      },

      store: useAppStore()
    }
  },
  validations() {
    return {
      formData: {
        inputMail: { required, email },
        inputName: { required },
        inputSurname: { required },
        inputPassword: { required },
        inputPasswordConf: { required }
      }
    }
  },
  methods: {
    async authSend() {
      console.log(this.$v.formData.$silentErrors);
      if (this.store.modalType === 'register') {
        const regData = {
          email: this.formData.inputMail,
          name: this.formData.inputName,
          surname: this.formData.inputSurname,
          password: this.formData.inputPassword
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
          this.store.modalType = 'success'
        }
      } else if (this.store.modalType === 'login') {
        const loginData = {
          email: this.formData.inputMail,
          password: this.formData.inputPassword
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
          this.store.isAuthorised = true
          this.store.isModalOpen = false
          this.store.showAcc()
          JSON.stringify(localStorage.setItem('isAuth', 'true'))
        }
      } else {
        this.store.modalType = 'login'
      }
    }
  }
}

// Функция авторизации и регистрации
</script>

<style scoped>
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
.auth__mail {
  background-image: url('../assets/img/icons/mail-icon.svg');
}
.auth__password,
.auth__password-conf {
  background-image: url('../assets/img/icons/password-icon.svg');
}

.auth__input::placeholder {
  color: var(--content-placeholder);
}
.is-invalid {
  border-color: #ff7575;
}
</style>
