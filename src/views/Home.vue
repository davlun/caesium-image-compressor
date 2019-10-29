<template>
  <div class="text-center w-full">
    <img alt="logo" class="my-0 mx-auto py-5" width="200" src="../assets/images/logo.png">

    <button @click="importHandler">Import</button>
  </div>
</template>

<script>
const { dialog } = require('electron').remote;

export default {
  name: 'home',
  mounted() {
    console.log(this.$store);
  },
  methods: {
    importHandler() {
      dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory', 'multiSelections'],
      }, (fileNames) => {
        // fileNames is an array that contains all the selected
        if (fileNames !== undefined) {
          this.$store.dispatch('Compressor/addFiles', fileNames);
        } else {
          console.warn('Empty file list');
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
