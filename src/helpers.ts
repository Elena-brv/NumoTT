import AsyncStorage from '@react-native-async-storage/async-storage';
import { JOKES_HISTORY_KEY } from '../constants';
import { Joke } from '../types/types';

export const getDataFromStorage = async(key: string, initialValue: string) => {
  try {
    const dataFromStorage = await AsyncStorage.getItem(key) || initialValue;
    const parsedData = JSON.parse(dataFromStorage);

    return parsedData;
  } catch {
    return initialValue;
  }
};

export const setDataToStorage = async(key: string, value: any) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const updateJokesHistory = async(newJoke: Joke, property?: keyof Joke) => {
  const jokesHistory = await getDataFromStorage(JOKES_HISTORY_KEY, '[]');

  let updatedHistory;

  if (property) {
    updatedHistory = jokesHistory.map((joke: Joke) => (
      joke.id === newJoke.id
        ? {
            ...joke,
            [property]: newJoke[property]
          }
        : joke
    ));
  } else if (jokesHistory.some((joke: Joke) => joke.id === newJoke.id)) {
    return;
  } else {
    updatedHistory = [{ ...newJoke }, ...jokesHistory];
  }

  await setDataToStorage(JOKES_HISTORY_KEY, updatedHistory);
};
