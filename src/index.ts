#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { Option, program } from 'commander';

import { enumValues } from './utils';
import { Mode } from './constants/Mode';
import { Cipher } from './constants/Cipher';
import { CipherOptions } from './constants/CipherOptions';
import processor from './ciphers';

async function run() {
  console.log(
    chalk.green(figlet.textSync('cipher-cli', { horizontalLayout: 'full' }))
  );

  program
    .version('0.0.1')
    .description('Encode/decode cipher input')
    .argument(
      '<text>',
      'Text to be acted upon using the given mode and cipher options.'
    )
    .addOption(
      new Option('-m, --mode <mode>', 'Cipher mode')
        .choices(enumValues(Mode))
        .makeOptionMandatory()
    )
    .addOption(
      new Option('-c, --cipher <type>', 'Use the specified type of cipher')
        .choices(enumValues(Cipher))
        .makeOptionMandatory()
    )
    .parse(process.argv);

  const text = program.args.join(' ');
  const options = program.opts();
  const cipherOptions = options as CipherOptions;

  const result = await processor(text, cipherOptions);
  console.log(`\n\r\n\r`);
  console.log(`Input ${cipherOptions.mode}d: `, result);
}

run();
