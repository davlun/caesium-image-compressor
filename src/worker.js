import { ipcRenderer } from 'electron';

const { exec } = require('child_process');
const { FILE_STATUSES } = require('./utils/variables');

const startCompression = (event, compressionPayload) => {
  // eslint-disable-next-line consistent-return
  compressionPayload.fileList.forEach((cImage) => {
    if (!cImage.fullpath) {
      console.warn(`${cImage} skipped`);
      return false;
    }
    const command = `caesiumclt -q0 -o ${compressionPayload.outputFolder} ${cImage.fullpath}`;
    // eslint-disable-next-line no-param-reassign
    cImage.status = FILE_STATUSES.COMPRESSING;
    event.sender.send('compressionFinished', cImage);
    exec(command, (err) => {
      if (err) {
        // eslint-disable-next-line no-param-reassign
        cImage.status = FILE_STATUSES.ERROR;
      } else {
        // eslint-disable-next-line no-param-reassign
        cImage.status = FILE_STATUSES.FINISHED;
      }
      event.sender.send('compressionFinished', cImage);
    });
  });
};

ipcRenderer.on('compress', (event, compressionPayload) => {
  startCompression(event, compressionPayload);
});
