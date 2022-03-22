import { alphabet } from '../constants';
import { Mode } from '../constants/Mode';

function encode(text: string, n: number) {
  const chars = text.split('');
  let output = '';

  for (let c of chars) {
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

export default function processor(text: string, mode: Mode) {
  const shift = 8;

  return mode === 'encode' ? encode(text, shift) : decode(text, shift);
}
