import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
/* ==========================================================
 * 					 	Vuex 状态管理
 *	简介：
 *		APP灵魂所在，在这里使用Vuex统一管理页面切换动画。
 *      所有对于歌曲的操作都通过Vuex来进行全局管理，然后
 *		对相应的变化做出全局改变。
 * ========================================================== */

export default new Vuex.Store({
  modules: {
    //stock info
    stock: {
      namespaced: true,
      state: {
        title: String
      },
      mutations: {
        synTitle(state, data) {
          state.title = data
        }
      }
    }

  }

})
