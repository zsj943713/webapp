import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import search from '@/components/search'
import stockEdit from '@/components/stockEdit'
import strategy from '@/components/strategy'
import stockDetails from '@/components/stockDetails'
import particularsMore from '@/components/particularsMore'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'index',
            component: Index
        }, {
            path: '/search',
            name: 'search',
            component: search
        }, {
            path: '/stockEdit',
            name: 'stockEdit',
            component: stockEdit
        }
        ,
         {
            path: '/stockDetails/:id',
            name: 'stockDetails',
            component: stockDetails
        }
        , {
            path: '/strategy',
            name: 'strategy',
            component: strategy
        }, {
            path: '/particularsMore/:id',
            name: 'particularsMore',
            component: particularsMore
        }, 
    ]
})
