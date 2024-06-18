import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  setup () {
    const state = reactive({
      firstName: '',
      lastName: '',
      contact: {
        email: ''
      },
      password: ''
    })
    const rules = {
      firstName: { required }, // Matches state.firstName
      lastName: { required }, // Matches state.lastName
      contact: {
        email: { required, email } // Matches state.contact.email
      },
      password: {required}
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  }
}
