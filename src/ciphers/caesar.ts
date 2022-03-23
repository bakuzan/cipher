import prompts from 'prompts';
import { alphabet } from '../constants';
import { Mode } from '../constants/Mode';

function encode(text: string, n: number) {
  const chars = text.split('');
  let output = '';

  for (const c of chars) {
    const index = alphabet.findIndex((x) => x === c.toLowerCase());
    if (index !== -1) {
      const modded = (index + n) % 26;
      const newIndex = modded < 0 ? 26 - Math.abs(modded) : modded;
      output += alphabet[newIndex];
    } else {
      output += c;
    }
  }

  return output;
}

function decode(text: string, n: number) {
  return encode(text, -n);
}

export default async function processor(text: string, mode: Mode) {
  const response = await prompts(
    {
      type: 'number',
      name: 'offset',
      message: 'What is the rotation offset?',
      validate: (value: number) =>
        value < 1 || value > 25
          ? `Offset must be between 0 and 26, exclusive.`
          : true
    },
    { onCancel: () => true }
  );

  const shift = response.offset;
  return mode === 'encode' ? encode(text, shift) : decode(text, shift);
}
