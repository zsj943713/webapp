import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import axios from 'axios'
// import YDUI from 'vue-ydui';


import 'mint-ui/lib/style.css'
// import 'vue-ydui/dist/ydui.rem.css';
// import 'vue-ydui/dist/ydui.base.css';
import 'vue-ydui/dist/ydui.base.css';
// import Sortable from 'vue-sortable'




Vue.use(MintUI)
    // Vue.use(YDUI);
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
