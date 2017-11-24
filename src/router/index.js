import Vue from 'vue';
import Router from 'vue-router';
import BlogPost from '../components/BlogPosts'

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: BlogPost
    }]
})