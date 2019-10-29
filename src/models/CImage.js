import { FILE_STATUSES, SUPPORTED_FILETYPES } from '../utils/variables';

const sizeOf = require('image-size');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const path = require('path');
const fs = require('fs');
const filesize = require('filesize');

class CImage {
  constructor(filepath) {
    this._fullpath = filepath;

    const buffer = readChunk.sync(filepath, 0, fileType.minimumBytes);

    console.log(fileType(buffer));
    if (SUPPORTED_FILETYPES.includes(fileType(buffer).mime)) {
      const resolution = sizeOf(filepath);
      this._name = path.basename(filepath);
      this._size = fs.statSync(filepath).size;
      this._formattedSize = filesize(this._size);
      this._width = resolution.width;
      this._height = resolution.height;
      this._resolution = `${this._width}x${this._height}`;
      this._status = FILE_STATUSES.PENDING;
    } else {
      console.log('Error filetype');
      // TODO Throw exception
    }
  }

  /* Getters and setters */
  get fullpath() {
    return this._fullpath;
  }

  set fullpath(value) {
    this._fullpath = value;
  }

  get resolution() {
    return this._resolution;
  }

  set resolution(value) {
    this._resolution = value;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get formattedSize() {
    return this._formattedSize;
  }

  set formattedSize(value) {
    this._formattedSize = value;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }
}

export default CImage;
