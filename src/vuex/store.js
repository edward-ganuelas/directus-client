import Vue from 'vue'
import Vuex from 'vuex'
import createdPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    BlogPosts: '',
    Filters: '',
    Filter: ''
}

const getters = {
    getBlogPosts: (state) => state.BlogPosts,
    getFilters: state => state.Filters,
    getFilter: state => state.Filter
}

const mutations = {
    updateBlogPosts: (state, value) => state.BlogPosts = value,
    updateFilters: (state, value) => state.Filters = value,
    updateFilter: (state, value) => state.Filter = value
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    plugins: [createdPersistedState]
})