import VueRouter  from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);

import Home from '@/page/Home/Home'

const router = new VueRouter ({
    routes:[{
        path: '/',
        component: Home,
        meta:{
            title: '首页'
        }
    }]
})

export default router;