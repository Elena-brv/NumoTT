import { FC, useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { JokeItem } from '../components/JokeItem';
import { colors, JOKES_HISTORY_KEY, JOKE_KEY } from '../../constants';
import { Joke } from '../../types/types';
import { useIsFocused } from '@react-navigation/native';
import { getDataFromStorage, setDataToStorage } from '../helpers';


export const HistoryScreen: FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const isFocused = useIsFocused();

  useEffect(
    () => {
      const getHistoryFromStorage = async() => {
        const jokesHistory = await getDataFromStorage(JOKES_HISTORY_KEY, '[]');

        setJokes(jokesHistory);
      }

      getHistoryFromStorage();
    },
    [isFocused]
  )

  const handleLikePressAtHistory = async(jokeId: number) => {
    setJokes(prevJokes => {
      const updatedJokes = prevJokes.map(joke => (
        joke.id === jokeId
          ? {
              ...joke,
              isLiked: !joke.isLiked
            }
          : joke
      ))

      setDataToStorage(JOKES_HISTORY_KEY, updatedJokes);

      return updatedJokes;
    });

    const currentJoke = await getDataFromStorage(JOKE_KEY, '');

    if (currentJoke.id === jokeId) {
      setDataToStorage(
        JOKE_KEY,
        {...currentJoke, isLiked: !currentJoke.isLiked}
      )
    }
  }

  if (!jokes.length) {
    return <Text>No history yet..</Text>
  }

  return (
    <View style={styles.jokesContainer}>
      {jokes.length && (
        <FlatList
          data={jokes}
          renderItem={
            ({ item }) => (
              <JokeItem
                key={item.id}
                jokeItem={item}
                handleLikePress={handleLikePressAtHistory}
              />
            )
          }
        />
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  jokesContainer: {
    backgroundColor: colors.white,
  },
});
