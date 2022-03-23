import chalk from 'chalk';
import { Cipher } from '../constants/Cipher';
import { CipherOptions } from '../constants/CipherOptions';

import affineProcessor from './affine';
import atbashProcessor from './atbash';
import caesarProcessor from './caesar';

export default async function processor(text: string, options: CipherOptions) {
  switch (options.cipher) {
    case Cipher.Affine:
      return await affineProcessor(text, options.mode);
    case Cipher.Atbash:
      return await atbashProcessor(text, options.mode);
    case Cipher.Caesar:
      return await caesarProcessor(text, options.mode);
    default:
      console.log(
        chalk.red(
          `Cipher type: '${options.cipher}' does not have a valid processor.`
        )
      );

      process.exit(1);
  }
}
