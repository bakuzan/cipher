import chalk from 'chalk';
import { Cipher } from '../constants/Cipher';
import { CipherOptions } from '../constants/CipherOptions';

import atbashProcessor from './atbash';
import caesarProcessor from './caesar';

export default function processor(text: string, options: CipherOptions) {
  switch (options.cipher) {
    case Cipher.Atbash:
      return atbashProcessor(text, options.mode);
    case Cipher.Caesar:
      return caesarProcessor(text, options.mode);
    default:
      console.log(
        chalk.red(
          `Cipher type: '${options.cipher}' does not have a valid processor.`
        )
      );

      process.exit(1);
  }
}
