/*
* By using this function, we can generate a list of 4 random words from words array.
* This list of 4 random words will be used to create a password
* By great.dolphin.ls
*/

import WORDS from '~/constants/words';

const KEYWORDS_LENGTH = 4;
const generateKeywords = () => {
  const keywordsArray = [];

  for (let i = 0; i < KEYWORDS_LENGTH; i++) {
    keywordsArray.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }

  const keywords = keywordsArray.join(' ');
  return keywords;
}

export default generateKeywords;