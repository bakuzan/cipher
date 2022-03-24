import { baconCipherPairs } from '../constants';
import { Mode } from '../constants/Mode';

const baconEncodeMap = new Map(baconCipherPairs);
const baconDecodeMap = new Map(baconCipherPairs.map(([a, b]) => [b, a]));

function encode(text: string) {
  const chars = text.split('');
  let output = '';

  for (const c of chars) {
    const bacon = baconEncodeMap.get(c);
    output += bacon ? bacon : c;
  }

  return output;
}

function decode(text: string) {
  const blocks = text.split(/([AB]{5})/);
  let output = '';

  for (const b of blocks) {
    const alpha = baconDecodeMap.get(b);
    output += alpha ? alpha : b;
  }

  return output;
}

export default async function processor(text: string, mode: Mode) {
  return mode === 'encode' ? encode(text) : decode(text);
}
