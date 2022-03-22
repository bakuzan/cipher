import chalk from 'chalk';
import { Cipher } from '../constants/Cipher';
import { CipherOptions } from '../constants/CipherOptions';

import caesarProcessor from './caesar';

export default function processor(text: string, options: CipherOptions) {
  switch (options.cipher) {
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
