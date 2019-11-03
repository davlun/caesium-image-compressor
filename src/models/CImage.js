import { FILE_STATUSES, SUPPORTED_FILETYPES } from '../utils/variables';

const sizeOf = require('image-size');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const path = require('path');
const fs = require('fs');
const filesize = require('filesize');
const uuidv4 = require('uuid/v4');

function create(filepath) {
  const buffer = readChunk.sync(filepath, 0, fileType.minimumBytes);
  if (!SUPPORTED_FILETYPES.includes(fileType(buffer).mime)) {
    return {};
  }
  const resolution = sizeOf(filepath);
  const { size } = fs.statSync(filepath);
  return {
    fullpath: filepath,
    name: path.basename(filepath),
    size,
    formattedSize: filesize(size),
    width: resolution.width,
    height: resolution.height,
    resolution: `${resolution.width}x${resolution.height}`,
    status: FILE_STATUSES.PENDING,
    uuid: uuidv4(),
  };
}

// eslint-disable-next-line import/prefer-default-export
export { create };
