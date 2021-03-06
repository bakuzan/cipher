import chalk from 'chalk';
import { Cipher } from '../constants/Cipher';
import { CipherOptions } from '../constants/CipherOptions';

import affineProcessor from './affine';
import atbashProcessor from './atbash';
import baconianProcessor from './baconian';
import bifidProcessor from './bifid';
import caesarProcessor from './caesar';
import polybiusSquareProcessor from './polybiusSquare';
import rot13Processor from './rot13';

export default async function processor(text: string, options: CipherOptions) {
  switch (options.cipher) {
    case Cipher.Affine:
      return await affineProcessor(text, options.mode);
    case Cipher.Atbash:
      return await atbashProcessor(text, options.mode);
    case Cipher.Baconian:
      return await baconianProcessor(text, options.mode);
    case Cipher.Bifid:
      return await bifidProcessor(text, options.mode);
    case Cipher.Caesar:
      return await caesarProcessor(text, options.mode);
    case Cipher.PolybiusSquare:
      return await polybiusSquareProcessor(text, options.mode);
    case Cipher.Rot13:
      return await rot13Processor(text, options.mode);
    default:
      console.log(
        chalk.red(
          `Cipher type: '${options.cipher}' does not have a valid processor.`
        )
      );

      process.exit(1);
  }
}
