import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Joke, JokeType } from '../../types/types';
import { LikeBtn } from './LikeBtn';

type Props = {
  jokeItem: Joke;
  handleLikePress: (jokeId: number) => void;
}

export const JokeItem: FC<Props> = ({ jokeItem, handleLikePress }) => {
  const { id, type, isLiked } = jokeItem;

  return (
    <View style={styles.jokeContainer}>
      <Text style={styles.joke}>
          {type === JokeType.single
            ? <>{jokeItem.joke}</>
            : (
              <>
                {'— ' + jokeItem.setup}
                {'\n'}
                {'— ' + jokeItem.delivery}
              </>
            )
          }
      </Text>
      <LikeBtn
        isLiked={isLiked}
        jokeId={id}
        onPress={handleLikePress}
        smallSize
      />
    </View>
  );
};

const styles = StyleSheet.create({
  jokeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  joke: {
    fontFamily: 'Inter-Medium',
    maxWidth: '80%',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 26,
  }
});
