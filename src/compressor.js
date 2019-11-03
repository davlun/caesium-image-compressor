const { exec } = require('child_process');

const compressor = (command, callback) => {
  exec(command, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

export default compressor;
