import { Cipher } from './Cipher';
import { Mode } from './Mode';

export interface CipherOptions {
  mode: Mode;
  cipher: Cipher;
  text?: string;
  file?: string;
}
