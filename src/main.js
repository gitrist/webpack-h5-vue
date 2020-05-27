import Vue from 'vue';
import App from './page/App'
import router from './router'
console.log(router)
new Vue({
    el: '#root',
    router,
    render: h => h(App)
})