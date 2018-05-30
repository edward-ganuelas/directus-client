import Vue from 'vue'
import Vuex from 'vuex'
import createdPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    BlogPosts: ''
}

const getters = {
    getBlogPosts: (state) => state.BlogPosts
}

const mutations = {
    updateBlogPosts: (state, value) => state.BlogPosts = value
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    plugins: [createdPersistedState]
})