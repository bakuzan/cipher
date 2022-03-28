import { polybiusSquare } from '../constants';
import { Mode } from '../constants/Mode';

function encode(text: string) {
  const chars = text.split('');
  let output = '';

  for (const c of chars) {
    const index1 = polybiusSquare.findIndex((x) => x.includes(c.toLowerCase()));

    if (index1 !== -1) {
      const list = polybiusSquare[index1];
      const index2 = list.findIndex((x) => x.includes(c.toLowerCase()));
      const n1 = index1 + 1;
      const n2 = index2 + 1;

      output += `${n1}${n2}`;
    } else {
      output += c;
    }
  }

  return output;
}

function decode(text: string) {
  const nums = text.split('');
  let output = '';
  let pair = '';

  for (const n of nums) {
    if (/\d/.test(n)) {
      if (pair.length !== 2) {
        pair += n;
      }

      if (pair.length === 2) {
        const [n1, n2] = pair.split('');
        const index1 = Number(n1) - 1;
        const index2 = Number(n2) - 1;
        output += polybiusSquare[index1][index2];
        pair = '';
      }
    } else {
      output += n;
      pair += '';
    }
  }

  return output;
}

export default async function processor(text: string, mode: Mode) {
  return mode === 'encode' ? encode(text) : decode(text);
}
