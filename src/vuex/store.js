import Vue from 'vue'
import Vuex from 'vuex'
import createdPersistedState from 'vuex-persistedstate'
import pathify from './pathify'
import { make } from 'vuex-pathify'

Vue.use(Vuex)

const state = {
    BlogPosts: '',
    Filters: '',
    Filter: '',

}

const getters = {
   ...make.getters(state)
}

const mutations = {
    ...make.mutations(state)
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    plugins: [createdPersistedState, pathify.plugin]
})