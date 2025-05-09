import { readFileSync } from 'fs';
import { join } from 'path';
import { ChallengeRepository } from '../repositories/challenge-repository.js';

const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const REQUIRED_LETTERS = ['b', 'e'];
const WORDLIST_PATH = join(process.cwd(), 'wordlists', 'pt-br.txt')


function normalize(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function getRandomLetters(wordList: string[], minWords = 20): {
  letters: string;
  centerLetter: string;
  validWords: string[];
} {
  let finalLetters: string[] = [];
  let centerLetter = '';
  let validWords: string[] = [];

  while (true) {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    const uniqueLetters = Array.from(new Set(randomWord.split('')))
      .filter((c: string) => /^[a-z]$/.test(c));

    if (uniqueLetters.length < 7) continue;

    const remaining = uniqueLetters.filter(l => !REQUIRED_LETTERS.includes(l));
    const shuffled = remaining.sort(() => 0.5 - Math.random()).slice(0, 5);
    const baseLetters = [...REQUIRED_LETTERS, ...shuffled]; 

    const vowelsInBase = baseLetters.filter(l => VOWELS.includes(l));
    if (vowelsInBase.length < 2) continue;

    centerLetter = baseLetters[Math.floor(Math.random() * baseLetters.length)];

    const otherLetters = baseLetters.filter(l => l !== centerLetter);
    const uniqueOtherLetters = Array.from(new Set(otherLetters)).slice(0, 6);

    const fullSet = [...uniqueOtherLetters, centerLetter];

    validWords = wordList.filter(word => {
      if (word.length < 4) return false;
      const letters = Array.from(new Set(word));
      return letters.every(l => fullSet.includes(l)) && word.includes(centerLetter);
    });

    if (validWords.length >= minWords) {
      finalLetters = uniqueOtherLetters;
      break;
    }
  }

  return {
    letters: finalLetters.join('').toUpperCase(),
    centerLetter: centerLetter.toUpperCase(),
    validWords,
  };
}

export class ChallengeService {
  static async createChallenge() {
    const rawWords = readFileSync(WORDLIST_PATH, 'utf-8')
      .split('\n')
      .map(w => normalize(w.trim()))
      .filter(w => /^[a-z]+$/.test(w));

    const { letters, centerLetter, validWords } = getRandomLetters(rawWords);
    const uniqueWords = Array.from(new Set(validWords));

    const challenge = await ChallengeRepository.createChallenge({
      letters,
      centerLetter,
      words: uniqueWords,
    });

    return challenge;
  }
  static async validateWord(challenge_id: string, word: string, user_id: string) {
    const normalizedWord = word.trim().toLowerCase();

    const isValid = await ChallengeRepository.isWordInChallenge(challenge_id, normalizedWord);
    if (!isValid) {
      throw new Error('Word is not valid for this challenge');
    }

    const alreadyFound = await ChallengeRepository.isWordAlreadyFound(challenge_id, user_id, normalizedWord);
    if (alreadyFound) {
      throw new Error('Word already submitted');
    }

    await ChallengeRepository.addUserWord(challenge_id, user_id, normalizedWord);
    const userScore = await ChallengeRepository.incrementUserScore(challenge_id, user_id);


    return {
      message: 'Correto!',
      word: normalizedWord,
      userScore: userScore.score,
    };
  }
  static async TodayChallenge(){
    let challenge = await ChallengeRepository.getTodayChallenge();

    if (!challenge) {
      challenge = await ChallengeService.createChallenge();
      console.log("challenge: " + challenge)
    }

    return challenge;
  }
}
