import prompts from 'prompts';
import { alphabet } from '../constants';
import { Mode } from '../constants/Mode';
import { areCoprime, modInverse } from '../utils';

function encode(text: string, a: number, b: number) {
  const chars = text.split('');
  let output = '';

  for (const c of chars) {
    const index = alphabet.findIndex((x) => x === c.toLowerCase());
    if (index !== -1) {
      const modded = (a * index + b) % 26;
      const newIndex = modded < 0 ? 26 - Math.abs(modded) : modded;
      output += alphabet[newIndex];
    } else {
      output += c;
    }
  }

  return output;
}

function decode(text: string, a: number, b: number) {
  const chars = text.split('');
  let output = '';

  for (const c of chars) {
    const index = alphabet.findIndex((x) => x === c.toLowerCase());
    if (index !== -1) {
      const modded = (modInverse(a, 26) * (index - b)) % 26;
      const newIndex = modded < 0 ? 26 - Math.abs(modded) : modded;
      output += alphabet[newIndex];
    } else {
      output += c;
    }
  }

  return output;
}

export default async function processor(text: string, mode: Mode) {
  const response = await prompts(
    [
      {
        type: 'number',
        name: 'a',
        message: 'What is the cipher multiplier?',
        validate: (value: number) =>
          !areCoprime(value, 26)
            ? `Multiplier must be less than and co-prime with 26.`
            : true
      },
      {
        type: 'number',
        name: 'b',
        message: 'What is the rotation offset?',
        validate: (value: number) =>
          value < 1 || value > 25
            ? `Offset must be between 0 and 26, exclusive.`
            : true
      }
    ],
    { onCancel: () => true }
  );

  const { a, b } = response;
  return mode === 'encode' ? encode(text, a, b) : decode(text, a, b);
}
