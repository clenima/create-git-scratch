import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadWordList(filename: string): string[] {
  const filePath = join(__dirname, '..', 'data', filename);
  const content = readFileSync(filePath, 'utf-8');
  return content.trim().split('\n').filter(line => line.trim().length > 0);
}

const adjectives = loadWordList('adjectives.txt');
const nouns = loadWordList('nouns.txt');

function getRandomElement<T>(array: T[]): T {
  const element = array[Math.floor(Math.random() * array.length)];
  if (element === undefined) {
    throw new Error('Array is empty');
  }
  return element;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

export function generateProjectName(): string {
  const today = new Date();
  const datePrefix = formatDate(today);
  const adjective = getRandomElement(adjectives);
  const noun = getRandomElement(nouns);
  
  return `${datePrefix}-${adjective}-${noun}`;
}