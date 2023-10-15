import type { FileWithPath } from 'react-dropzone';

export interface File extends FileWithPath {
  preview: string;
}
