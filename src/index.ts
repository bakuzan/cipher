#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { Option, program } from 'commander';

import { enumValues } from './utils';
import { Mode } from './constants/Mode';
import { Cipher } from './constants/Cipher';

console.log(
  chalk.red(figlet.textSync('cipher-cli', { horizontalLayout: 'full' }))
);

program
  .version('0.0.1')
  .description('Encode/decode cipher input')
  .argument('<text>', 'Cipher will encode the text with the given cipher')
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

console.log('Inputs : ', text, options);