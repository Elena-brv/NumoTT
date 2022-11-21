import { JokeFromServer } from '../../types/types';

const BASE_URL = 'https://v2.jokeapi.dev/joke/';

export const getJoke = async (): Promise<JokeFromServer> => {
  const url = BASE_URL + 'any';
  const data = await fetch(url);

  return data.json();
};
