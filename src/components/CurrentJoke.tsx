import { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getJoke } from '../api/api';
import { JOKE_KEY, LAST_DATE_KEY } from '../../constants';
import { Joke, JokeType } from '../../types/types';
import { LikeBtn } from './LikeBtn';
import {
  getDataFromStorage,
  setDataToStorage,
  updateJokesHistory
} from '../helpers';

export const CurrentJoke: FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const isFocused = useIsFocused();

  const currentDate = new Date().toLocaleDateString();

  const loadJoke = async () => {
    const jokeFromServer = await getJoke();

    const formattedJoke = {...jokeFromServer, isLiked: false};

    setJoke(formattedJoke);
    setDataToStorage(JOKE_KEY, formattedJoke),
    setDataToStorage(LAST_DATE_KEY, currentDate)

    updateJokesHistory(formattedJoke);
  };

  useEffect(
    () => {
      const setData = async () => {
        const lastDate = await getDataFromStorage(LAST_DATE_KEY, '0');

        if (lastDate === currentDate) {
          const jokeFromStorage = await getDataFromStorage(JOKE_KEY, '');
          setJoke(jokeFromStorage);

          return;
        }

        try {
          loadJoke();
        } catch (err) {
          console.warn(err);
          throw new Error('Error');
        }
      };

      setData();
    },
    [isFocused]
  );

  const handleLikePress = () => {
    setJoke(prevState => {
      if (prevState) {
        const status = prevState.isLiked;

        const newJoke = {...prevState, isLiked: !status}

        updateJokesHistory(newJoke, 'isLiked');
        setDataToStorage(JOKE_KEY, newJoke);

        return newJoke;
      }

      return null;
    });
  };

  if (!joke) {
    return (
      <View style={styles.loading}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.jokeContainer}>
      <ScrollView>
        <Text style={styles.joke}>
          {joke.type === JokeType.single
            ? <>{joke.joke}</>
            : (
              <>
                {'— ' + joke.setup}
                {'\n'}
                {'— ' + joke.delivery}
              </>
            )
          }
        </Text>
        <LikeBtn
          onPress={handleLikePress}
          jokeId={joke.id}
          isLiked={joke.isLiked}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  jokeContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  joke: {
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 36,
  },
  loading: {
    alignItems: 'center',
  }
});
