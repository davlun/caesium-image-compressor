import { SUPPORTED_FILETYPES } from './variables';

// eslint-disable-next-line import/prefer-default-export
export const isFileTypeSupported = file => SUPPORTED_FILETYPES.indexOf(file.type) === -1;
