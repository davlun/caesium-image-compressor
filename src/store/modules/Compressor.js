import { COMPRESSOR_MODES } from '../../utils/variables';

import { create } from '../../models/CImage';

const mutations = {
  SWITCH_MODE(state, mode) {
    state.mode = mode;
  },
  ADD_FILES(state, fileList) {
    const importedFiles = state.files;
    fileList.forEach((fullPath) => {
      // TODO Detect duplicates
      const cImage = create(fullPath);
      importedFiles.push(cImage);
    });
    state.files = importedFiles;
  },
  CLEAR_FILES(state) {
    state.files = [];
  },
  SET_FILE(state, cImage) {
    const fileIndex = state.files.findIndex(obj => obj.uuid === cImage.uuid);
    const currentList = [...state.files];
    currentList[fileIndex] = cImage;
    state.files = currentList;
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
  setFile({ commit }, cImage) {
    // TODO Bad
    commit('SET_FILE', cImage);
  },
};

const getters = {
  fileList: state => state.files,
};

const state = {
  mode: COMPRESSOR_MODES.SIMPLE,
  files: [],
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
