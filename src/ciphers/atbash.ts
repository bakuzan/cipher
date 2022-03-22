import { alphabet } from '../constants';
import { Mode } from '../constants/Mode';

const reversedAlphabet = [...alphabet].reverse();

function converter(text: string, list: string[], listBackwards: string[]) {
  const chars = text.split('');
  let output = '';

  for (const c of chars) {
    const index = list.findIndex((x) => x === c.toLowerCase());
    if (index !== -1) {
      output += listBackwards[index];
    } else {
      output += c;
    }
  }

  return output;
}

export default function processor(text: string, mode: Mode) {
  return mode === 'encode'
    ? converter(text, alphabet, reversedAlphabet)
    : converter(text, reversedAlphabet, alphabet);
}
