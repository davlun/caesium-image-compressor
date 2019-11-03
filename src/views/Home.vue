<template>
  <div class="text-center w-full">
    <img alt="logo" class="my-0 mx-auto py-5" width="200" src="../assets/images/logo.png">

    <p class="my-5">Output folder is: {{ outputFolder }}</p>

    <button
        class="bg-purple-500 hover:bg-purple-700
               text-white font-bold py-2 px-4 mx-4 focus:outline-none"
        @click="importHandler">
      Import files...
    </button>

    <button
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-4 focus:outline-none"
      @click="clearHandler">
      Clear
    </button>

    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-4 focus:outline-none"
      @click="compressHandler">
      Compress
    </button>

    <div class="my-4" v-if="true">
      <table class="w-full">
        <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Resolution</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(file, index) in fileList" :key="index">
          <td>{{file.name}}</td>
          <td>{{file.formattedSize}}</td>
          <td>{{file.resolution}}</td>
          <td>
            <i class="fas fa-circle-notch fa-spin" v-if="file.status === 1"></i>
            <span v-else>{{file.status}}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 absolute bottom-0 left-0 w-full">
      <ProgressBar :max="fileList.length" :value="compressedFilesLength" :show-label="true" />
    </div>
  </div>
</template>

<script>
import ProgressBar from '../components/ProgressBar.vue';
import { FILE_STATUSES } from '../utils/variables';

const { dialog } = require('electron').remote;

const { ipcRenderer } = require('electron');

export default {
  name: 'home',
  components: { ProgressBar },
  mounted() {
    ipcRenderer.on('cImageCompressionFinished', (event, cImage) => {
      this.$store.dispatch('Compressor/setFile', cImage);
    });
  },

  data() {
    return {
      outputFolder: '/Users/lymphatus/Pictures/hydroxide_test',
    };
  },

  computed: {
    fileList() {
      return this.$store.getters['Compressor/fileList'];
    },
    compressedFilesLength() {
      return this.fileList.reduce((carry, current) => carry
        + (current.status === FILE_STATUSES.FINISHED ? 1 : 0), 0);
    },
  },

  methods: {
    importHandler() {
      dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory', 'multiSelections'],
        filters: [
          { name: 'Images', extensions: ['jpg', 'png'] },
        ],
        // eslint-disable-next-line consistent-return
      }).then((result) => {
        // fileNames is an array that contains all the selected
        if (result.canceled) {
          return false;
        }
        const fileNames = result.filePaths;
        if (fileNames !== undefined) {
          this.$store.dispatch('Compressor/addFiles', fileNames);
        } else {
          console.warn('Empty file list');
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    clearHandler() {
      this.$store.dispatch('Compressor/clearFiles');
    },
    compressHandler() {
      console.log('Sending compression to the main process...');
      const compressionPayload = {
        fileList: this.fileList,
        outputFolder: this.outputFolder,
      };
      ipcRenderer.send('compressionStarted', compressionPayload);
    },
  },
};
</script>

<style scoped>
</style>
