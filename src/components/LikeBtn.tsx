import { FC } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../constants';
import FilledLike from '../../assets/images/fav-filled.svg';
import Like from '../../assets/images/fav.svg';

export type Props = {
  isLiked: boolean;
  jokeId: number;
  onPress: (jokeId: number) => void;
  smallSize?: boolean;
}

export const LikeBtn: FC<Props> = ({
  isLiked,
  jokeId,
  onPress,
  smallSize = false,
 }) => (
  <Pressable onPress={() => onPress(jokeId)}>
    <View style={[
      styles.likeBtn,
      isLiked ? styles.likeBtnActive : styles.likeBtnInactive,
      smallSize && styles.smallBtn,
    ]}
    >
      {isLiked
        ? <FilledLike stroke={colors.inactive} fill={colors.white} />
        : <Like stroke={colors.active} />}
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  likeBtn: {
    width: 64,
    height: 64,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeBtnActive: {
    borderRadius: 50,
    backgroundColor: colors.active,
  },
  likeBtnInactive: {
    backgroundColor: colors.light,
  },
  smallBtn: {
    width: 48,
    height: 48,
  },
});
