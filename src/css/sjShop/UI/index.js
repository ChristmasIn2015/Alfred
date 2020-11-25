import Vue from 'vue'
import sjModal from './sjModal.vue'

const Components = {
    sjModal,
}

Object.keys(Components).forEach((name) => {
    Vue.component(name, Components[name])
})
