import Vue from 'vue';
import Vuex from 'vuex';

import { createPersistedState } from 'vuex-electron';

import modules from './store/modules';

Vue.config.devtools = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    // createSharedMutations(),
  ],
  strict: process.env.NODE_ENV !== 'production',
});
