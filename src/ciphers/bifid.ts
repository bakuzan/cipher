import { polybiusSquare } from '../constants';
import { Mode } from '../constants/Mode';

import { chunk } from '../utils';
import { decode as psDecode, encode as psEncode } from './polybiusSquare';

function encode(text: string) {
  const chars = text.split('');
  const top = [];
  const bot = [];

  for (const c of chars) {
    const index1 = polybiusSquare.findIndex((x) => x.includes(c.toLowerCase()));

    if (index1 !== -1) {
      const list = polybiusSquare[index1];
      const index2 = list.findIndex((x) => x.includes(c.toLowerCase()));
      const n1 = index1 + 1;
      const n2 = index2 + 1;

      top.push(n1.toString());
      bot.push(n2.toString());
    } else {
      top.push(c);
      bot.push(c);
    }
  }

  const combined = [...top, ...bot].join('');
  return psDecode(combined);
}

function decode(text: string) {
  const combined = psEncode(text);
  const [top, bot] = chunk(combined.split(''), combined.length / 2);
  let output = '';

  for (let i = 0; i < top.length; i++) {
    const n1 = top[i];
    const n2 = bot[i];

    if (/\d/.test(n1)) {
      output += `${n1}${n2}`;
    } else {
      output += n1;
    }
  }

  return psDecode(output);
}

export default async function processor(text: string, mode: Mode) {
  return mode === 'encode' ? encode(text) : decode(text);
}
