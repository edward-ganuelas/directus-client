import Vue from 'vue';
import Router from 'vue-router';
import Blog from '@/components/views/Blog';
import BlogPost from '@/components/BlogPost';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Blog
        },
        {
            path: '/post/:title',
            name: 'Post',
            component: BlogPost,
            props: route => ({
                id: route.query.id,
                title: route.params.title
            })
        }
    ]
});
