import { COMPRESSOR_MODES } from '../../utils/variables';

import CImage from '../../models/CImage';

const mutations = {
  SWITCH_MODE(state, mode) {
    state.mode = mode;
  },
  ADD_FILES(state, fileList) {
    const importedFiles = state.files;
    fileList.forEach((fullPath) => {
      const cImage = new CImage(fullPath);
      importedFiles.push(cImage);
    });
    state.files = importedFiles;
  },
  CLEAR_FILES(state) {
    state.files = [];
  },
};

const actions = {
  addFiles({ commit }, fileList) {
    // do something async
    commit('ADD_FILES', fileList);
  },
  switchMode({ commit }, mode) {
    commit('SWITCH_MODE', mode);
  },
  clearFiles({ commit }) {
    commit('CLEAR_FILES');
  },
};

const state = {
  mode: COMPRESSOR_MODES.SIMPLE,
  files: [],
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
