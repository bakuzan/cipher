#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { Option, program } from 'commander';

import { enumValues, readTextFromFile, writeTextToFile } from './utils';
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
    .addOption(
      new Option(
        '-t, --text <text>',
        'Text to be acted upon using the given mode and cipher options.'
      ).conflicts('file')
    )
    .addOption(
      new Option(
        '-f, --file <url>',
        'File path to read text from (result will be written to a file)'
      ).conflicts('text')
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

  const options = program.opts();
  if (!options.text && !options.file) {
    console.log(
      `One of the following options are required: -t, --text or -f --file`
    );
    process.exit(1);
  }

  const cipherOptions = options as CipherOptions;
  let outputToFile = false;
  let text = cipherOptions.text;

  if (text === undefined) {
    outputToFile = true;
    text = await readTextFromFile(cipherOptions.file as string);
  }

  const result = await processor(text, cipherOptions);
  console.log(`\n\r\n\r`);

  if (outputToFile) {
    await writeTextToFile(cipherOptions, result);
  } else {
    console.log(`Input ${cipherOptions.mode}d: `, result);
  }
}

run();
