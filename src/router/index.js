import Vue from 'vue';
import Router from 'vue-router';
import BlogPosts from '../components/BlogPosts';
import BlogPost from '../components/BlogPost';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: BlogPosts
        },
        {
            path: '/post/:id/:title',
            name: 'Post',
            component: BlogPost,
            props: true
        },
        {
            path: '../',
            name: 'EightRay',
            beforeEnter: () =>{
                window.location.href = "https://eightrayedsun.com";
            }
        }
    ]
})